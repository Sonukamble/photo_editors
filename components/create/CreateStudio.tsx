"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TemplatePicker } from "@/components/create/TemplatePicker";
import { PhotoUpload } from "@/components/create/PhotoUpload";
import { ComposerCanvas } from "@/components/create/ComposerCanvas";
import { DownloadButton } from "@/components/create/DownloadButton";
import { VibeSwitcher } from "@/components/create/VibeSwitcher";
import type { PhotoTransform } from "@/lib/compose-canvas";
import { loadUserPhoto, saveUserPhoto } from "@/lib/user-photo";
import { track } from "@/lib/analytics";
import {
  getTemplatesForVibe,
  getVibe,
  resolveCreateSelection,
  type TemplateId,
  type VibeId,
} from "@/lib/templates";

const MAX_BYTES = 12 * 1024 * 1024;
const DEFAULT_TRANSFORM: PhotoTransform = {
  scale: 1.08,
  offsetX: 0,
  offsetY: 0,
};

type Props = {
  vibe?: string;
  initialStyle?: string;
};

export function CreateStudio({ vibe: vibeParam, initialStyle }: Props) {
  const initial = useMemo(
    () => resolveCreateSelection({ vibe: vibeParam, style: initialStyle }),
    [vibeParam, initialStyle]
  );

  const [vibeId, setVibeId] = useState<VibeId>(initial.vibe.id);
  const [picked, setPicked] = useState<Partial<Record<VibeId, TemplateId>>>({
    [initial.vibe.id]: initial.template.id,
  });
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [transform, setTransform] = useState<PhotoTransform>(DEFAULT_TRANSFORM);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const uploadedRef = useRef(false);
  const studioRef = useRef<HTMLElement | null>(null);

  const vibe = getVibe(vibeId);
  const vibeTemplates = useMemo(() => getTemplatesForVibe(vibeId), [vibeId]);
  const selectedId =
    picked[vibeId] ??
    (vibeTemplates.some((t) => t.id === initial.template.id)
      ? initial.template.id
      : vibe.defaultTemplateId);
  const template =
    vibeTemplates.find((t) => t.id === selectedId) ?? vibeTemplates[0]!;

  const vibeIdRef = useRef(vibeId);
  const selectedIdRef = useRef(selectedId);
  vibeIdRef.current = vibeId;
  selectedIdRef.current = selectedId;

  useEffect(() => {
    let cancelled = false;
    loadUserPhoto().then((blob) => {
      if (!blob || cancelled || uploadedRef.current) return;
      setObjectUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!objectUrl) return;

    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) {
        setImage(img);
        if (uploadedRef.current) {
          track("image_generated", {
            vibe: vibeIdRef.current,
            template_id: selectedIdRef.current,
          });
        }
      }
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

  function scrollToStudio() {
    const run = () => {
      const el = studioRef.current;
      if (!el) return;
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      el.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    };
    requestAnimationFrame(() => {
      window.setTimeout(run, 50);
    });
  }

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setUploadError("Image is too large (max 12MB).");
      return;
    }
    uploadedRef.current = true;
    setUploadError(null);
    setImage(null);
    setTransform(DEFAULT_TRANSFORM);
    setObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    void saveUserPhoto(file);
    track("photo_uploaded", { vibe: vibeId, template_id: selectedId });
    scrollToStudio();
  }

  function handleVibe(next: VibeId) {
    if (next === vibeId) return;
    setVibeId(next);
    setTransform(DEFAULT_TRANSFORM);
    window.history.replaceState(null, "", `/create?vibe=${next}`);
    const nextVibe = getVibe(next);
    track("template_selected", {
      vibe: next,
      template_id: picked[next] ?? nextVibe.defaultTemplateId,
      source: "vibe_switch",
    });
    if (objectUrl) {
      track("image_generated", {
        vibe: next,
        template_id: picked[next] ?? nextVibe.defaultTemplateId,
      });
      scrollToStudio();
    }
  }

  const tipFace =
    vibeId === "hero"
      ? "Center your face in the circle — drag and zoom"
      : vibeId === "cartoon" || vibeId === "anime"
        ? "Fit your photo inside the frame — drag and zoom"
        : vibeId === "cinema"
          ? "Center your face in the circle — drag and zoom"
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

      <div className="mb-6 max-w-3xl">
        <p className="mb-2 text-sm font-semibold tracking-wide text-saffron">
          {vibe.emoji} {vibe.name}
        </p>
        <h1 className="font-display text-[1.85rem] font-extrabold leading-[1.1] tracking-tight text-navy sm:text-4xl md:text-5xl">
          ONE PHOTO.
          <br />
          EVERY <span className="text-gradient-saffron">VIBE.</span>
        </h1>
        <p className="mt-3 text-sm text-muted sm:text-base">
          Upload once, then flip between Hero, Cinema, Cartoon, and Anime.
        </p>
      </div>

      <div className="mb-8">
        <VibeSwitcher value={vibeId} onChange={handleVibe} />
      </div>

      <section
        ref={studioRef}
        id="studio"
        className="scroll-mt-4 grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10"
      >
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
            previewUrl={objectUrl}
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

          <DownloadButton
            canvasRef={canvasRef}
            disabled={!image}
            vibe={vibeId}
            templateId={template.id}
          />
          {!image && (
            <p className="text-center text-sm text-muted lg:text-left">
              Upload a photo once — then download any vibe.
            </p>
          )}
        </div>
      </section>

      <TemplatePicker
        templates={vibeTemplates}
        selectedId={template.id}
        title={`${vibe.name} templates (${vibeTemplates.length})`}
        onSelect={(id) => {
          setPicked((prev) => ({ ...prev, [vibeId]: id }));
          setTransform(DEFAULT_TRANSFORM);
          track("template_selected", {
            vibe: vibeId,
            template_id: id,
            source: "picker",
          });
          if (objectUrl) {
            track("image_generated", {
              vibe: vibeId,
              template_id: id,
            });
          }
          scrollToStudio();
        }}
      />
    </div>
  );
}
