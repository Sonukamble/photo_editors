"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";

type Props = {
  onFile: (file: File) => void;
  hasPhoto: boolean;
  error: string | null;
};

export function PhotoUpload({ onFile, hasPhoto, error }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-navy/10 bg-white px-5 py-8 text-center shadow-sm transition hover:border-saffron/40 hover:shadow-md"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/15 text-saffron-deep">
          <Camera className="h-6 w-6" strokeWidth={1.75} />
        </span>
        <span className="font-display text-base font-bold text-navy">
          {hasPhoto ? "Change your photo" : "Upload your photo"}
        </span>
        <span className="text-xs text-muted">
          JPG or PNG — Stays on your device.
        </span>
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
