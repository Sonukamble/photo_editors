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
  // —— HERO (public/templates only) ——
  {
    id: "hero-freedom",
    vibe: "hero",
    name: "FREEDOM",
    emoji: "🇮🇳",
    blurb: "Leaders · circular portrait",
    canvas: makeCanvas({
      imageSrc: "/templates/hero1.png",
      caption: "HAPPY INDEPENDENCE DAY 2026",
      subcaption: "15TH AUGUST",
      photo: { x: 0.095, y: 0.198, w: 0.33, h: 0.348 },
      photoShape: "circle",
      width: 1068,
      height: 1008,
    }),
  },
  {
    id: "hero-constitution",
    vibe: "hero",
    name: "CONSTITUTION",
    emoji: "🎖️",
    blurb: "Ambedkar · circular portrait",
    canvas: makeCanvas({
      imageSrc: "/templates/hero2.png",
      caption: "HAPPY INDEPENDENCE DAY 2026",
      subcaption: "15 AUGUST",
      photo: { x: 0.58, y: 0.16, w: 0.3, h: 0.32 },
      photoShape: "circle",
      width: 1068,
      height: 1008,
    }),
  },
  {
    id: "hero-monuments",
    vibe: "hero",
    name: "MONUMENTS",
    emoji: "🏛️",
    blurb: "Tiranga · India Gate frame",
    canvas: makeCanvas({
      imageSrc: "/templates/hero3.png",
      caption: "HAPPY INDEPENDENCE DAY 2026",
      subcaption: "15TH AUGUST",
      photo: { x: 0.07, y: 0.12, w: 0.38, h: 0.4 },
      photoShape: "circle",
      width: 1068,
      height: 1008,
    }),
  },
  {
    id: "hero-leaders",
    vibe: "hero",
    name: "LEADERS",
    emoji: "🫡",
    blurb: "Gandhi · Patel · Ambedkar",
    canvas: makeCanvas({
      imageSrc: "/templates/hero4.png",
      caption: "HAPPY INDEPENDENCE DAY 2026",
      subcaption: "15TH AUGUST",
      photo: { x: 0.095, y: 0.198, w: 0.33, h: 0.348 },
      photoShape: "circle",
      width: 1068,
      height: 1008,
    }),
  },
  {
    id: "hero-salute",
    vibe: "hero",
    name: "SALUTE",
    emoji: "🎖️",
    blurb: "Armed forces · circular portrait",
    canvas: makeCanvas({
      imageSrc: "/templates/hero5.png",
      caption: "HAPPY INDEPENDENCE DAY 2026",
      subcaption: "15TH AUGUST",
      photo: { x: 0.095, y: 0.198, w: 0.33, h: 0.348 },
      photoShape: "circle",
      width: 1068,
      height: 1008,
    }),
  },

  // —— CINEMA (public/cinematic only) ——
  {
    id: "cinema-salute",
    vibe: "cinema",
    name: "SALUTE",
    emoji: "🎖️",
    blurb: "Forces · circular portrait",
    canvas: makeCanvas({
      imageSrc: "/cinematic/cin1.png",
      caption: "HAPPY INDEPENDENCE DAY",
      subcaption: "15 AUGUST",
      photo: { x: 0.095, y: 0.198, w: 0.331, h: 0.348 },
      photoShape: "circle",
      width: 1068,
      height: 1008,
    }),
  },
  {
    id: "cinema-navy",
    vibe: "cinema",
    name: "NAVY",
    emoji: "⚓",
    blurb: "Naval guardians · bronze frame",
    canvas: makeCanvas({
      imageSrc: "/cinematic/cin2.png",
      caption: "HAPPY INDEPENDENCE DAY",
      subcaption: "15 AUGUST",
      photo: { x: 0.155, y: 0.255, w: 0.22, h: 0.23 },
      photoShape: "circle",
      width: 1068,
      height: 1008,
    }),
  },
  {
    id: "cinema-front",
    vibe: "cinema",
    name: "FRONT",
    emoji: "🎬",
    blurb: "On the line · circular frame",
    canvas: makeCanvas({
      imageSrc: "/cinematic/cin3.png",
      caption: "HAPPY INDEPENDENCE DAY",
      subcaption: "15 AUGUST",
      photo: { x: 0.155, y: 0.255, w: 0.22, h: 0.23 },
      photoShape: "circle",
      width: 1068,
      height: 1008,
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

export const DEFAULT_TEMPLATE_ID: TemplateId = "hero-freedom";

export const vibes: Vibe[] = [
  {
    id: "hero",
    name: "HERO",
    emoji: "⚑",
    blurb: "Proud, patriotic, poster-worthy",
    ready: true,
    thumbClass: "from-[#2b1d0e] via-[#c45c12] to-[#ffb347]",
    imageSrc: "/templates/hero3.png",
    href: "/create?vibe=hero",
    defaultTemplateId: "hero-freedom",
  },
  {
    id: "cinema",
    name: "CINEMA",
    emoji: "🎬",
    blurb: "Film-still grade, moody lights",
    ready: true,
    thumbClass: "from-[#0f1b2d] via-[#3d4f6f] to-[#8a6a4a]",
    imageSrc: "/cinematic/cin1.png",
    href: "/create?vibe=cinema",
    defaultTemplateId: "cinema-salute",
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
