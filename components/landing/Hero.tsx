"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { track, trackVisitorOnce } from "@/lib/analytics";
import { CreativePreview } from "./CreativePreview";

export function Hero() {
  useEffect(() => {
    trackVisitorOnce();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-8 md:px-8 md:pb-14 md:pt-12">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center rounded-full border border-navy/10 bg-white/70 px-3 py-1 text-xs font-medium text-navy/80 shadow-sm backdrop-blur">
            🇮🇳 15 AUGUST 2026
          </span>

          <h1 className="font-display mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl md:text-6xl">
            PUT YOURSELF
            <br />
            IN THE <span className="text-gradient-saffron">STORY.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            Create a beautiful Independence Day post made for your Instagram.
          </p>

          <div className="mt-7 flex flex-col items-center gap-3 lg:items-start">
            <ButtonLink
              href="#vibe"
              className="min-h-12 px-8 text-base sm:text-lg"
              onClick={() =>
                track("create_clicked", { source: "hero_cta" })
              }
            >
              Create Mine 🇮🇳
            </ButtonLink>
            <p className="text-sm text-muted">Free to try • No login</p>
          </div>
        </motion.div>

        <CreativePreview />
      </div>
    </section>
  );
}
