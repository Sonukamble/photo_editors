export type TemplateId =
  | "heritage"
  | "moment"
  | "vande"
  | "heroes"
  | "tiranga"
  | "united"
  | "swatantrata"
  | "paint"
  | "ribbon-a"
  | "ribbon-b"
  | "global";

export type VibeId = "hero" | "cinema" | "cartoon" | "anime";

export type Vibe = {
  id: VibeId;
  name: string;
  emoji: string;
  blurb: string;
  ready: boolean;
  thumbClass: string;
  imageSrc: string;
  href?: string;
};

/** Photo hole as fractions (0–1) of the template PNG itself */
export type PhotoSlot = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type PhotoShape = "rect" | "ellipse" | "circle";

export type TemplateCanvas = {
  width: number;
  height: number;
  photo: PhotoSlot;
  photoShape: PhotoShape;
  caption: string;
  subcaption: string;
  imageSrc: string;
};

export type Template = {
  id: TemplateId;
  name: string;
  emoji: string;
  blurb: string;
  canvas: TemplateCanvas;
};

export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 1350;

export function makeCanvas(opts: {
  imageSrc: string;
  caption: string;
  subcaption: string;
  photo: PhotoSlot;
  photoShape?: PhotoShape;
}): TemplateCanvas {
  return {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    imageSrc: opts.imageSrc,
    caption: opts.caption,
    subcaption: opts.subcaption,
    photo: opts.photo,
    photoShape: opts.photoShape ?? "rect",
  };
}
