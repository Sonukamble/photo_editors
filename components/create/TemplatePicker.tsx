"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Template, TemplateId } from "@/lib/templates";

type Props = {
  templates: Template[];
  selectedId: TemplateId;
  onSelect: (id: TemplateId) => void;
  title?: string;
};

export function TemplatePicker({
  templates,
  selectedId,
  onSelect,
  title,
}: Props) {
  return (
    <section className="mt-12 md:mt-16">
      <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
        {title ?? `Choose from ${templates.length} templates`}
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-4">
        {templates.map((t) => {
          const selected = selectedId === t.id;
          return (
            <motion.button
              key={t.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelect(t.id)}
              className={`rounded-2xl border bg-white p-2 text-left shadow-sm transition ${
                selected
                  ? "border-saffron ring-2 ring-saffron/35 shadow-md"
                  : "border-navy/8 hover:border-navy/15"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ivory">
                <Image
                  src={t.canvas.imageSrc}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 160px"
                />
              </div>
              <p className="mt-2 px-0.5 text-xs font-bold text-navy sm:text-sm">
                {t.emoji} {t.name}
              </p>
              <p className="px-0.5 text-[10px] leading-snug text-muted sm:text-xs">
                {t.blurb}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
