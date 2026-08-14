"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  composeCanvas,
  loadTemplateImage,
  type PhotoTransform,
} from "@/lib/compose-canvas";
import type { TemplateCanvas } from "@/lib/templates";

type Props = {
  canvasLayout: TemplateCanvas;
  image: HTMLImageElement | null;
  transform: PhotoTransform;
  onTransformChange: (next: PhotoTransform) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export function ComposerCanvas({
  canvasLayout,
  image,
  transform,
  onTransformChange,
  canvasRef,
}: Props) {
  const [templateArt, setTemplateArt] = useState<HTMLImageElement | null>(null);
  const dragRef = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    setTemplateArt(null);
    loadTemplateImage(canvasLayout.imageSrc)
      .then((img) => {
        if (!cancelled) setTemplateArt(img);
      })
      .catch(() => {
        if (!cancelled) setTemplateArt(null);
      });
    return () => {
      cancelled = true;
    };
  }, [canvasLayout.imageSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    composeCanvas(canvas, canvasLayout, image, transform, templateArt);
  }, [canvasRef, canvasLayout, image, transform, templateArt]);

  function onPointerDown(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!image) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      x: e.clientX,
      y: e.clientY,
      ox: transform.offsetX,
      oy: transform.offsetY,
    };
  }

  function onPointerMove(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!dragRef.current) return;
    const scale = canvasLayout.width / e.currentTarget.clientWidth;
    const dx = (e.clientX - dragRef.current.x) * scale;
    const dy = (e.clientY - dragRef.current.y) * scale;
    onTransformChange({
      ...transform,
      offsetX: dragRef.current.ox + dx,
      offsetY: dragRef.current.oy + dy,
    });
  }

  function onPointerUp(e: ReactPointerEvent<HTMLCanvasElement>) {
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-[1.5rem] bg-white p-2 shadow-[0_20px_50px_rgba(15,27,45,0.12)] ring-1 ring-navy/5 sm:p-3">
        <canvas
          key={canvasLayout.imageSrc}
          ref={canvasRef}
          style={{
            aspectRatio: `${canvasLayout.width} / ${canvasLayout.height}`,
          }}
          className={`mx-auto w-full max-w-md rounded-[1.15rem] touch-none transition-opacity duration-300 ${
            templateArt ? "opacity-100" : "opacity-70"
          } ${image ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>
      {image && (
        <label className="mt-3 flex items-center gap-3 text-sm text-navy">
          <span className="w-12 shrink-0 text-muted">Zoom</span>
          <input
            type="range"
            min={1}
            max={2.4}
            step={0.01}
            value={transform.scale}
            onChange={(e) =>
              onTransformChange({
                ...transform,
                scale: Number(e.target.value),
              })
            }
            className="h-2 w-full accent-saffron"
          />
        </label>
      )}
    </div>
  );
}
