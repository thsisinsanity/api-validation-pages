interface HeroProps {
  headline: string;
  subheadline: string;
  badge?: string;
}

export default function Hero({ headline, subheadline, badge }: HeroProps) {
  return (
    <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-brand-700">{badge}</span>
          </div>
        )}

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-normal leading-[1.15]">
          {headline}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-gray-900 text-white text-base font-medium px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-gray-900/10"
          >
            Join the waitlist
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#demo"
            className="inline-flex items-center gap-2 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            See the API
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Free tier included. No credit card required.
        </p>
      </div>
    </section>
  );
}
