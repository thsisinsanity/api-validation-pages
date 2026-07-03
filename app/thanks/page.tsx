"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRICE_DOLLARS } from "@/lib/pricing";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function ThanksContent() {
  const params = useSearchParams();
  const fromPayPal = params.get("src") === "paypal";

  useEffect(() => {
    if (fromPayPal && typeof window.gtag === "function") {
      window.gtag("event", "purchase", {
        transaction_id: `pp-${Date.now()}`,
        value: PRICE_DOLLARS,
        currency: "USD",
        items: [{ item_name: "Contractor Verification Report", price: PRICE_DOLLARS, quantity: 1 }],
      });
    }
  }, [fromPayPal]);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-lg bg-white rounded-2xl shadow-lg p-10 text-center">
        <div className="text-5xl">✅</div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Payment received — we&apos;re on it.
        </h1>
        <p className="mt-3 text-slate-600">
          Your contractor verification is in the queue. Your report will arrive
          in your inbox <strong>within 1 hour</strong> (requests after 4pm ET
          deliver next business morning).
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Didn&apos;t get it, or gave us the wrong details? Just reply to your
          PayPal receipt email and we&apos;ll sort it out. 100% money-back
          guarantee.
        </p>
        <a href="/" className="mt-6 inline-block text-emerald-700 font-semibold">
          ← Back to CheckLicensed
        </a>
      </div>
    </main>
  );
}

export default function ThanksPage() {
  return (
    <Suspense fallback={null}>
      <ThanksContent />
    </Suspense>
  );
}
