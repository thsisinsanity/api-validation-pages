"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BidComparisonTable from "@/components/BidComparisonTable";
import DueDiligenceCard from "@/components/DueDiligenceCard";
import type { ExtractedBid } from "@/lib/bid-analyzer";
import type { ComparisonResult } from "@/lib/comparison";
import type { RedFlag } from "@/lib/red-flag-rules";

interface AnalyzeBidsResponse {
  bids: ExtractedBid[];
  comparison: ComparisonResult;
  redFlags: RedFlag[][];
  narrative: string;
  generatedAt: string;
}

export default function CompareBidsResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalyzeBidsResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("compareBidsResult");
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch {
        // ignore
      }
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="bg-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">No comparison loaded</h1>
        <p className="text-gray-500 mb-6 max-w-md">
          Your bid comparison wasn&apos;t found. This page reads results from your current browser session — if you refreshed or opened a new tab, you&apos;ll need to upload again.
        </p>
        <button
          onClick={() => router.push("/compare-bids")}
          className="bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Upload bids again
        </button>
      </main>
    );
  }

  const { bids, comparison, redFlags, narrative, generatedAt } = result;

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 17.25 6.75 22.05 12 23C17.25 22.05 21 17.25 21 12V7L12 2Z" fill="#059669" />
              <path d="M9 12.5L11 14.5L15.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-gray-900 text-sm">CheckLicensed</span>
          </a>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Print
            </button>
            <a
              href="/compare-bids"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              New comparison
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Your bid comparison</h1>
          <p className="text-sm text-gray-500 mt-1">
            Analyzed {bids.length} bid{bids.length === 1 ? "" : "s"} ·{" "}
            {new Date(generatedAt).toLocaleString()}
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="px-4 sm:px-6 mb-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
              The verdict
            </p>
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{narrative}</p>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-4 sm:px-6 mb-10">
        <div className="max-w-5xl mx-auto">
          <BidComparisonTable bids={bids} comparison={comparison} />
        </div>
      </section>

      {/* Due diligence cards */}
      <section className="px-4 sm:px-6 mb-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Verify each contractor</h2>
            <p className="text-sm text-gray-500 mt-1 max-w-2xl">
              Now that you know which bid is fair, make sure the contractor behind it is real. Get the full verification report — license, complaints, BBB, and verified reviews — for $14.99 each.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {bids.map((bid, i) => (
              <DueDiligenceCard
                key={i}
                bid={bid}
                index={i}
                flags={redFlags[i] || []}
              />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
