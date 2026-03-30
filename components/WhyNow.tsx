export default function WhyNow() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase mb-4">
            Why now
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 tracking-normal leading-tight">
            The regulatory window is opening
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-bold text-gray-900 mb-1">California SB 291</p>
            <p className="text-sm text-gray-500">
              Tightening contractor verification with penalties up to <span className="font-semibold text-gray-700">$30K</span> per violation. Effective 2026.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-bold text-gray-900 mb-1">New Jersey P.L. 2023</p>
            <p className="text-sm text-gray-500">
              New bond and insurance mandates for home improvement contractors. Education requirements effective <span className="font-semibold text-gray-700">Feb 2026</span>.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-bold text-gray-900 mb-1">Florida HB 735</p>
            <p className="text-sm text-gray-500">
              Centralized all contractor licensing under state control as of <span className="font-semibold text-gray-700">July 2025</span>. One source of truth.
            </p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-lg leading-relaxed">
          States are tightening enforcement, but the tools to check contractor licenses are still stuck in the 90s. Manual portal lookups, no APIs, no structured data. We&apos;re fixing that.
        </p>

        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <p className="text-sm text-gray-500">
            Built by <span className="font-semibold text-gray-700">Adam</span>. Background in data engineering and compliance automation. Tired of watching teams pay $12/check for something that should cost pennies.
          </p>
        </div>
      </div>
    </section>
  );
}
