"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 text-center md:px-8 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Ready to make yours?
        </h2>
        <div className="mt-7 flex justify-center">
          <ButtonLink
            href="/create?style=heritage"
            className="min-h-12 px-8 text-base sm:text-lg"
          >
            Create My 15 August 🇮🇳
          </ButtonLink>
        </div>
      </motion.div>
    </section>
  );
}
