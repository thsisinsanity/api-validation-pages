"use client";

import { useState } from "react";
import { PRICE_DISPLAY } from "@/lib/pricing";

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming","District of Columbia",
];

export default function OrderPage() {
  const [form, setForm] = useState({
    customerEmail: "",
    contractorName: "",
    companyName: "",
    state: "",
    trade: "",
    licenseNumber: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.customerEmail || !form.contractorName || !form.state) {
      setError("Please fill in your email, the contractor's name, and the state.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          utm_source: params.get("utm_source") || "",
          utm_medium: params.get("utm_medium") || "",
          utm_content: params.get("utm_content") || "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }
      window.location.href = data.url; // PayPal-hosted payment page
    } catch {
      setError("Something went wrong starting checkout. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Verify your contractor — {PRICE_DISPLAY}
        </h1>
        <p className="mt-2 text-slate-600 text-sm">
          License, complaints, BBB, and verified reviews. One clear verdict, in
          your inbox in under an hour (requests after 4pm ET deliver next
          business morning). 100% money-back guarantee.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Your email *</label>
            <input type="email" required value={form.customerEmail} onChange={set("customerEmail")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Contractor&apos;s name *</label>
            <input type="text" required value={form.contractorName} onChange={set("contractorName")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="John Smith" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Company name</label>
            <input type="text" value={form.companyName} onChange={set("companyName")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Smith Construction LLC" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700">State *</label>
              <select required value={form.state} onChange={set("state")}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white">
                <option value="">Select…</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Trade</label>
              <input type="text" value={form.trade} onChange={set("trade")}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="General contractor" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">License # (if you have it)</label>
            <input type="text" value={form.licenseNumber} onChange={set("licenseNumber")}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700">Anything else we should check?</label>
            <textarea value={form.notes} onChange={set("notes")} rows={2}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={submitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors">
            {submitting ? "Saving your order…" : `Continue to payment — ${PRICE_DISPLAY}`}
          </button>
          <p className="text-xs text-slate-500 text-center">
            Secure payment via PayPal. We never see your card details.
          </p>
        </form>
      </div>
    </main>
  );
}
