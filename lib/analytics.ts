// lib/analytics.ts
// Funnel events go to both GA4 (gtag, loaded in app/layout.tsx) and Vercel
// Web Analytics. Vercel only records custom events on Pro plans; on Hobby the
// call is dropped, so GA4 is the source of truth for event counts.
//
// Funnel: bid_analysis_started → bid_analysis_completed → results_viewed →
//         order_cta_click → begin_checkout → purchase

import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, props);
    track(name, props);
  } catch {
    // Analytics must never break the user flow
  }
}
