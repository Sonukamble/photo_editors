"use client";

import { motion } from "framer-motion";

export function EmotionalSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:px-8 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-[1.75rem] border border-navy/8 bg-white/80 px-6 py-10 text-center shadow-[0_12px_40px_rgba(15,27,45,0.06)] backdrop-blur sm:px-10"
      >
        <div className="absolute left-1/2 top-0 flex h-1 w-16 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
          <span className="h-full flex-1 bg-saffron" />
          <span className="h-full flex-1 bg-white" />
          <span className="h-full flex-1 bg-green" />
        </div>
        <p className="font-display text-xl font-bold leading-snug text-navy sm:text-2xl md:text-3xl">
          Not another &ldquo;Happy Independence Day&rdquo; post.
        </p>
        <p className="mt-4 text-base text-muted sm:text-lg">
          Make something that feels like{" "}
          <span className="font-semibold text-green">YOU.</span>
        </p>
      </motion.div>
    </section>
  );
}
