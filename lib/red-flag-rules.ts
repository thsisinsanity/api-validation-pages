import type { ExtractedBid, Severity } from "./bid-analyzer";

export interface RedFlag {
  rule: string;
  severity: Severity;
  message: string;
}

const KITCHEN_MIN_WEEKS = 4;
const LUMP_SUM_THRESHOLD = 5;
const DEPOSIT_YELLOW = 0.25;
const DEPOSIT_RED = 0.4;

function findInItems(bid: ExtractedBid, keywords: string[]): boolean {
  const haystack = [
    ...bid.line_items.map((i) => `${i.category} ${i.description}`),
    ...bid.explicitly_included,
  ]
    .join(" ")
    .toLowerCase();
  return keywords.some((k) => haystack.includes(k));
}

function isExplicitlyExcluded(bid: ExtractedBid, keywords: string[]): boolean {
  const excluded = bid.explicitly_excluded.join(" ").toLowerCase();
  return keywords.some((k) => excluded.includes(k));
}

export function detectRedFlags(bid: ExtractedBid): RedFlag[] {
  const flags: RedFlag[] = [];

  // 1. Deposit too high
  const total = bid.totals.total ?? 0;
  if (total > 0 && bid.payment_schedule.length > 0) {
    const first = bid.payment_schedule[0];
    let depositPct: number | null = null;
    if (first.percent != null) {
      depositPct = first.percent > 1 ? first.percent / 100 : first.percent;
    } else if (first.amount != null) {
      depositPct = first.amount / total;
    }
    if (depositPct != null) {
      if (depositPct > DEPOSIT_RED) {
        flags.push({
          rule: "deposit_too_high",
          severity: "bad",
          message: `Upfront deposit is ${Math.round(depositPct * 100)}% of total — well above the typical 10–25% range.`,
        });
      } else if (depositPct > DEPOSIT_YELLOW) {
        flags.push({
          rule: "deposit_high",
          severity: "warn",
          message: `Upfront deposit is ${Math.round(depositPct * 100)}% — on the high side. Many states cap contractor deposits at 10% or $1,000.`,
        });
      }
    }
  }

  // 2. License missing
  if (!bid.contractor.license_number) {
    flags.push({
      rule: "license_missing",
      severity: "bad",
      message: "No license number listed on this bid. Verify before signing.",
    });
  }

  // 3. Vague allowances
  const vagueAllowances = bid.line_items.filter(
    (i) => i.is_allowance && (!i.description || i.description.trim().length < 12),
  );
  if (vagueAllowances.length > 0) {
    flags.push({
      rule: "vague_allowance",
      severity: "warn",
      message: `${vagueAllowances.length} allowance${vagueAllowances.length > 1 ? "s" : ""} with little or no spec. Allowances without detail almost always trigger change orders.`,
    });
  }

  // 4. No permit mentioned
  if (!findInItems(bid, ["permit"]) && !isExplicitlyExcluded(bid, ["permit"])) {
    flags.push({
      rule: "no_permits",
      severity: "warn",
      message: "Permits not mentioned anywhere in the bid. Ask who pulls the permit and whether it's included in the price.",
    });
  }

  // 5. No demo mentioned
  if (!findInItems(bid, ["demo", "demolition", "tear out", "remov"]) && !isExplicitlyExcluded(bid, ["demo", "demolition"])) {
    flags.push({
      rule: "no_demo",
      severity: "warn",
      message: "No demolition line item. Ask if demo is included or if you'll be billed separately.",
    });
  }

  // 6. No dumpster / disposal
  if (!findInItems(bid, ["dumpster", "disposal", "haul", "debris"])) {
    flags.push({
      rule: "no_disposal",
      severity: "warn",
      message: "No dumpster or debris disposal listed. This is commonly a 'forgot to mention' add-on.",
    });
  }

  // 7. Unrealistic kitchen timeline
  if (bid.timeline.duration_weeks != null && bid.timeline.duration_weeks < KITCHEN_MIN_WEEKS) {
    flags.push({
      rule: "unrealistic_timeline",
      severity: "warn",
      message: `Timeline of ${bid.timeline.duration_weeks} weeks is very tight for a kitchen remodel. Most full kitchens take 6–10 weeks.`,
    });
  }

  // 8. Lump sum bid (too few line items)
  if (bid.line_items.length > 0 && bid.line_items.length < LUMP_SUM_THRESHOLD) {
    flags.push({
      rule: "lump_sum",
      severity: "bad",
      message: `Only ${bid.line_items.length} line item${bid.line_items.length === 1 ? "" : "s"} — this is effectively a lump-sum bid with no breakdown. Ask for an itemized version before signing.`,
    });
  }

  // 9. Extraction confidence low (UX warning, not contractor's fault)
  if (bid.extraction_confidence === "low") {
    flags.push({
      rule: "low_extraction_confidence",
      severity: "warn",
      message: "Some details on this bid were hard to read. Double-check the extracted line items below against the original.",
    });
  }

  return flags;
}

export function summarizeFlagsForPrompt(allFlags: RedFlag[][]): string {
  if (allFlags.every((f) => f.length === 0)) return "No red flags detected.";
  return allFlags
    .map((flags, i) => {
      if (flags.length === 0) return `Bid ${i + 1}: clean`;
      return `Bid ${i + 1}: ${flags.map((f) => f.message).join(" | ")}`;
    })
    .join("\n");
}
