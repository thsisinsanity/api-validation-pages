"use client";

import { useState } from "react";

const faqs = [
  {
    question: "When does this launch?",
    answer:
      "We're targeting Q2 2026 for early access. Waitlist members will get first access.",
  },
  {
    question: "Which states are supported at launch?",
    answer:
      "We're launching with California, Texas, Florida, Massachusetts, and Arizona. These cover the highest volume of contractor verifications. We'll expand to all 50 states over the following months.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Yes. The free tier includes 25 verifications per month, no credit card required. Enough to evaluate the API and build your integration.",
  },
  {
    question: "How is the data sourced?",
    answer:
      "We pull data directly from state licensing board portals and official APIs where available. All data is public record. We normalize it into a consistent schema so you don't have to deal with 50 different formats.",
  },
  {
    question: "How is this different from Checkr?",
    answer:
      "Checkr bundles license verification into a full background check at $12 per check. Our API gives you direct, standalone access to license data starting at $0.25. No background check required, no bundling, and you get the raw data via API instead of a PDF report.",
  },
  {
    question: "What about data privacy?",
    answer:
      "Professional license data is public record maintained by state governments. We don't collect or store any personal data beyond what's published by licensing boards. We're working toward SOC 2 compliance.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-4">
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-normal leading-tight">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.question}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-gray-900 text-[15px] pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
