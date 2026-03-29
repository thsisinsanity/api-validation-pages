import type { PricingTier } from "@/content/niches";

interface PricingTableProps {
  pricing: PricingTier[];
}

export default function PricingTable({ pricing }: PricingTableProps) {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-4">
            Pricing
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-normal leading-tight">
            Simple, usage-based pricing
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            No contracts. No minimum spend. Pay for what you use.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricing.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                tier.highlight
                  ? "bg-gray-900 text-white ring-1 ring-gray-800 shadow-2xl shadow-gray-900/20 scale-[1.02]"
                  : "bg-white text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/50"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}

              <p className={`text-sm font-medium ${tier.highlight ? "text-gray-400" : "text-gray-500"}`}>
                {tier.name}
              </p>

              <div className="mt-3 mb-1">
                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
              </div>

              <p className={`text-sm ${tier.highlight ? "text-gray-400" : "text-gray-500"}`}>
                {tier.per}
              </p>

              <p className={`text-xs mt-2 ${tier.highlight ? "text-gray-500" : "text-gray-400"}`}>
                {tier.tagline}
              </p>

              <ul className={`mt-5 pt-5 border-t space-y-2.5 flex-1 ${
                tier.highlight ? "border-gray-700" : "border-gray-100"
              }`}>
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <svg className={`w-4 h-4 flex-shrink-0 ${tier.highlight ? "text-emerald-400" : "text-emerald-500"}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    <span className={tier.highlight ? "text-gray-300" : "text-gray-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#waitlist"
                className={`mt-6 block text-center text-sm font-medium py-2.5 rounded-lg transition-colors ${
                  tier.highlight
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Need enterprise volume?{" "}
          <a href="mailto:hello@example.com" className="text-brand-600 hover:underline">
            Get in touch
          </a>
        </p>
      </div>
    </section>
  );
}
