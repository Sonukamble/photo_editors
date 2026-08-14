"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { vibes } from "@/lib/templates";

export function StyleSelector() {
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
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted md:mx-0 md:text-left">
        Upload your photo once — then try Hero, Cinema, Cartoon, and Anime.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {vibes.map((v, i) => (
          <motion.div
            key={v.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              href={v.href ?? `/create?vibe=${v.id}`}
              className="group block focus-visible:outline-none"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-md ring-1 ring-navy/5 transition hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ivory">
                  <Image
                    src={v.imageSrc}
                    alt={v.name}
                    fill
                    className="object-cover transition group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 45vw, 220px"
                  />
                </div>
                <div className="mt-3 px-1 pb-1">
                  <p className="font-display text-sm font-bold tracking-wide text-navy">
                    {v.emoji} {v.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{v.blurb}</p>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
