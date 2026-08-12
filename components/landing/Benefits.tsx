"use client";

import { ImageIcon, LockOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    icon: ImageIcon,
    title: "Made for Instagram",
    desc: "4:5 portrait posts that look native in your feed.",
  },
  {
    icon: LockOpen,
    title: "No login",
    desc: "Open, create, download. Nothing to sign up for.",
  },
  {
    icon: Sparkles,
    title: "Free to try",
    desc: "Make your 15 August creative in minutes.",
  },
];

export function Benefits() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-6 sm:grid-cols-3">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl px-4 py-5 text-center"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-saffron/15 text-saffron-deep">
              <item.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <h3 className="font-display mt-3 text-base font-bold text-navy">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
