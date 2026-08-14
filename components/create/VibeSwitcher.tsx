"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { vibes, type VibeId } from "@/lib/templates";

type Props = {
  value: VibeId;
  onChange: (id: VibeId) => void;
};

export function VibeSwitcher({ value, onChange }: Props) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-saffron">
            One photo · four vibes
          </p>
          <h2 className="font-display mt-0.5 text-lg font-bold text-navy sm:text-xl">
            Switch style anytime
          </h2>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
        {vibes.map((v) => {
          const selected = v.id === value;
          return (
            <motion.button
              key={v.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(v.id)}
              className={`overflow-hidden rounded-2xl border bg-white p-1.5 text-left shadow-sm transition sm:p-2 ${
                selected
                  ? "border-saffron ring-2 ring-saffron/35 shadow-md"
                  : "border-navy/8 hover:border-navy/15"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-ivory">
                <Image
                  src={v.imageSrc}
                  alt={v.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 22vw, 140px"
                />
              </div>
              <p className="mt-1.5 px-0.5 text-center text-[10px] font-bold tracking-wide text-navy sm:text-xs">
                {v.emoji} {v.name}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
