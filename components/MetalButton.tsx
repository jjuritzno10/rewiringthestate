"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%&*+=/\\<>|";
const SCRAMBLE_MS = 700;

/** Solid command button — white brick with ink label and accent arrow.
 * Decrypts text on hover with synthesized chirps + lock-in click. */
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
    let t = 0;
    while (t < dur - 0.04) {
      const len = 0.012 + Math.random() * 0.025;
      const freq = 1400 + Math.random() * 3200;
      const gain = 0.05 + Math.random() * 0.05;
      scheduleClick(ctx, start + t, len, gain, freq);
      t += 0.022 + Math.random() * 0.04;
    }
    schedulePing(ctx, start + dur);
  }, []);

  const startScramble = useCallback(() => {
    if (rafRef.current !== undefined) return;
    const target = children;
    if (!labelRef.current || !target) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / SCRAMBLE_MS);
      const len = target.length;
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
      className={`group relative inline-flex items-stretch bg-ink text-paper overflow-hidden shadow-[0_2px_18px_-8px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_42px_-12px_hsl(var(--accent)/0.7)] transition-shadow duration-300 ${className}`}
    >
      {/* Scan-line — accent stripe sweeps across the brick on hover */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-[3px] bg-accent -translate-x-3 opacity-0 group-hover:translate-x-[60vw] group-hover:opacity-100 transition-[transform,opacity] duration-[800ms] ease-out"
      />

      {/* Label cell */}
      <span className="flex items-center py-5 sm:py-6 pl-7 sm:pl-10 pr-6 sm:pr-8">
        <span
          ref={labelRef}
          className="font-display font-bold uppercase text-base sm:text-[1.1rem] tracking-[0.22em] whitespace-nowrap"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {children}
        </span>
      </span>

      {/* Divider + arrow cell */}
      <span
        aria-hidden
        className="self-stretch w-px bg-accent/30"
      />
      <span className="flex items-center py-5 sm:py-6 px-6 sm:px-7 bg-ink relative">
        <span
          aria-hidden
          className="text-accent text-2xl sm:text-[1.75rem] leading-none group-hover:translate-x-1.5 transition-transform duration-300"
        >
          →
        </span>
      </span>
    </Link>
  );
}
