import {
  makeCanvas,
  type Template,
  type TemplateId,
  type Vibe,
  type VibeId,
} from "@/lib/templates/types";

/**
 * Independence Day poster templates by vibe.
 * PNGs in /public/templates/ — same generateImage(photo, template) canvas path for all.
 */
export const templates: Template[] = [
  // —— HERO (existing) ——
  {
    id: "heritage",
    vibe: "hero",
    name: "HERITAGE",
    emoji: "🎖️",
    blurb: "79 years · oval frame",
    canvas: makeCanvas({
      imageSrc: "/templates/template-01-heritage-oval.png",
      caption: "JAI HIND",
      subcaption: "79 YEARS OF INDEPENDENCE",
      photo: { x: 0.18, y: 0.32, w: 0.64, h: 0.42 },
      photoShape: "ellipse",
    }),
  },
  {
    id: "moment",
    vibe: "hero",
    name: "MOMENT",
    emoji: "📸",
    blurb: "Ribbon card · add your moment",
    canvas: makeCanvas({
      imageSrc: "/templates/template-02-moment-ribbon.png",
      caption: "HAPPY INDEPENDENCE DAY",
      subcaption: "AUGUST 15, 2026",
      photo: { x: 0.06, y: 0.48, w: 0.4, h: 0.42 },
      photoShape: "rect",
    }),
  },
  {
    id: "vande",
    vibe: "hero",
    name: "VANDE",
    emoji: "🇮🇳",
    blurb: "Youth power · Vande Mataram",
    canvas: makeCanvas({
      imageSrc: "/templates/template-03-vande-mataram.png",
      caption: "VANDE MATARAM",
      subcaption: "AUGUST 15, 2026",
      photo: { x: 0.06, y: 0.55, w: 0.38, h: 0.38 },
      photoShape: "rect",
    }),
  },
  {
    id: "heroes",
    vibe: "hero",
    name: "HEROES",
    emoji: "🫡",
    blurb: "Remembering our heroes",
    canvas: makeCanvas({
      imageSrc: "/templates/template-04-heroes-tribute.png",
      caption: "REMEMBERING OUR HEROES",
      subcaption: "HAPPY INDEPENDENCE DAY",
      photo: { x: 0.5, y: 0.58, w: 0.42, h: 0.32 },
      photoShape: "rect",
    }),
  },
  {
    id: "tiranga",
    vibe: "hero",
    name: "TIRANGA",
    emoji: "🚩",
    blurb: "Waves of the Tiranga",
    canvas: makeCanvas({
      imageSrc: "/templates/template-05-tiranga-waves.png",
      caption: "INDIA INDEPENDENCE DAY",
      subcaption: "15 AUGUST 2026",
      photo: { x: 0.5, y: 0.52, w: 0.42, h: 0.4 },
      photoShape: "rect",
    }),
  },
  {
    id: "united",
    vibe: "hero",
    name: "UNITED",
    emoji: "✨",
    blurb: "80th · unity in diversity",
    canvas: makeCanvas({
      imageSrc: "/templates/template-06-united-80th.png",
      caption: "80th INDEPENDENCE DAY",
      subcaption: "UNITED INDIA 2026",
      photo: { x: 0.2, y: 0.42, w: 0.6, h: 0.34 },
      photoShape: "circle",
    }),
  },
  {
    id: "swatantrata",
    vibe: "hero",
    name: "SWATANTRATA",
    emoji: "🏛️",
    blurb: "Swatantrata Diwas night",
    canvas: makeCanvas({
      imageSrc: "/templates/template-07-swatantrata.png",
      caption: "SWATANTRATA DIWAS",
      subcaption: "15 AUGUST 2026",
      photo: { x: 0.52, y: 0.58, w: 0.4, h: 0.32 },
      photoShape: "rect",
    }),
  },
  {
    id: "paint",
    vibe: "hero",
    name: "PAINT",
    emoji: "🎨",
    blurb: "Brushstroke 80th freedom",
    canvas: makeCanvas({
      imageSrc: "/templates/template-08-paint-80th.png",
      caption: "INDIA'S 80th INDEPENDENCE",
      subcaption: "HAPPY 15 AUGUST 2026",
      photo: { x: 0.48, y: 0.55, w: 0.44, h: 0.36 },
      photoShape: "ellipse",
    }),
  },
  {
    id: "ribbon-a",
    vibe: "hero",
    name: "RIBBON A",
    emoji: "🧡",
    blurb: "Tricolor ribbon · compact",
    canvas: makeCanvas({
      imageSrc: "/templates/template-09-ribbon-compact-a.png",
      caption: "HAPPY INDEPENDENCE DAY",
      subcaption: "AUGUST 15, 2026",
      photo: { x: 0.12, y: 0.28, w: 0.76, h: 0.45 },
      photoShape: "rect",
    }),
  },
  {
    id: "ribbon-b",
    vibe: "hero",
    name: "RIBBON B",
    emoji: "💚",
    blurb: "Saffron & green ribbons",
    canvas: makeCanvas({
      imageSrc: "/templates/template-10-ribbon-compact-b.png",
      caption: "HAPPY INDEPENDENCE DAY",
      subcaption: "AUGUST 15, 2026",
      photo: { x: 0.12, y: 0.22, w: 0.76, h: 0.5 },
      photoShape: "rect",
    }),
  },
  {
    id: "global",
    vibe: "hero",
    name: "GLOBAL",
    emoji: "🌏",
    blurb: "Global Indian pride",
    canvas: makeCanvas({
      imageSrc: "/templates/template-11-global-pride.png",
      caption: "GLOBAL INDIAN PRIDE",
      subcaption: "15 AUGUST 2026",
      photo: { x: 0.04, y: 0.1, w: 0.38, h: 0.8 },
      photoShape: "ellipse",
    }),
  },

  // —— CINEMA (public/cinematic only) ——
  {
    id: "cinema-arches",
    vibe: "cinema",
    name: "ARCHES",
    emoji: "🌃",
    blurb: "Temple light · film poster",
    canvas: makeCanvas({
      imageSrc:
        "/cinematic/Gemini_Generated_Image_3w2aq13w2aq13w2a.png",
      caption: "15 AUGUST",
      subcaption: "80TH INDEPENDENCE DAY",
      photo: { x: 0.24, y: 0.15, w: 0.52, h: 0.5 },
      photoShape: "ellipse",
      photoFade: "bottom",
    }),
  },
  {
    id: "cinema-flag",
    vibe: "cinema",
    name: "FLAG",
    emoji: "🎬",
    blurb: "Tricolor drape · silhouette",
    canvas: makeCanvas({
      imageSrc:
        "/cinematic/Gemini_Generated_Image_jjxfpmjjxfpmjjxf.png",
      caption: "15 AUGUST",
      subcaption: "INDIA · 1947 — 2026",
      photo: { x: 0.22, y: 0.14, w: 0.56, h: 0.48 },
      photoShape: "ellipse",
      photoFade: "bottom",
    }),
  },
  {
    id: "cinema-legacy",
    vibe: "cinema",
    name: "LEGACY",
    emoji: "🎖️",
    blurb: "1947 to 2026 · your portrait",
    canvas: makeCanvas({
      imageSrc:
        "/cinematic/Gemini_Generated_Image_xwhud3xwhud3xwhu.png",
      caption: "80 YEARS OF FREEDOM",
      subcaption: "FROM FREEDOM TO THE FUTURE",
      photo: { x: 0.25, y: 0.16, w: 0.43, h: 0.5 },
      photoShape: "ellipse",
      photoFade: "bottom",
    }),
  },
  {
    id: "cinema-split",
    vibe: "cinema",
    name: "SPLIT",
    emoji: "✨",
    blurb: "Past & future · center face",
    canvas: makeCanvas({
      imageSrc:
        "/cinematic/Gemini_Generated_Image_qqg9mkqqg9mkqqg9.png",
      caption: "80 YEARS OF FREEDOM",
      subcaption: "FROM FREEDOM TO THE FUTURE",
      photo: { x: 0.34, y: 0.14, w: 0.33, h: 0.52 },
      photoShape: "ellipse",
      photoFade: "bottom",
    }),
  },
  {
    id: "cinema-horizon",
    vibe: "cinema",
    name: "HORIZON",
    emoji: "🌅",
    blurb: "Collage frame · fade in",
    canvas: makeCanvas({
      imageSrc:
        "/cinematic/Gemini_Generated_Image_5bmuti5bmuti5bmu.png",
      caption: "15 AUGUST",
      subcaption: "80TH INDEPENDENCE DAY",
      photo: { x: 0.24, y: 0.15, w: 0.4, h: 0.48 },
      photoShape: "ellipse",
      photoFade: "bottom",
    }),
  },

  // —— CARTOON (public/cartoon only) ——
  {
    id: "cartoon-frame",
    vibe: "cartoon",
    name: "FRAME",
    emoji: "🎨",
    blurb: "Dashed frame · kites & flags",
    canvas: makeCanvas({
      imageSrc: "/cartoon/Gemini_Generated_Image_d7o1ywd7o1ywd7o1.png",
      caption: "HAPPY 15 AUGUST",
      subcaption: "80TH INDEPENDENCE DAY",
      photo: { x: 0.18, y: 0.26, w: 0.64, h: 0.5 },
      photoShape: "rect",
    }),
  },
  {
    id: "cartoon-parade",
    vibe: "cartoon",
    name: "PARADE",
    emoji: "🪖",
    blurb: "Cute soldiers · your photo",
    canvas: makeCanvas({
      imageSrc: "/cartoon/Gemini_Generated_Image_qgakiyqgakiyqgak.png",
      caption: "HAPPY 15 AUGUST",
      subcaption: "80TH INDEPENDENCE DAY",
      photo: { x: 0.22, y: 0.2, w: 0.56, h: 0.42 },
      photoShape: "rect",
    }),
  },
  {
    id: "cartoon-polaroid",
    vibe: "cartoon",
    name: "POLAROID",
    emoji: "🧸",
    blurb: "Polaroid · kids of freedom",
    canvas: makeCanvas({
      imageSrc: "/cartoon/Gemini_Generated_Image_fncv61fncv61fncv.png",
      caption: "15 AUGUST",
      subcaption: "80TH INDEPENDENCE DAY",
      photo: { x: 0.24, y: 0.3, w: 0.52, h: 0.38 },
      photoShape: "rect",
    }),
  },

  // —— ANIME (public/anime only) ——
  {
    id: "anime-halo",
    vibe: "anime",
    name: "HALO",
    emoji: "🌸",
    blurb: "Golden hour · chakra glow",
    canvas: makeCanvas({
      imageSrc: "/anime/Gemini_Generated_Image_nzlcnqnzlcnqnzlc.png",
      caption: "HAPPY 15 AUGUST",
      subcaption: "80TH INDEPENDENCE DAY",
      photo: { x: 0.22, y: 0.28, w: 0.56, h: 0.55 },
      photoShape: "rect",
      photoFade: "bottom",
    }),
  },
  {
    id: "anime-circle",
    vibe: "anime",
    name: "CIRCLE",
    emoji: "🪁",
    blurb: "Rooftop kites · round frame",
    canvas: makeCanvas({
      imageSrc: "/anime/Gemini_Generated_Image_shtvnkshtvnkshtv.png",
      caption: "HAPPY 15 AUGUST",
      subcaption: "80TH INDEPENDENCE DAY",
      photo: { x: 0.2, y: 0.28, w: 0.6, h: 0.48 },
      photoShape: "circle",
    }),
  },
  {
    id: "anime-sky",
    vibe: "anime",
    name: "SKY",
    emoji: "🌅",
    blurb: "Flag sunset · portrait frame",
    canvas: makeCanvas({
      imageSrc: "/anime/Gemini_Generated_Image_bzq1zsbzq1zsbzq1.png",
      caption: "HAPPY INDEPENDENCE DAY",
      subcaption: "80 YEARS OF FREEDOM",
      photo: { x: 0.22, y: 0.36, w: 0.56, h: 0.48 },
      photoShape: "rect",
      photoFade: "bottom",
    }),
  },
  {
    id: "anime-celebrate",
    vibe: "anime",
    name: "CELEBRATE",
    emoji: "🎉",
    blurb: "Wide poster · photo on right",
    canvas: makeCanvas({
      imageSrc: "/anime/Gemini_Generated_Image_96tq9a96tq9a96tq.png",
      caption: "CELEBRATE YOUR FREEDOM",
      subcaption: "HAPPY 80TH INDEPENDENCE DAY",
      photo: { x: 0.551, y: 0.289, w: 0.402, h: 0.469 },
      photoShape: "rect",
      width: 1376,
      height: 768,
    }),
  },
  {
    id: "anime-polaroid",
    vibe: "anime",
    name: "POLAROID",
    emoji: "✨",
    blurb: "Festive polaroid · your face",
    canvas: makeCanvas({
      imageSrc: "/anime/Gemini_Generated_Image_fncv61fncv61fncv.png",
      caption: "15 AUGUST",
      subcaption: "80TH INDEPENDENCE DAY",
      photo: { x: 0.24, y: 0.3, w: 0.52, h: 0.38 },
      photoShape: "rect",
    }),
  },
];

