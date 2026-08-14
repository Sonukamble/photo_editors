"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TemplatePicker } from "@/components/create/TemplatePicker";
import { PhotoUpload } from "@/components/create/PhotoUpload";
import { ComposerCanvas } from "@/components/create/ComposerCanvas";
import { DownloadButton } from "@/components/create/DownloadButton";
import type { PhotoTransform } from "@/lib/compose-canvas";
import {
  getTemplatesForVibe,
  resolveCreateSelection,
  type TemplateId,
  type VibeId,
} from "@/lib/templates";

const MAX_BYTES = 12 * 1024 * 1024;

type Props = {
  vibe?: string;
  initialStyle?: string;
};

export function CreateStudio({ vibe: vibeParam, initialStyle }: Props) {
  const initial = useMemo(
    () => resolveCreateSelection({ vibe: vibeParam, style: initialStyle }),
    [vibeParam, initialStyle]
  );

  const vibeId = initial.vibe.id as VibeId;
  const vibeTemplates = useMemo(
    () => getTemplatesForVibe(vibeId),
    [vibeId]
  );

  const [selectedId, setSelectedId] = useState<TemplateId>(initial.template.id);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [transform, setTransform] = useState<PhotoTransform>({
    scale: 1.08,
    offsetX: 0,
    offsetY: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const template =
    vibeTemplates.find((t) => t.id === selectedId) ?? vibeTemplates[0]!;

  useEffect(() => {
    // Keep selection valid when vibe changes
    if (!vibeTemplates.some((t) => t.id === selectedId)) {
      setSelectedId(vibeTemplates[0]!.id);
    }
  }, [vibeTemplates, selectedId]);

  useEffect(() => {
    if (!objectUrl) return;

    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setImage(img);
    };
    img.onerror = () => {
      if (!cancelled) {
        setUploadError("Could not load that image. Try another file.");
        setImage(null);
      }
    };
    img.src = objectUrl;

    return () => {
      cancelled = true;
    };
  }, [objectUrl]);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setUploadError("Image is too large (max 12MB).");
      return;
    }
    setUploadError(null);
    setImage(null);
    setTransform({ scale: 1.08, offsetX: 0, offsetY: 0 });
    setObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  const tipFace =
    vibeId === "cartoon" || vibeId === "anime"
      ? "Fit your photo inside the frame — drag and zoom"
      : vibeId === "cinema"
        ? "Place your face in the silhouette — it fades into the poster"
        : "Drag the preview to position your photo";

  return (
    <div className="mx-auto max-w-6xl px-4 pb-14 pt-5 md:px-8 md:pt-8">
      <header className="mb-8 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight md:text-2xl"
        >
          <span className="text-navy">15</span>
          <span className="text-saffron">AUG</span>
        </Link>
        <Link
          href="/#vibe"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-navy/12 bg-white/80 px-4 text-sm font-medium text-navy transition hover:border-navy/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </header>

      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-semibold tracking-wide text-saffron">
          {initial.vibe.emoji} {initial.vibe.name} vibe
        </p>
        <h1 className="font-display text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-5xl">
          UPLOAD YOUR PHOTO.
          <br />
          PICK YOUR <span className="text-gradient-saffron">TEMPLATE.</span>
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          {vibeTemplates.length} {initial.vibe.name.toLowerCase()} Independence
          Day posters — same editor, this vibe’s frames.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
        <ComposerCanvas
          canvasLayout={template.canvas}
          image={image}
          transform={transform}
          onTransformChange={setTransform}
          canvasRef={canvasRef}
        />

        <div className="space-y-4 lg:pt-1">
          <PhotoUpload
            onFile={handleFile}
            hasPhoto={Boolean(objectUrl)}
            error={uploadError}
          />

          <div className="rounded-2xl border border-navy/8 bg-white/80 px-5 py-4 shadow-sm">
            <p className="font-display text-sm font-bold text-navy">
              Tips for the best result
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-muted">
              <li>• Use a clear portrait with good light</li>
              <li>• {tipFace}</li>
              <li>• Zoom until you fill the frame cleanly</li>
            </ul>
          </div>

          <DownloadButton canvasRef={canvasRef} disabled={!image} />
          {!image && (
            <p className="text-center text-sm text-muted lg:text-left">
              Upload a photo to download or share.
            </p>
          )}
        </div>
      </div>

      <TemplatePicker
        templates={vibeTemplates}
        selectedId={template.id}
        title={`${initial.vibe.name} templates (${vibeTemplates.length})`}
        onSelect={(id) => {
          setSelectedId(id);
          setTransform({ scale: 1.08, offsetX: 0, offsetY: 0 });
        }}
      />
    </div>
  );
}
