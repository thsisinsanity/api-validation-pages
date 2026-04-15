import type { ExtractedBid } from "@/lib/bid-analyzer";
import type { ComparisonResult } from "@/lib/comparison";
import { formatCategoryLabel } from "@/lib/comparison";

interface BidComparisonTableProps {
  bids: ExtractedBid[];
  comparison: ComparisonResult;
}

function fmt(amount: number | null): string {
  if (amount == null) return "—";
  return `$${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export default function BidComparisonTable({ bids, comparison }: BidComparisonTableProps) {
  const headers = bids.map((b, i) => b.contractor.name || `Bid ${i + 1}`);
  const mismatchSet = new Set(comparison.scopeMismatches);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-lg">Side-by-side comparison</h3>
        <p className="text-sm text-gray-500 mt-1">
          Items highlighted in amber are in some bids but missing from others — the most common cause of surprise change orders.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left font-semibold text-gray-700 px-6 py-3">Category</th>
              {headers.map((h, i) => (
                <th key={i} className="text-right font-semibold text-gray-700 px-6 py-3 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {comparison.categories.map((row) => {
              const isMismatch = mismatchSet.has(row.category);
              return (
                <tr
                  key={row.category}
                  className={isMismatch ? "bg-amber-50/40" : "hover:bg-gray-50"}
                >
                  <td className="px-6 py-3 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      {formatCategoryLabel(row.category)}
                      {isMismatch && (
                        <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                          mismatch
                        </span>
                      )}
                    </div>
                  </td>
                  {row.amounts.map((amt, i) => (
                    <td
                      key={i}
                      className={`px-6 py-3 text-right tabular-nums ${
                        amt == null ? "text-red-500 font-semibold" : "text-gray-700"
                      }`}
                    >
                      {amt == null ? "missing" : fmt(amt)}
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr className="bg-gray-900 text-white font-bold">
              <td className="px-6 py-4">Total</td>
              {comparison.totals.map((t, i) => (
                <td key={i} className="px-6 py-4 text-right tabular-nums">
                  {fmt(t)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {comparison.scopeMismatches.length > 0 && (
        <div className="px-6 py-4 bg-amber-50 border-t border-amber-200">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">{comparison.scopeMismatches.length} scope mismatch{comparison.scopeMismatches.length === 1 ? "" : "es"} detected.</span>{" "}
            The cheaper bids are not necessarily cheaper — they may be excluding work the others include. Ask each contractor to clarify the missing categories before comparing on price.
          </p>
        </div>
      )}
    </div>
  );
}
