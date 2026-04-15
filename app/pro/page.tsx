import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Contractor Verification for Investors & Property Managers | CheckLicensed",
  description:
    "Verify any contractor before you hand them the keys. License, complaints, BBB, and verified reviews in one report. All 50 states. Under 1 hour. $14.99.",
  alternates: {
    canonical: "https://checklicensed.com/pro",
  },
};

const reportItems = [
  "State license status (active, expired, revoked, or not found)",
  "License classification and authorized scope of work",
  "Surety bond and workers' comp verification",
  "Disciplinary actions and complaints on file",
  "BBB rating and complaint history",
  "Verified customer review summary across platforms",
];

const sampleChecks: { label: string; status: string }[] = [
  { label: "License", status: "Active (CSLB #1087452)" },
  { label: "Classification", status: "B \u2014 General Building" },
  { label: "Bond + Workers' Comp", status: "Both current" },
  { label: "Complaints", status: "None on file" },
  { label: "BBB", status: "A+ rating, 0 complaints" },
  { label: "Reviews", status: "4.7\u2605 avg across 3 sources" },
];

function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </span>
  );
}

function CheckIcon({ className = "w-4 h-4 text-emerald-400" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function ProPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* -- Nav -- */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 7V12C3 17.25 6.75 22.05 12 23C17.25 22.05 21 17.25 21 12V7L12 2Z"
                fill="#059669"
              />
              <path
                d="M9 12.5L11 14.5L15.5 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-bold text-gray-900 text-base tracking-tight">
              CheckLicensed
            </span>
          </a>
          <div className="flex items-center gap-6">
            <a
              href="/compare-bids"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block"
            >
              Compare Bids
            </a>
            <a
              href="/blog"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block"
            >
              Blog
            </a>
            <a
              href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Verify a contractor, $14.99 &rarr;
            </a>
          </div>
        </div>
      </nav>

      {/* -- Hero -- */}
      <section className="bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[600px]">
          <div className="flex flex-col justify-center px-6 sm:px-12 py-16 lg:py-20">
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 text-emerald-300 text-sm font-medium px-3 py-1.5 rounded-full mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              For property managers &amp; real estate investors
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Verify before you
              <br />
              <span className="text-emerald-400">hand over the keys.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-lg leading-relaxed">
              You&apos;re trusting this person with a{" "}
              <strong className="text-white">$50K rehab</strong>, a{" "}
              <strong className="text-white">200-unit building</strong>, or a
              tenant&apos;s home. We pull{" "}
              <strong className="text-white">
                license status, complaints, BBB history, and verified reviews
              </strong>{" "}
              into one report so you know who you&apos;re actually hiring.
              Under an hour. $14.99.
            </p>
            <div className="mt-8">
              <a
                href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
                className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-7 rounded-xl transition-colors text-base shadow-lg shadow-emerald-900/40"
              >
                Verify a contractor, $14.99 &rarr;
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                All 50 states
              </span>
              <span className="text-slate-600">&middot;</span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                Under 1-hour delivery
              </span>
              <span className="text-slate-600">&middot;</span>
              <span className="flex items-center gap-1.5">
                <CheckIcon className="w-4 h-4 text-emerald-400" />
                100% money-back guarantee
              </span>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10" />
            <img
              src="/contractor-hero.png"
              alt="Contractor on a job site"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* -- Price callout strip -- */}
      <section className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-sm text-center sm:text-left">
            Same report. Every contractor. License, complaints, BBB, and reviews
            in one place.
          </p>
          <a
            href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
            className="text-sm bg-white text-emerald-700 font-bold px-5 py-2 rounded-lg hover:bg-emerald-50 transition-colors shrink-0"
          >
            Get your report for $14.99 &rarr;
          </a>
        </div>
      </section>

      {/* -- The cost of not checking -- */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5 tracking-tight">
              An active license doesn&apos;t tell you
              <br className="hidden sm:block" /> what happened on the last job.
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Most investors and property managers run{" "}
              <strong className="text-gray-900">one check</strong>. They pull up
              the state board, confirm the license is active, and move on.
              That&apos;s the check that tells you{" "}
              <strong className="text-gray-900">the least</strong>.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The contractor who disappeared with{" "}
              <strong className="text-gray-900">$17K in materials</strong> had
              an active license. The one who did{" "}
              <strong className="text-gray-900">
                plumbing without permits and failed inspection
              </strong>{" "}
              had an active license. The one who{" "}
              <strong className="text-gray-900">
                rebranded under a new LLC
              </strong>{" "}
              to bury his complaint history had an active license.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed">
              The pattern of disputes, the BBB strikes, the consistent warnings
              on review platforms &mdash; that&apos;s where the signal is. And
              it takes four different sites to find it.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                title: "Investors are losing $3K\u2013$110K per incident",
                desc: "Those aren\u2019t hypothetical numbers. They\u2019re from real investors posting on BiggerPockets about contractors who disappeared with deposits, did work without permits, or left rehabs in worse shape than they started.",
              },
              {
                title: "The vetting process is stuck in 2005",
                desc: "Check the state license board. Call the insurance company and get stonewalled. Google their name and hope the right John Smith shows up. Check BBB separately. Read Yelp. That\u2019s four sites, four search interfaces, different rules by state. Most people give up after the license check.",
              },
              {
                title: "One report replaces the entire runaround",
                desc: "We pull license status, complaints, BBB, and verified reviews into one document with a plain-English verdict: clear to proceed, proceed with caution, or do not hire. Takes us under an hour. Takes you 60 seconds to read.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-1.5 shrink-0 rounded-full bg-emerald-500 self-stretch" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Stats strip -- */}
      <section className="bg-slate-900 py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { number: "$274M", label: "Lost to contractor fraud in 2024", source: "FTC" },
            { number: "81,925", label: "Fraud reports filed in 2024", source: "FTC" },
            { number: "1 in 10", label: "Americans scammed by a contractor", source: "Today\u2019s Homeowner" },
            { number: "#2", label: "Most-complained-about industry in the US", source: "BBB" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-bold text-emerald-400">
                {stat.number}
              </p>
              <p className="text-sm text-slate-300 mt-1">{stat.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- Report Section -- */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">
              What you get
            </p>
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
              Six sources. One report. One verdict.
            </h2>
            <p className="text-slate-400">
              Forward it to your partner, your property owner, or your lender.
              Everything&apos;s in one document.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Sample report card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">
                    Apex Renovations LLC
                  </p>
                  <p className="text-gray-400 text-xs">
                    California &mdash; CheckLicensed Report
                  </p>
                </div>
                <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  VERIFIED
                </div>
              </div>
              <div className="px-6 py-5 space-y-3">
                {sampleChecks.map((check) => (
                  <div
                    key={check.label}
                    className="flex items-start justify-between gap-4 py-1.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <svg
                        className="w-4 h-4 text-emerald-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">
                        {check.label}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 text-right">
                      {check.status}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <p className="text-xs text-emerald-800 uppercase tracking-wide font-bold mb-1">
                      Verdict
                    </p>
                    <p className="text-sm text-emerald-900">
                      Clear to proceed. No red flags found across all 6
                      verification sources.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                  Sample report &mdash; actual data redacted
                </p>
              </div>
            </div>

            {/* Checklist + price + David K. */}
            <div>
              <ul className="space-y-4 mb-8">
                {reportItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-700 pt-6 text-center">
                <span className="text-4xl font-bold text-white">$14.99</span>
                <span className="text-slate-400 ml-1 text-sm">per report</span>
                <a
                  href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
                  className="mt-4 block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-6 rounded-xl transition-colors"
                >
                  Verify a contractor &rarr;
                </a>
                <p className="text-xs text-emerald-400 font-medium mt-3">
                  100% money-back guarantee
                </p>
              </div>

              {/* David K. -- near pricing */}
              <div className="mt-6 border-l-2 border-emerald-500 pl-4">
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;I used to just eyeball the state board and call it
                  &lsquo;due diligence.&rsquo; That cost me{" "}
                  <strong className="text-white not-italic">
                    three weeks and $9,000
                  </strong>{" "}
                  last summer when a GC had disciplinary actions I didn&apos;t
                  know how to find. Now, nobody touches a property until I run
                  the report. At{" "}
                  <strong className="text-white not-italic">
                    $14.99, it&apos;s the cheapest insurance I buy.
                  </strong>
                  &rdquo;
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div>
                    <span className="text-sm font-semibold text-white">
                      David K.
                    </span>
                    <span className="text-xs text-slate-400">
                      , Real Estate Investor &middot; Phoenix, AZ
                    </span>
                  </div>
                  <VerifiedBadge label="Verified Pro" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- How it works -- */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-14 tracking-tight">
            Three steps. Under an hour.
          </h2>
          <div className="grid gap-10 sm:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Tell us who to check.",
                desc: "Contractor name, license number if you have it, and the state they work in. That\u2019s all we need.",
              },
              {
                step: "2",
                title: "We run every check.",
                desc: "License board, state complaints database, BBB, and the review platforms. We cross-reference everything so you\u2019re not bouncing between tabs trying to figure out if the John Smith with 14 complaints is the same one bidding your rehab.",
              },
              {
                step: "3",
                title: "Read your verdict.",
                desc: "A clean report hits your inbox, usually inside an hour. License status, complaints, ratings, and a plain-English call. Forward it to your partner, your property owner, or keep it for your files.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-md shadow-emerald-100">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-100"
            >
              Get started, $14.99 &rarr;
            </a>
            <p className="text-sm text-gray-400 mt-3">
              All 50 states &middot; Under 1 hour &middot; 100% money-back
              guarantee
            </p>
          </div>
        </div>
      </section>

      {/* -- Testimonials -- */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            What investors and managers are saying
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {/* David K. */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;I used to just eyeball the state board and call it due
                diligence. That cost me{" "}
                <strong className="text-gray-900">
                  three weeks and $9,000
                </strong>{" "}
                last summer when a GC had disciplinary actions I didn&apos;t
                know how to find. Now,{" "}
                <strong className="text-gray-900">
                  nobody touches a property until I run the report.
                </strong>
                &rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900">
                  David K.
                </span>
                <span className="text-xs text-gray-400">
                  Real Estate Investor &middot; <em>Phoenix, AZ</em>
                </span>
                <VerifiedBadge label="Verified Pro" />
              </div>
            </div>

            {/* Priscilla O. */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;We manage 62 rentals, and our owners expect us to know
                exactly who we&apos;re sending to their houses. I can&apos;t
                spend all morning{" "}
                <strong className="text-gray-900">
                  jumping between four different websites
                </strong>{" "}
                every time a roof needs work. I just pull a report, forward it
                to the owner, and the{" "}
                <strong className="text-gray-900">
                  approval takes an afternoon instead of a week.
                </strong>
                &rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900">
                  Priscilla O.
                </span>
                <span className="text-xs text-gray-400">
                  Property Manager &middot; <em>Atlanta, GA</em>
                </span>
                <VerifiedBadge label="Verified Pro" />
              </div>
            </div>

            {/* James T. */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;The report flagged a pattern I totally would&apos;ve
                missed. The license was fine, but the summary found the same
                complaints about the{" "}
                <strong className="text-gray-900">
                  same foreman across three different platforms.
                </strong>{" "}
                Turns out the owner just{" "}
                <strong className="text-gray-900">
                  rebranded under a new LLC
                </strong>{" "}
                to hide his history. Saved me a deposit I wasn&apos;t getting
                back.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900">
                  James T.
                </span>
                <span className="text-xs text-gray-400">
                  Real Estate Investor &middot; <em>Raleigh, NC</em>
                </span>
                <VerifiedBadge label="Verified Pro" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Use cases -- */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Built for people who hire contractors repeatedly.
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Flippers and BRRRR investors.",
                desc: "Each rehab runs through 5\u20138 subs. One unlicensed electrician or a GC with a complaint trail can blow your timeline, your budget, and your inspection. Run the check before you hand over the deposit.",
              },
              {
                title: "Property managers.",
                desc: "Your owners trust you to vet the people walking onto their properties. One report per contractor, forwarded to the owner for approval. Know what you\u2019re working with before anyone starts swinging a hammer.",
              },
              {
                title: "Out-of-state investors.",
                desc: "You can\u2019t drive by the job site every morning. When you\u2019re investing in a market 1,000 miles away, verifying the contractor\u2019s license, complaint history, and reputation is the one thing you can control from a distance.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What\u2019s in a CheckLicensed report?",
                a: "Four categories. State license status (including classification, bond, and workers\u2019 comp). Disciplinary actions and complaints on record. BBB rating and complaint history. A summary of verified customer reviews across the major platforms. Every report closes with a plain-English verdict: clear to proceed, proceed with caution, or do not hire.",
              },
              {
                q: "How is this different from checking the state license board myself?",
                a: "An active license is one data point. It doesn\u2019t show complaint history, disciplinary actions, BBB strikes, or whether previous clients left consistent warnings on review platforms. Those checks live on separate sites with different search interfaces, and the process varies by state. We do all of it in one report.",
              },
              {
                q: "I\u2019m investing out of state. Does this cover all 50?",
                a: "Yes. Every state runs its own licensing system. We know how to work each one. Whether you\u2019re flipping in Ohio from California or managing properties in Texas from New York, same report, same coverage.",
              },
              {
                q: "How fast do I get it?",
                a: "Most reports land in your inbox inside an hour during business hours (9am to 6pm ET, Monday through Friday). Weekend and evening requests go out the next business morning.",
              },
              {
                q: "Can I run multiple contractors at once?",
                a: "Each report covers one contractor. If you\u2019re vetting a crew for a rehab, just submit each one separately. Most investors run 3\u20135 at a time when starting a new project.",
              },
              {
                q: "Do you verify insurance?",
                a: "Not currently. We verify license status, complaints, BBB, and reviews. Insurance verification is notoriously difficult \u2014 even calling the insurer directly often gets you stonewalled. We\u2019re working on adding it, but we won\u2019t promise something we can\u2019t deliver reliably today.",
              },
              {
                q: "I manage a large portfolio. Do you offer volume pricing?",
                a: "Not yet, but we\u2019re building toward it. If you\u2019re running more than 10 checks a month, email us and we\u2019ll work something out.",
              },
              {
                q: "What if I\u2019m not satisfied?",
                a: "100% money-back guarantee. Email us for any reason and you\u2019ll be refunded the same day.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Bottom CTA -- */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-5 tracking-tight">
            $15 now or $15,000 later.
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            The complaints are already on file. The disciplinary actions are
            sitting on a state board website. Three review platforms have
            warnings from real clients who hired this person before you.{" "}
            <strong className="text-slate-300">
              All of it is public. The only question is whether you look before
              you wire the deposit.
            </strong>
          </p>

          {/* Marcus W. */}
          <div className="mb-10 bg-slate-800 rounded-xl p-6 border border-slate-700 text-left">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              &ldquo;We bought a 6-unit out of state and the GC came
              recommended. I almost skipped the check. Report came back with{" "}
              <strong className="text-white not-italic">
                two prior complaints and a BBB warning
              </strong>{" "}
              I never would have found on my own. Went with a different
              contractor and the rehab came in{" "}
              <strong className="text-white not-italic">
                on time and under budget.
              </strong>{" "}
              Best $15 I&apos;ve ever spent on a property.&rdquo;
            </p>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm font-semibold text-white">
                Marcus W.
              </span>
              <span className="text-xs text-slate-400">
                BRRRR Investor &middot; <em>Cleveland, OH</em>
              </span>
              <VerifiedBadge label="Verified Pro" />
            </div>
          </div>

          <a
            href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-10 rounded-xl transition-colors text-base shadow-lg shadow-emerald-900/50"
          >
            Verify a contractor, $14.99 &rarr;
          </a>
          <p className="text-sm text-slate-400 mt-4">
            100% money-back guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* -- Footer -- */}
      <footer className="border-t border-gray-100 py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs text-gray-400 mb-2">
            &copy; 2026 CheckLicensed. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-300 max-w-lg mx-auto leading-relaxed">
            Reports are based on publicly available state licensing records,
            complaints databases, BBB listings, and review platforms, and are
            provided for informational purposes only. CheckLicensed does not
            guarantee the completeness or accuracy of third-party data sources.
            This service does not constitute legal advice.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a
              href="/compare-bids"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Compare Bids
            </a>
            <a
              href="/blog"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Blog
            </a>
            <a
              href="/terms"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
