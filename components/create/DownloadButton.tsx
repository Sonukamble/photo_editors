"use client";

import { useState } from "react";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { canvasToPngBlob } from "@/lib/compose-canvas";
import { track } from "@/lib/analytics";
import type { TemplateId, VibeId } from "@/lib/templates";

const SITE_URL = "https://photo-editors.vercel.app/";
const SHARE_TEXT = `My Independence Day poster 🇮🇳\n${SITE_URL}`;

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  disabled: boolean;
  vibe?: VibeId;
  templateId?: TemplateId;
};

export function DownloadButton({
  canvasRef,
  disabled,
  vibe,
  templateId,
}: Props) {
  const [busy, setBusy] = useState(false);
  const [shareNote, setShareNote] = useState<string | null>(null);

  async function getBlob() {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvasToPngBlob(canvas);
  }

  async function handleDownload() {
    setBusy(true);
    setShareNote(null);
    try {
      const blob = await getBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "15aug-2026.png";
      a.click();
      URL.revokeObjectURL(url);
      track("downloaded", { vibe, template_id: templateId });
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    setBusy(true);
    setShareNote(null);
    try {
      const blob = await getBlob();
      if (!blob) return;
      const file = new File([blob], "15aug-2026.png", { type: "image/png" });
      const withLink = {
        files: [file],
        title: "15 AUG",
        text: SHARE_TEXT,
        url: SITE_URL,
      };
      const filesAndText = {
        files: [file],
        title: "15 AUG",
        text: SHARE_TEXT,
      };

      if (navigator.canShare?.(withLink)) {
        await navigator.share(withLink);
        track("shared", { vibe, template_id: templateId, method: "native" });
        return;
      }

      if (navigator.canShare?.(filesAndText)) {
        await navigator.share(filesAndText);
        track("shared", { vibe, template_id: templateId, method: "native" });
        return;
      }

      // Fallback: copy not available for files in all browsers — download instead
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "15aug-2026.png";
      a.click();
      URL.revokeObjectURL(url);
      track("downloaded", {
        vibe,
        template_id: templateId,
        source: "share_fallback",
      });
      setShareNote("Share isn’t supported here — poster downloaded instead.");
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      setShareNote("Couldn’t share. Try Download instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        className="min-h-12 w-full text-base"
        disabled={disabled || busy}
        onClick={handleDownload}
      >
        <Download className="h-5 w-5" />
        Download My Poster
      </Button>
      <Button
        type="button"
        variant="outline"
        className="min-h-11 w-full"
        disabled={disabled || busy}
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      {shareNote && <p className="text-center text-xs text-muted">{shareNote}</p>}
      <p className="text-center text-[11px] text-muted">
        Powered by 15aug · stays on your device
      </p>
    </div>
  );
}
