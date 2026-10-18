import { PRICE_DISPLAY } from "@/lib/pricing";
import StickyOrderBar from "./StickyOrderBar";

// In-content CTA for the license lookup guides (how-to-check-contractor-license-*
// and contractor-license-check-*). Those pages are ~1/3 of organic traffic but
// had zero purchases: readers came to look the license up themselves, so the
// pitch is "the license is only one of four checks".

const STATE_SLUGS: Record<string, string> = {
  dc: "District of Columbia",
};

export function guideStateFromSlug(slug: string): string | null | undefined {
  if (slug.startsWith("how-to-check-contractor-license-")) {
    const key = slug.replace("how-to-check-contractor-license-", "");
    return (
      STATE_SLUGS[key] ??
      key.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")
    );
  }
  if (slug.startsWith("contractor-license-check-")) return null; // city guide, no state
  return undefined; // not a guide
}

export default function GuideCTA({ state }: { state: string | null }) {
  const params = new URLSearchParams({
    utm_source: "blog",
    utm_medium: "guide-cta",
    ...(state ? { state } : {}),
  });
  const href = `/order?${params.toString()}`;
  const where = state ? `${state}'s` : "the state";

  return (
    <>
      <aside className="mt-8 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-5 sm:p-6">
        <p className="font-semibold text-slate-900">
          Checking {where} license site only answers one question.
        </p>
        <p className="mt-2 text-sm text-slate-700 leading-relaxed">
          A valid license doesn&apos;t show BBB complaints, review patterns, or
          discipline filed on a separate page. We check all four and email you a
          plain-English verdict in under an hour.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <a
            href={href}
            className="inline-flex justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl transition-colors no-underline"
          >
            Check my contractor, {PRICE_DISPLAY} →
          </a>
          <span className="text-xs text-slate-500">100% money-back guarantee</span>
        </div>
      </aside>
      <StickyOrderBar href={href} />
    </>
  );
}
