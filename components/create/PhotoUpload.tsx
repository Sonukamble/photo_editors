"use client";

import { useRef } from "react";
import { Camera, RefreshCw } from "lucide-react";

type Props = {
  onFile: (file: File) => void;
  previewUrl: string | null;
  error: string | null;
};

export function PhotoUpload({ onFile, previewUrl, error }: Props) {
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

      {previewUrl ? (
        <div className="flex items-center gap-3 rounded-2xl border border-navy/8 bg-white px-3 py-3 shadow-sm sm:px-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ivory ring-1 ring-navy/10">
            {/* blob: preview — native img, not next/image */}
            <img
              src={previewUrl}
              alt="Your photo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-bold text-navy">
              Photo ready
            </p>
            <p className="mt-0.5 text-xs leading-snug text-muted">
              Used on Hero, Cinema, Cartoon & Anime — upload once.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-navy/12 bg-ivory px-3 py-2 text-xs font-semibold text-navy transition hover:border-saffron/40"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Change
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-navy/15 bg-white px-5 py-8 text-center shadow-sm transition hover:border-saffron/50 hover:shadow-md"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/15 text-saffron-deep">
            <Camera className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <span className="font-display text-base font-bold text-navy">
            Upload your photo once
          </span>
          <span className="max-w-[16rem] text-xs leading-snug text-muted">
            JPG or PNG — stays on this device, then try every vibe.
          </span>
        </button>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
