import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check If Your Contractor Is Licensed | ContractorAPI",
  description:
    "Find out if your contractor is actually licensed in their state. Verified report delivered to your inbox in under 1 hour. $5 one-time.",
};

export default function CheckPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Nav - minimal */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="26" height="26" rx="5" fill="#F97316" />
              <path d="M10.5 9L6.5 14L10.5 19" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.5 9L21.5 14L17.5 19" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.5 7.5L12.5 20.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-gray-900 text-sm">ContractorAPI</span>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Reports delivered in under 1 hour
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
            Is your contractor actually licensed?
          </h1>

          <p className="mt-5 text-xl font-medium text-gray-700">
            Like Carfax, but for your contractor.
          </p>
          <p className="mt-3 text-lg text-gray-500 max-w-xl mx-auto">
            We check the state licensing board and send you a verified report with their license status, expiration date, bond info, and more.
          </p>

          <div className="mt-10 bg-gray-50 rounded-2xl p-8 text-left max-w-md mx-auto">
            <h2 className="font-bold text-gray-900 text-lg mb-5 text-center">What you get</h2>
            <ul className="space-y-3">
              {[
                "License status (active, expired, revoked)",
                "Expiration date",
                "License classification and scope",
                "Bond status",
                "Workers' comp coverage",
                "State licensing board source",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-center">
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$5</span>
                <span className="text-gray-500 ml-1">per report</span>
              </div>
              <a
                href="https://buy.stripe.com/test_28E6oH0lYbbwaIF17M9fW00"
                className="block w-full text-center bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl hover:bg-gray-800 transition-colors text-sm"
              >
                Check my contractor
              </a>
              <p className="text-xs text-gray-400 mt-3">
                Delivered to your email in under 1 hour
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            How it works
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Tell us who to check",
                desc: "Contractor name, license number (if you have it), and which state.",
              },
              {
                step: "2",
                title: "We verify with the state",
                desc: "We check the official state licensing board and compile your report.",
              },
              {
                step: "3",
                title: "Get your report",
                desc: "A clear, verified license report delivered to your inbox.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How fast do I get my report?",
                a: "Most reports are delivered within 1 hour during business hours (9am-6pm ET, Mon-Fri). Weekend requests are delivered by Monday morning.",
              },
              {
                q: "What states do you cover?",
                a: "All 50 US states. Every state has a licensing board and we check the official source directly.",
              },
              {
                q: "What if the contractor isn't licensed?",
                a: "We'll tell you. The report will show that no active license was found in that state, which is important information. You still receive the report.",
              },
              {
                q: "Can I check multiple contractors?",
                a: "Each report covers one contractor in one state. Need to check multiple? Just purchase additional reports.",
              },
              {
                q: "Where does the data come from?",
                a: "Directly from official state licensing boards. The same source you'd check yourself, but we do the work for you and present it clearly.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-gray-100 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Don&apos;t hire blind
          </h2>
          <p className="text-gray-500 mb-6">
            Know if your contractor is licensed before you sign the contract.
          </p>
          <a
            href="https://buy.stripe.com/test_28E6oH0lYbbwaIF17M9fW00"
            className="inline-block bg-gray-900 text-white font-semibold py-3.5 px-8 rounded-xl hover:bg-gray-800 transition-colors text-sm"
          >
            Check my contractor - $5
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4">
        <p className="text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} ContractorAPI. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
