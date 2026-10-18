"use client";

import { useEffect, useState } from "react";
import { PRICE_DISPLAY, PRICE_DOLLARS } from "@/lib/pricing";
import { trackEvent } from "@/lib/analytics";

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

const CHECKS = [
  { title: "State license", body: "Active, expired or suspended, and whether it covers the work you're hiring for." },
  { title: "Complaints & discipline", body: "Board actions, fines and complaints that the basic license lookup often hides." },
  { title: "BBB record", body: "Rating, complaint count, and how (or whether) they resolved them." },
  { title: "Reviews", body: "Google, Yelp and Angi patterns, including fake-review red flags." },
];

const FAQS = [
  {
    q: "Can't I just check the state website myself?",
    a: "You can, and it's free. But the state site only shows license status. It won't show BBB complaints or review patterns, and disciplinary records are often on a separate page. We pull all four and tell you what they mean in plain English.",
  },
  {
    q: "What if the contractor isn't licensed or I can't find them?",
    a: "That's exactly what we'll find out. If there's no license on record, your report says so and tells you what to ask the contractor next.",
  },
  {
    q: "What kinds of contractors do you check?",
    a: "Construction and home-service trades: general contractors, roofers, HVAC, electricians, plumbers, remodelers, painters, landscapers and similar. We don't verify non-trade businesses.",
  },
  {
    q: "What if I'm not happy with the report?",
    a: "Reply to your report email and we'll refund you in full. No forms, no questions.",
  },
];

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500";

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
  const [showDetails, setShowDetails] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill state when arriving from a state guide (?state=Maryland)
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("state");
    if (s && STATES.includes(s)) setForm((f) => ({ ...f, state: s }));
  }, []);

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
      trackEvent("begin_checkout", {
        value: PRICE_DOLLARS,
        currency: "USD",
        utm_source: params.get("utm_source") || "",
        state: form.state,
      });
      window.location.href = data.url; // PayPal-hosted payment page
    } catch {
      setError("Something went wrong starting checkout. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <a href="/" className="font-bold text-slate-900 tracking-tight">CheckLicensed</a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
        {/* Left: why */}
        <section className="order-2 lg:order-1">
          <p className="text-emerald-700 text-sm font-semibold uppercase tracking-wider">
            Before you sign the contract
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            Know exactly who you&apos;re hiring, for {PRICE_DISPLAY}.
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            We check four sources and send you one clear verdict: hire, ask
            questions first, or walk away.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CHECKS.map((c) => (
              <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">✓</span>
                  <h2 className="font-semibold text-slate-900">{c.title}</h2>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          {/* Sample verdict */}
          <div className="mt-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 bg-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Sample verdict (from a real report, details changed)
            </div>
            <div className="p-5 text-sm text-slate-700 leading-relaxed space-y-3">
              <p>
                <strong className="text-slate-900">The license checks out.</strong>{" "}
                Active residential contractor license, both license numbers
                match state records, and no disciplinary actions.
              </p>
              <p>
                <strong className="text-amber-700">Worth a closer look:</strong>{" "}
                the BBB rates them C+, with 3 complaints closed in the past
                three years.
              </p>
              <p>
                <strong className="text-slate-900">Before you sign:</strong> ask
                how those complaints were resolved, tie payments to
                milestones instead of a big deposit, and call two recent
                references.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">Questions</h2>
            <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="cursor-pointer list-none flex justify-between gap-4 font-medium text-slate-900">
                    {f.q}
                    <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Right: form */}
        <section className="order-1 lg:order-2 lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-7">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold text-slate-900">Verify a contractor</h2>
              <span className="text-2xl font-bold text-slate-900">{PRICE_DISPLAY}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              License, complaints, BBB and reviews, in your inbox in under
              1 hour. Requests after 4pm ET arrive the next business morning.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="contractorName" className="block text-sm font-semibold text-slate-700">
                  Contractor or company name
                </label>
                <input id="contractorName" type="text" required value={form.contractorName}
                  onChange={set("contractorName")} className={inputClass}
                  placeholder="e.g. Smith Roofing LLC" autoComplete="off" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-semibold text-slate-700">
                  State where the work is
                </label>
                <select id="state" required value={form.state} onChange={set("state")}
                  className={`${inputClass} bg-white`}>
                  <option value="">Select…</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="customerEmail" className="block text-sm font-semibold text-slate-700">
                  Email for your report
                </label>
                <input id="customerEmail" type="email" required value={form.customerEmail}
                  onChange={set("customerEmail")} className={inputClass}
                  placeholder="you@example.com" autoComplete="email" />
              </div>

              {showDetails ? (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="trade" className="block text-sm font-semibold text-slate-700">Trade</label>
                      <input id="trade" type="text" value={form.trade} onChange={set("trade")}
                        className={inputClass} placeholder="Roofing" />
                    </div>
                    <div>
                      <label htmlFor="licenseNumber" className="block text-sm font-semibold text-slate-700">License #</label>
                      <input id="licenseNumber" type="text" value={form.licenseNumber}
                        onChange={set("licenseNumber")} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-semibold text-slate-700">Owner or other business name</label>
                    <input id="companyName" type="text" value={form.companyName}
                      onChange={set("companyName")} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-slate-700">Anything else we should check?</label>
                    <textarea id="notes" value={form.notes} onChange={set("notes")} rows={2}
                      className={inputClass} />
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => setShowDetails(true)}
                  className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                  + Add license #, trade or notes (optional)
                </button>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-colors text-base">
                {submitting ? "Saving your order…" : `Continue to secure payment, ${PRICE_DISPLAY}`}
              </button>

              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-slate-500">
                <li>✓ 100% money-back guarantee</li>
                <li>✓ All 50 states + DC</li>
                <li>✓ Pay with PayPal or card</li>
                <li>✓ Checked by a person, not a bot</li>
              </ul>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
