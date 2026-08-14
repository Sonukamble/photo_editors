export const GA_ID = "G-7LTC978LZT";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type FunnelEvent =
  | "visitor"
  | "create_clicked"
  | "template_selected"
  | "photo_uploaded"
  | "image_generated"
  | "downloaded"
  | "shared";

const STEP: Record<FunnelEvent, number> = {
  visitor: 1,
  create_clicked: 2,
  template_selected: 3,
  photo_uploaded: 4,
  image_generated: 5,
  downloaded: 6,
  shared: 7,
};

export function track(
  event: FunnelEvent,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, {
    funnel_step: STEP[event],
    ...params,
  });
}

/** First landing this session — Visitor. */
export function trackVisitorOnce() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem("funnel_visitor")) return;
    sessionStorage.setItem("funnel_visitor", "1");
  } catch {
    /* private mode */
  }
  track("visitor", { page: "home" });
}
