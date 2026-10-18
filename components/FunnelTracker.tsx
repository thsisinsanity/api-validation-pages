"use client";

import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { trackEvent } from "@/lib/analytics";

// Mounted once in app/layout.tsx. Loads Vercel Web Analytics and records a
// click on any link to /order (homepage, blog, /pro, Due Diligence Cards)
// with the page it came from, so we don't need handlers on every CTA.
export default function FunnelTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href^='/order']");
      if (!link) return;
      const href = new URL((link as HTMLAnchorElement).href);
      trackEvent("order_cta_click", {
        from_path: window.location.pathname,
        utm_medium: href.searchParams.get("utm_medium") || "",
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <Analytics />;
}
