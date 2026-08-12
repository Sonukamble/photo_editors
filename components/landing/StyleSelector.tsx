"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { vibes } from "@/lib/templates";

export function StyleSelector() {
  const [soonId, setSoonId] = useState<string | null>(null);

  return (
    <section
      id="vibe"
      className="mx-auto scroll-mt-24 max-w-6xl px-4 py-12 md:px-8 md:py-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-center text-2xl font-bold text-navy sm:text-3xl md:text-left"
      >
        Choose your vibe.
      </motion.h2>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {vibes.map((v, i) => {
          const card = (
            <motion.div
              whileHover={v.ready ? { scale: 1.03 } : undefined}
              whileTap={v.ready ? { scale: 0.98 } : undefined}
              className={`relative overflow-hidden rounded-2xl bg-white p-2 shadow-md ring-1 ring-navy/5 transition ${
                v.ready
                  ? "hover:shadow-xl cursor-pointer"
                  : "cursor-not-allowed opacity-90"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ivory">
                <Image
                  src={v.imageSrc}
                  alt={v.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 220px"
                />
                {!v.ready && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                    Soon
                  </span>
                )}
              </div>
              <div className="mt-3 px-1 pb-1">
                <p className="font-display text-sm font-bold tracking-wide text-navy">
                  {v.emoji} {v.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">{v.blurb}</p>
              </div>
            </motion.div>
          );

          return (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              {v.ready && v.href ? (
                <Link href={v.href} className="block focus-visible:outline-none">
                  {card}
                </Link>
              ) : (
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => {
                    setSoonId(v.id);
                    window.setTimeout(() => setSoonId(null), 2200);
                  }}
                >
                  {card}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {soonId && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 text-center text-sm font-medium text-navy"
        >
          {soonId.toUpperCase()} is coming soon — try{" "}
          <span className="text-saffron">HERO</span> for now.
        </motion.p>
      )}
    </section>
  );
}
