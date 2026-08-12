"use client";

import { motion } from "framer-motion";

/** Hero preview — Heroes tribute template artwork */
export function CreativePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-saffron/25 via-transparent to-green/20 blur-2xl"
      />
      <div className="animate-float-soft relative rounded-3xl bg-white p-1.5 shadow-[0_25px_60px_rgba(15,27,45,0.18)] ring-1 ring-navy/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/templates/template-04-heroes-tribute.png"
          alt="Remembering our heroes — Independence Day creative preview"
          width={720}
          height={982}
          className="block h-auto w-full rounded-[1.35rem] object-cover"
          decoding="async"
        />
      </div>
    </motion.div>
  );
}
