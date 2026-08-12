"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-40 border-b border-navy/5 bg-cream/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 md:h-16 md:px-8">
        <Link
          href="/"
          className="font-display shrink-0 text-xl font-bold tracking-tight md:text-2xl"
        >
          <span className="text-navy">15</span>
          <span className="text-saffron">AUG</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron/20 bg-gradient-to-r from-saffron/12 via-white to-green/12 px-2.5 py-1.5 text-[10px] font-semibold tracking-wide text-navy shadow-sm sm:gap-2 sm:px-3.5 sm:text-xs">
          <span
            aria-hidden
            className="hidden h-2 w-5 overflow-hidden rounded-full sm:inline-flex"
          >
            <span className="h-full flex-1 bg-saffron" />
            <span className="h-full flex-1 bg-white" />
            <span className="h-full flex-1 bg-green" />
          </span>
          <span className="whitespace-nowrap">
            <span className="text-saffron">80th</span>
            <span className="text-muted"> · </span>
            <span className="hidden sm:inline">Happy Independence Day </span>
            <span className="sm:hidden">Azadi </span>
            <span className="text-green">2026</span>
          </span>
          <span aria-hidden>🇮🇳</span>
        </span>
      </div>
    </motion.header>
  );
}
