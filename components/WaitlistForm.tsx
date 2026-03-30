"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { roles } from "@/content/niches";

interface WaitlistFormProps {
  niche: string;
  nicheName: string;
}

export default function WaitlistForm({ niche, nicheName }: WaitlistFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLSelectElement).value,
      niche,
      nicheName,
      timestamp: new Date().toISOString(),
    };

    try {
      const sheetUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
      if (sheetUrl) {
        await fetch(sheetUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      router.push("/thanks");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-4">
            Waitlist
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-normal leading-tight mb-3">
            Join the waitlist
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mt-2">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
            </svg>
            <span className="text-sm font-semibold text-emerald-700">First 50 signups get 3 months free</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-gray-100 p-8 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              Work email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 text-[15px] placeholder-gray-400 focus:ring-2 focus:ring-brand-600 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1.5">
              Your role
            </label>
            <select
              name="role"
              id="role"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 text-[15px] focus:ring-2 focus:ring-brand-600 focus:border-transparent outline-none transition-all"
            >
              <option value="">Select...</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-900 text-white text-base font-medium py-4 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-gray-900/10"
          >
            {submitting ? "Joining..." : "Join the waitlist"}
          </button>

          <p className="text-center text-xs text-gray-400">
            No spam. We&apos;ll email you when the API is ready, plus a few updates along the way.
          </p>
        </form>
      </div>
    </section>
  );
}
