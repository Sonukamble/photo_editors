export type {
  Template,
  TemplateId,
  TemplateCanvas,
  PhotoSlot,
  PhotoShape,
  PhotoFade,
  Vibe,
  VibeId,
} from "@/lib/templates/types";

export { CANVAS_WIDTH, CANVAS_HEIGHT, makeCanvas } from "@/lib/templates/types";

export {
  templates,
  DEFAULT_TEMPLATE_ID,
  vibes,
  getTemplate,
  isTemplateId,
  isVibeId,
  getVibe,
  getTemplatesForVibe,
  resolveCreateSelection,
} from "@/lib/templates/catalog";
