/**
 * Thin wrapper — same canvas compose path for every vibe/template.
 * generateImage(userPhoto, templates.hero) style API.
 */
import {
  composeCanvas,
  type PhotoTransform,
} from "@/lib/compose-canvas";
import type { Template } from "@/lib/templates";

export type { PhotoTransform };

export function generateImage(
  canvas: HTMLCanvasElement,
  template: Template,
  photo: HTMLImageElement | null,
  transform: PhotoTransform,
  templateArt: HTMLImageElement | null
) {
  composeCanvas(canvas, template.canvas, photo, transform, templateArt);
}
