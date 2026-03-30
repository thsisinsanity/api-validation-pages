export default function Roadmap() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-4">
            What&apos;s next
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-normal leading-tight">
            License verification is just the beginning
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            We&apos;re building toward a single API that answers &ldquo;is this contractor legit?&rdquo; across every signal that matters. Here&apos;s the roadmap.
          </p>
        </div>

        <div className="space-y-4">
          {/* Live now */}
          <div className="rounded-xl border-2 border-brand-500 bg-white p-5 flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">License Verification</h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Live now</span>
              </div>
              <p className="text-sm text-gray-500">Real-time license status, bond info, workers&apos; comp, expiration dates, and state classifications across all 50 states.</p>
            </div>
          </div>

          {/* Coming soon items */}
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-5 flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">Business Entity Checks</h3>
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Q3 2026</span>
              </div>
              <p className="text-sm text-gray-500">Secretary of State data. Registration status, incorporation type, registered agent, and filing history.</p>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-5 flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">Litigation History</h3>
                <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Q4 2026</span>
              </div>
              <p className="text-sm text-gray-500">Court records, liens, judgments, and disciplinary actions from federal and state courts.</p>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-5 flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900">Permits &amp; Zoning</h3>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">2027</span>
              </div>
              <p className="text-sm text-gray-500">Building permit history, zoning classifications, and code violations across US jurisdictions.</p>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Each new signal gets its own endpoint and plugs into a unified contractor risk profile. Join the waitlist to get early access as each layer launches.
        </p>
      </div>
    </section>
  );
}
