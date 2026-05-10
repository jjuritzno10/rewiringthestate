"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function DocumentHeader({
  breadcrumb,
  right,
}: {
  breadcrumb?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <header className="relative z-20 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-center justify-between h-14 gap-6">
          <Link
            href="/"
            aria-label="Rewire the State — home"
            className="flex items-center gap-3 min-w-0 group"
          >
            <Image
              src="/crest.svg"
              alt=""
              width={22}
              height={22}
              priority
              className="h-[22px] w-auto crest shrink-0"
            />
            <span className="font-display font-semibold uppercase text-[13px] tracking-[0.14em] leading-none text-ink group-hover:text-accent transition-colors">
              Rewire the State
            </span>
            {breadcrumb && (
              <span className="tag tag-sm text-faded truncate hidden sm:inline ml-3">
                / {breadcrumb}
              </span>
            )}
          </Link>
          <div className="flex items-center gap-5 shrink-0">
            {right}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