export const DEFAULT_TEMPLATE_ID: TemplateId = "heritage";

export const vibes: Vibe[] = [
  {
    id: "hero",
    name: "HERO",
    emoji: "⚑",
    blurb: "Proud, patriotic, poster-worthy",
    ready: true,
    thumbClass: "from-[#2b1d0e] via-[#c45c12] to-[#ffb347]",
    imageSrc: "/home/vibe-hero.png",
    href: "/create?vibe=hero",
    defaultTemplateId: "heritage",
  },
  {
    id: "cinema",
    name: "CINEMA",
    emoji: "🎬",
    blurb: "Film-still grade, moody lights",
    ready: true,
    thumbClass: "from-[#0f1b2d] via-[#3d4f6f] to-[#8a6a4a]",
    imageSrc: "/cinematic/Gemini_Generated_Image_3w2aq13w2aq13w2a.png",
    href: "/create?vibe=cinema",
    defaultTemplateId: "cinema-arches",
  },
  {
    id: "cartoon",
    name: "CARTOON",
    emoji: "🎨",
    blurb: "Cute, playful, shareable",
    ready: true,
    thumbClass: "from-[#ffe8c8] via-[#a8e6a1] to-[#ffb347]",
    imageSrc: "/cartoon/Gemini_Generated_Image_d7o1ywd7o1ywd7o1.png",
    href: "/create?vibe=cartoon",
    defaultTemplateId: "cartoon-frame",
  },
  {
    id: "anime",
    name: "ANIME",
    emoji: "🌸",
    blurb: "Golden hour, kites, feelings",
    ready: true,
    thumbClass: "from-[#2a1848] via-[#c45c8a] to-[#ff9a5a]",
    imageSrc: "/anime/Gemini_Generated_Image_nzlcnqnzlcnqnzlc.png",
    href: "/create?vibe=anime",
    defaultTemplateId: "anime-halo",
  },
];

export function isVibeId(id: string | null | undefined): id is VibeId {
  return vibes.some((v) => v.id === id);
}

export function getVibe(id: string | null | undefined): Vibe {
  return vibes.find((v) => v.id === id) ?? vibes[0]!;
}

export function getTemplatesForVibe(vibe: VibeId): Template[] {
  return templates.filter((t) => t.vibe === vibe);
}

export function getTemplate(id: string | null | undefined): Template {
  return (
    templates.find((t) => t.id === id) ??
    templates.find((t) => t.id === DEFAULT_TEMPLATE_ID)!
  );
}

export function isTemplateId(id: string | null | undefined): id is TemplateId {
  return templates.some((t) => t.id === id);
}

export function resolveCreateSelection(opts: {
  vibe?: string | null;
  style?: string | null;
}): { vibe: Vibe; template: Template } {
  const vibe = getVibe(opts.vibe ?? "hero");
  if (opts.style && isTemplateId(opts.style)) {
    const t = getTemplate(opts.style);
    if (t.vibe === vibe.id) return { vibe, template: t };
  }
  return { vibe, template: getTemplate(vibe.defaultTemplateId) };
}
