"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%&*+=/\\<>|";
const SCRAMBLE_MS = 700;

/** Decrypts text on hover. Each character cycles random caps/digits/symbols
 * before locking left-to-right, accompanied by glitchy bursts that resolve
 * into a single sharp click — CIA-terminal feel. */
export function MetalButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: string;
  className?: string;
}) {
  const ctxRef = useRef<AudioContext | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const ensureCtx = () => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      try {
        ctxRef.current = new AC();
      } catch {
        return null;
      }
    }
    if (ctxRef.current && ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  };

  /** Short noise burst with bandpass + decay. */
  const scheduleClick = (
    ctx: AudioContext,
    when: number,
    length: number,
    gain: number,
    centreHz: number
  ) => {
    const buf = ctx.createBuffer(
      1,
      Math.max(1, Math.floor(ctx.sampleRate * length)),
      ctx.sampleRate
    );
    const ch = buf.getChannelData(0);
    for (let i = 0; i < ch.length; i++) {
      ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / ch.length, 3);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = centreHz;
    bp.Q.value = 10;

    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, when);
    g.gain.exponentialRampToValueAtTime(0.00001, when + length);

    noise.connect(bp).connect(g).connect(ctx.destination);
    noise.start(when);
    noise.stop(when + length);
  };

  /** Sharp resonant ping for the lock-in moment. */
  const schedulePing = (ctx: AudioContext, when: number) => {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2400, when);
    osc.frequency.exponentialRampToValueAtTime(700, when + 0.05);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.09, when);
    g.gain.exponentialRampToValueAtTime(0.00001, when + 0.07);

    osc.connect(g).connect(ctx.destination);
    osc.start(when);
    osc.stop(when + 0.08);

    scheduleClick(ctx, when, 0.06, 0.15, 3600);
  };

  const playDecrypt = useCallback((durMs: number) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    const start = ctx.currentTime;
    const dur = durMs / 1000;

    // Granular chirps throughout the scramble — random pitch, random spacing
    let t = 0;
    while (t < dur - 0.04) {
      const len = 0.012 + Math.random() * 0.025;
      const freq = 1400 + Math.random() * 3200;
      const gain = 0.05 + Math.random() * 0.05;
      scheduleClick(ctx, start + t, len, gain, freq);
      t += 0.022 + Math.random() * 0.04;
    }

    // Resolve: a heavier click on lock-in
    schedulePing(ctx, start + dur);
  }, []);

  const startScramble = useCallback(() => {
    if (rafRef.current !== undefined) return; // already animating
    const target = children;
    if (!labelRef.current || !target) return;

    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / SCRAMBLE_MS);
      const len = target.length;
      // Lock progresses left-to-right with slight ease
      const eased = 1 - Math.pow(1 - t, 1.8);
      const locked = Math.floor(eased * len);
      let out = "";
      for (let i = 0; i < len; i++) {
        const c = target[i];
        if (c === " ") out += " ";
        else if (i < locked) out += c;
        else
          out +=
            SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      if (labelRef.current) labelRef.current.textContent = out;
      if (elapsed < SCRAMBLE_MS) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        if (labelRef.current) labelRef.current.textContent = target;
        rafRef.current = undefined;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    playDecrypt(SCRAMBLE_MS);
  }, [children, playDecrypt]);

  return (
    <Link
      href={href}
      onPointerEnter={startScramble}
      onFocus={startScramble}
      className={`group relative inline-flex items-center gap-3 px-6 py-3.5 overflow-hidden border border-ink text-ink hover:border-accent transition-colors duration-200 ${className}`}
    >
      {/* Soft accent wash on hover */}
      <span
        aria-hidden
        className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300"
      />
      {/* Scan-line sweep */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-px bg-accent -translate-x-2 opacity-0 group-hover:translate-x-[400%] group-hover:opacity-100 transition-all duration-[600ms] ease-out"
      />
      <span
        ref={labelRef}
        className="relative tag text-[0.78rem] tracking-[0.18em] whitespace-nowrap group-hover:text-accent transition-colors"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="relative tag text-[0.78rem] group-hover:translate-x-1 group-hover:text-accent transition-all"
      >
        →
      </span>
    </Link>
  );
}
