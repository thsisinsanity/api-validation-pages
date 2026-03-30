"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_NAME = "ContractorAPI";

const LAUNCH_STATES = ["CA", "TX", "FL", "MA", "AZ"];

const ALL_STATES: { abbr: string; name: string }[] = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "DC", name: "District of Columbia" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
];

export default function VotePage() {
  const [selectedStates, setSelectedStates] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggleState(abbr: string) {
    if (LAUNCH_STATES.includes(abbr)) return;
    setSelectedStates((prev) => {
      const next = new Set(prev);
      if (next.has(abbr)) {
        next.delete(abbr);
      } else {
        next.add(abbr);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selectedStates.size === 0) {
      setError("Please select at least one state to vote for.");
      return;
    }
    setSubmitting(true);
    setError("");

    const data = {
      email,
      voted_states: Array.from(selectedStates).sort().join(", "),
      timestamp: new Date().toISOString(),
      source: "state-vote",
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
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Navbar name={SITE_NAME} />
        <main className="min-h-screen flex items-center justify-center px-4 pt-16">
          <div className="max-w-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-2">
              Vote recorded!
            </h1>
            <p className="text-gray-600 mb-3">
              Thanks for letting us know. We&apos;ll prioritize the most-requested states and notify you when they launch.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              You voted for: {Array.from(selectedStates).sort().join(", ")}
            </p>
            <a
              href="/"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              &larr; Back to home
            </a>
          </div>
        </main>
        <Footer name={SITE_NAME} />
      </>
    );
  }

  return (
    <>
      <Navbar name={SITE_NAME} />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-4">
              State Coverage
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-normal leading-tight mb-4">
              Which states should we build next?
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              We&apos;re launching contractor license verification in{" "}
              <span className="font-semibold text-gray-700">CA, TX, FL, MA, and AZ</span>.
              Vote for the states you need so we can prioritize what to build next.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span className="text-gray-600">Launching</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-brand-500" />
              <span className="text-gray-600">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-gray-200 bg-white" />
              <span className="text-gray-600">Click to vote</span>
            </div>
          </div>

          {/* State Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 mb-12">
            {ALL_STATES.map((state) => {
              const isLaunch = LAUNCH_STATES.includes(state.abbr);
              const isSelected = selectedStates.has(state.abbr);

              return (
                <button
                  key={state.abbr}
                  type="button"
                  onClick={() => toggleState(state.abbr)}
                  disabled={isLaunch}
                  title={state.name}
                  className={`
                    relative flex flex-col items-center justify-center rounded-xl py-3 px-2 text-center
                    transition-all duration-150 cursor-pointer select-none
                    ${
                      isLaunch
                        ? "bg-emerald-50 border-2 border-emerald-300 text-emerald-700 cursor-default"
                        : isSelected
                        ? "bg-brand-50 border-2 border-brand-500 text-brand-700 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                        : "bg-white border-2 border-gray-150 text-gray-700 hover:border-brand-300 hover:bg-brand-50/50 hover:shadow-sm"
                    }
                  `}
                >
                  <span className="text-base font-bold leading-none">{state.abbr}</span>
                  <span className="text-[10px] mt-1 leading-none opacity-70 truncate w-full">
                    {state.name}
                  </span>
                  {isLaunch && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                  )}
                  {isSelected && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected summary */}
          {selectedStates.size > 0 && (
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-brand-600">{selectedStates.size}</span>{" "}
                state{selectedStates.size !== 1 ? "s" : ""} selected:{" "}
                <span className="font-medium text-gray-700">
                  {Array.from(selectedStates).sort().join(", ")}
                </span>
              </p>
            </div>
          )}

          {/* Submit Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="bg-surface rounded-2xl border border-gray-100 p-8 space-y-4">
              <div>
                <label htmlFor="vote-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="vote-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 text-[15px] placeholder-gray-400 focus:ring-2 focus:ring-brand-600 focus:border-transparent outline-none transition-all"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gray-900 text-white text-base font-medium py-4 rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-gray-900/10"
              >
                {submitting ? "Submitting..." : `Submit vote${selectedStates.size > 0 ? ` (${selectedStates.size} state${selectedStates.size !== 1 ? "s" : ""})` : ""}`}
              </button>

              <p className="text-center text-xs text-gray-400">
                We&apos;ll notify you when your selected states go live. No spam.
              </p>
            </div>
          </form>
        </div>
      </main>
      <Footer name={SITE_NAME} />
    </>
  );
}
