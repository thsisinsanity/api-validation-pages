import type { ExtractedBid } from "@/lib/bid-analyzer";
import type { RedFlag } from "@/lib/red-flag-rules";
import { slugifyContractor } from "@/lib/comparison";
import RedFlagBadge from "./RedFlagBadge";

interface DueDiligenceCardProps {
  bid: ExtractedBid;
  index: number;
  flags: RedFlag[];
}

const PAYPAL_BASE = "https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW";

function buildVerifyUrl(contractorName: string | null, index: number): string {
  const slug = slugifyContractor(contractorName, `bid-${index + 1}`);
  // PayPal hosted buttons don't accept query strings, but adding them is harmless
  // for attribution and we'll capture the source via Google Analytics referrer.
  const params = new URLSearchParams({
    utm_source: "compare-bids",
    utm_medium: "due-diligence-card",
    utm_content: slug,
  });
  return `${PAYPAL_BASE}?${params.toString()}`;
}

const checks = [
  { label: "License active" },
  { label: "No complaints on file" },
  { label: "BBB rating clean" },
  { label: "Reviews verified" },
];

export default function DueDiligenceCard({ bid, index, flags }: DueDiligenceCardProps) {
  const name = bid.contractor.name || `Contractor ${index + 1}`;
  const total = bid.totals.total != null ? `$${bid.totals.total.toLocaleString()}` : "—";
  const license = bid.contractor.license_number;
  const verifyUrl = buildVerifyUrl(bid.contractor.name, index);

  // Highest severity in the flag set drives the card accent
  const worst: "ok" | "warn" | "bad" = flags.some((f) => f.severity === "bad")
    ? "bad"
    : flags.some((f) => f.severity === "warn")
      ? "warn"
      : "ok";

  const accent = {
    ok: "border-emerald-200",
    warn: "border-amber-200",
    bad: "border-red-200",
  }[worst];

  return (
    <div className={`bg-white rounded-2xl border-2 ${accent} shadow-sm overflow-hidden`}>
      {/* Header */}
      <div className="px-6 pt-5 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-lg truncate">{name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Bid total: <span className="font-semibold text-gray-900">{total}</span>
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400 uppercase tracking-wide">License</p>
            <p className={`text-sm font-mono ${license ? "text-gray-900" : "text-red-600"}`}>
              {license || "Not listed"}
            </p>
          </div>
        </div>
      </div>

      {/* Diligence checklist */}
      <div className="px-6 py-4">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
          What CheckLicensed verifies
        </p>
        <ul className="space-y-2">
          {checks.map((check) => (
            <li key={check.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-700">
                <span className="w-4 h-4 rounded border border-gray-300 inline-block" />
                {check.label}
              </span>
              <span className="text-gray-400 text-xs">? Run check</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Red flags from the bid itself */}
      {flags.length > 0 && (
        <div className="px-6 pb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Bid red flags
          </p>
          <div className="flex flex-wrap gap-1.5">
            {flags.map((f) => (
              <RedFlagBadge key={f.rule} severity={f.severity} label={f.message} />
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="px-6 pb-6 pt-2">
        <a
          href={verifyUrl}
          className="block w-full text-center bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors text-sm"
        >
          Verify everything — $14.99
        </a>
        <p className="text-center text-xs text-gray-400 mt-2">
          Saves you ~30 min of research · Delivered in under 1 hour
        </p>
      </div>
    </div>
  );
}
