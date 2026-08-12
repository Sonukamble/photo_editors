import {
  makeCanvas,
  type Template,
  type TemplateId,
  type Vibe,
} from "@/lib/templates/types";

/**
 * Independence Day poster templates.
 * PNGs live in /public/templates/
 * `photo` slots are fractions of each PNG — mapped to canvas via the same cover-fit as the artwork.
 */
export const templates: Template[] = [
  {
    id: "heritage",
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
  },
  {
    id: "cinema",
    name: "CINEMA",
    emoji: "🎬",
    blurb: "Film-still grade, moody lights",
    ready: false,
    thumbClass: "from-[#0f1b2d] via-[#3d4f6f] to-[#8a6a4a]",
    imageSrc: "/home/vibe-cinema.png",
  },
  {
    id: "cartoon",
    name: "CARTOON",
    emoji: "🎨",
    blurb: "Cute, playful, shareable",
    ready: false,
    thumbClass: "from-[#ffe8c8] via-[#a8e6a1] to-[#ffb347]",
    imageSrc: "/home/vibe-cartoon.png",
  },
  {
    id: "anime",
    name: "ANIME",
    emoji: "🌸",
    blurb: "Golden hour, kites, feelings",
    ready: false,
    thumbClass: "from-[#2a1848] via-[#c45c8a] to-[#ff9a5a]",
    imageSrc: "/home/vibe-anime.png",
  },
];

export function getTemplate(id: string | null | undefined): Template {
  return (
    templates.find((t) => t.id === id) ??
    templates.find((t) => t.id === DEFAULT_TEMPLATE_ID)!
  );
}

export function isTemplateId(id: string | null | undefined): id is TemplateId {
  return templates.some((t) => t.id === id);
}
