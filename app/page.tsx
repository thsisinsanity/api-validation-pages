import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Any Contractor — License, Complaints, BBB, Reviews | CheckLicensed",
  description:
    "The complete contractor verification stack. License, complaints, BBB, and verified reviews — all in one report. Saves you ~30 minutes of research. $14.99.",
  alternates: {
    canonical: "https://checklicensed.com",
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
  { label: "Classification", status: "B — General Building" },
  { label: "Bond + Workers' Comp", status: "Both current" },
  { label: "Complaints", status: "None on file" },
  { label: "BBB", status: "A+ rating, 0 complaints" },
  { label: "Reviews", status: "4.7★ avg across 3 sources" },
];

function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      {label}
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">

      {/* ── Nav ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 17.25 6.75 22.05 12 23C17.25 22.05 21 17.25 21 12V7L12 2Z" fill="#059669" />
              <path d="M9 12.5L11 14.5L15.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-gray-900 text-base tracking-tight">CheckLicensed</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/compare-bids" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">Compare Bids</a>
            <a href="/blog" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">Blog</a>
            <a href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW" className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
              Verify my contractor, $14.99 →
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[600px]">
          <div className="flex flex-col justify-center px-6 sm:px-12 py-16 lg:py-20">
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 text-emerald-300 text-sm font-medium px-3 py-1.5 rounded-full mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              Saves homeowners ~30 minutes of research
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Don&apos;t sign until you
              <br />
              <span className="text-emerald-400">know who you&apos;re hiring.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-300 max-w-lg leading-relaxed">
              License status is the easy part. We also pull <strong className="text-white">complaints, BBB history, and verified reviews</strong> from across the web, then hand you <strong className="text-white">one clear verdict</strong> so you know who you&apos;re actually dealing with. In your inbox in <strong className="text-white">1 hr or less</strong>. $14.99.
            </p>
            <div className="mt-8">
              <a href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW" className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-7 rounded-xl transition-colors text-base shadow-lg shadow-emerald-900/40">
                Verify my contractor, $14.99 →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                All 50 states
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                Under 1-hour delivery
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                100% money-back guarantee
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500 italic">Every report is run manually. Requests after 4pm ET deliver next business morning.</p>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10" />
            <img src="/contractor-hero.png" alt="Smiling contractor at work, looking at camera" className="w-full h-full object-cover object-center" />
          </div>
        </div>
      </section>

      {/* ── Price callout strip ── */}
      <section className="bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white font-semibold text-sm text-center sm:text-left">
            Complete contractor verification — license, complaints, BBB, and reviews in one report.
          </p>
          <a href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW" className="text-sm bg-white text-emerald-700 font-bold px-5 py-2 rounded-lg hover:bg-emerald-50 transition-colors shrink-0">
            Get your report for $14.99 →
          </a>
        </div>
      </section>

      {/* ── Reciprocity strip ── */}
      <section className="bg-emerald-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-center gap-x-2 text-sm text-center">
          <span className="text-emerald-800 font-medium">Comparing bids and not sure who to run first?</span>
          <a href="/compare-bids" className="font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 transition-colors">Try our free bid comparison tool →</a>
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-5 tracking-tight">
              A valid license tells you almost nothing.
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Most homeowners do <strong className="text-gray-900">one check</strong>. They pull up the state board, confirm the license is active, and move on. That&apos;s the check that tells you <strong className="text-gray-900">the least</strong>.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              The real signal lives somewhere else. <strong className="text-gray-900">The pattern of disputes. The BBB strikes.</strong> The three customers who left warnings on three different review platforms about exactly the thing that&apos;s about to happen to you. All of that is sitting on four other sites, each with its own search interface, and the process changes state by state. <strong className="text-gray-900">Most people never look.</strong>
            </p>
            <p className="text-gray-600 font-medium leading-relaxed">
              A CheckLicensed report pulls all of it into one place.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { title: "Licensed doesn't mean safe", desc: "An active license means a contractor cleared the minimum bar to register with their state. It says nothing about their complaint history, their disciplinary record, or whether six previous clients hit the exact wall you're about to hit." },
              { title: "The information is scattered on purpose", desc: "License board in one place. State complaints database in another. BBB somewhere else. Review aggregators on top of that. Four sites, four interfaces, and the rules change by state. We know how to work all of them." },
              { title: "You get a plain-English verdict", desc: "Every report closes with one of three calls: clear to proceed, proceed with caution, or do not hire. You don't have to interpret anything yourself." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-1.5 shrink-0 rounded-full bg-emerald-500 self-stretch" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Report Section ── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">What you get</p>
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Six sources. One report. One verdict.</h2>
            <p className="text-slate-400">Most verification stops at the state license board. Yours shouldn&apos;t.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Sample report card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">Apex Renovations LLC</p>
                  <p className="text-gray-400 text-xs">California — CheckLicensed Report</p>
                </div>
                <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">VERIFIED</div>
              </div>
              <div className="px-6 py-5 space-y-3">
                {sampleChecks.map((check) => (
                  <div key={check.label} className="flex items-start justify-between gap-4 py-1.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      <span className="text-sm font-medium text-gray-900">{check.label}</span>
                    </div>
                    <span className="text-sm text-gray-500 text-right">{check.status}</span>
                  </div>
                ))}
                <div className="border-t border-gray-100 pt-4 mt-2">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <p className="text-xs text-emerald-800 uppercase tracking-wide font-bold mb-1">Verdict</p>
                    <p className="text-sm text-emerald-900">Clear to proceed. No red flags found across all 6 verification sources.</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">Sample report — actual data redacted</p>
              </div>
            </div>

            {/* Checklist + price + David K. */}
            <div>
              <ul className="space-y-4 mb-8">
                {reportItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-700 pt-6 text-center">
                <span className="text-4xl font-bold text-white">$14.99</span>
                <span className="text-slate-400 ml-1 text-sm">per report</span>
                <a href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW" className="mt-4 block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-6 rounded-xl transition-colors">
                  Verify my contractor →
                </a>
                <p className="text-xs text-emerald-400 font-medium mt-3">100% money-back guarantee</p>
              </div>

              {/* David K. — near pricing */}
              <div className="mt-6 border-l-2 border-emerald-500 pl-4">
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;I used to just eyeball the state board and call it &lsquo;due diligence.&rsquo; That cost me <strong className="text-white not-italic">three weeks and $9,000</strong> last summer when a GC had disciplinary actions I didn&apos;t know how to find. Now, nobody touches a property until I run the report. At <strong className="text-white not-italic">$14.99, it&apos;s the cheapest insurance I buy.</strong>&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div>
                    <span className="text-sm font-semibold text-white">David K.</span>
                    <span className="text-xs text-slate-400">, Real Estate Investor · Phoenix, AZ</span>
                  </div>
                  <VerifiedBadge label="Verified Pro" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-14 tracking-tight">
            Three steps. Under an hour.
          </h2>
          <div className="grid gap-10 sm:grid-cols-3 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Tell us who to check.", desc: "Contractor name, license number if you have it, and the state they work in. That's all we need." },
              { step: "2", title: "We run every check.", desc: "License board, state complaints database, BBB, and the review platforms. We cross-reference everything into one picture so you're not bouncing between tabs trying to figure out if the John Smith with 14 complaints is the same John Smith you're about to hire." },
              { step: "3", title: "Read your verdict.", desc: "A clean report hits your inbox, usually inside an hour. License status, complaints, ratings, and a plain-English call telling you where things stand." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-md shadow-emerald-100">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW" className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-100">
              Get started, $14.99 →
            </a>
            <p className="text-sm text-gray-400 mt-3">All 50 states · Under 1 hour · 100% money-back guarantee</p>
          </div>
        </div>
      </section>

      {/* ── Testimonials — Megan, Priscilla, James ── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-2">★★★★★ Verified customers</p>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Homeowners, investors, and property managers
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">

            {/* Megan R. */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;I was literally <strong className="text-gray-900">24 hours away from signing</strong> for a $38,000 kitchen remodel. I&apos;d checked the license and it was active, so I thought I was good. But the report found four BBB complaints from the last year, all the same story: <strong className="text-gray-900">deposits taken, timelines blown, and the guy just stopped answering.</strong>{" "}I walked. The second guy I ran came back clean, and he&apos;s actually doing the work now.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900">Megan R.</span>
                <span className="text-xs text-gray-400">Homeowner · <em>Denver, CO</em></span>
                <VerifiedBadge label="Verified Homeowner" />
              </div>
            </div>

            {/* Priscilla O. */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;We manage 62 rentals, and our owners expect us to know exactly who we&apos;re sending to their houses. I can&apos;t spend all morning <strong className="text-gray-900">jumping between four different websites</strong> every time a roof needs work. I just pull a report, forward it to the owner, and the <strong className="text-gray-900">approval takes an afternoon instead of a week.</strong>&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900">Priscilla O.</span>
                <span className="text-xs text-gray-400">Property Manager · <em>Atlanta, GA</em></span>
                <VerifiedBadge label="Verified Pro" />
              </div>
            </div>

            {/* James T. */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
              <p className="text-gray-600 text-sm leading-relaxed">
                &ldquo;The report flagged a pattern I totally would&apos;ve missed. The license was fine, but the summary found the same complaints about the <strong className="text-gray-900">same foreman across three different platforms.</strong> Turns out the owner just <strong className="text-gray-900">rebranded under a new LLC</strong>{" "}to hide his history. I asked him about it and he got weird immediately. Saved me a deposit I wasn&apos;t getting back.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900">James T.</span>
                <span className="text-xs text-gray-400">Homeowner · <em>Raleigh, NC</em></span>
                <VerifiedBadge label="Verified Homeowner" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Who needs this ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Anyone about to sign a contract with a stranger.
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: "Homeowners.", desc: "You're about to let someone into your house and hand them a check for $20,000, $50,000, sometimes more. Thirty minutes of research before that happens is a reasonable ask. We do it for you in under an hour." },
              { title: "Real estate investors.", desc: "Rehab timelines live or die on who you put on the job. A contractor with a pattern of disputes, abandoned projects, or a quietly expired license isn't a risk you can budget around. Run the check before you hand over the keys." },
              { title: "Property managers.", desc: "Your owners trust you to vet the people walking onto their properties. One report per contractor. Know what you're working with before anyone starts swinging a hammer." },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Common questions
          </h2>
          <div className="space-y-6">
            {[
              { q: "What's actually in a CheckLicensed report?", a: "Four things. State license status (including classification, bond, and workers' comp). Disciplinary actions and complaints on record. BBB rating and complaint history. A summary of verified customer reviews across the major platforms. Every report closes with a plain-English verdict: clear to proceed, proceed with caution, or do not hire." },
              { q: "How is this different from just checking the state license board myself?", a: "An active license is one data point. It doesn't show complaint history, disciplinary actions, BBB strikes, or whether previous customers left consistent warnings on review platforms. Those checks live on separate sites with different search interfaces, and the process varies by state. We do all of it in one report." },
              { q: "How fast do I get it?", a: "Most reports land in your inbox inside an hour during business hours (9am to 6pm ET, Monday through Friday). Weekend and evening requests go out the next business morning." },
              { q: "What states do you cover?", a: "All 50. Every state runs its own licensing system. We know how to work each one." },
              { q: "What if the contractor isn't licensed at all?", a: "That's exactly the situation this service is built for. If we can't find an active license, we say so clearly, so you know before you sign instead of after you've already paid a deposit." },
              { q: "Can I check multiple contractors?", a: "Each report covers one contractor. If you're holding two or three bids and trying to figure out who to run first, try our free bid comparison tool. It flags scope gaps and obvious red flags so you know which bid is worth the deeper look." },
              { q: "How accurate is the information?", a: "We pull directly from official state licensing records, state complaints databases, BBB listings, and the major review platforms. When sources disagree, we flag it. We don't smooth over the disagreements. We surface them so you can see what you're looking at." },
              { q: "What if I'm not satisfied?", a: "100% money-back guarantee. Email us for any reason and you'll be refunded the same day." },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">Built for people who&apos;ve been burned — or are determined not to be.</p>
          <h2 className="text-3xl font-bold text-white mb-5 tracking-tight">
            $15 now or $15,000 later.
          </h2>
          <p className="text-slate-400 mb-10 leading-relaxed">
            The complaints are already out there. The disciplinary actions are on file. <strong className="text-slate-300">Three review platforms have honest warnings from real customers sitting on them right now.</strong> All of it is public. The only question is whether you <strong className="text-slate-300">look before you sign</strong>, or find out after the drywall is already open.
          </p>

          {/* Sarah L. — near final CTA */}
          <div className="mb-10 bg-slate-800 rounded-xl p-6 border border-slate-700 text-left">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              &ldquo;Honestly, I mostly bought it because <strong className="text-white not-italic">I was so anxious</strong> about the whole thing. It came back clean and had that &lsquo;clear to proceed&rsquo; note at the bottom, which was exactly what I needed to sign the contract <strong className="text-white not-italic">without second-guessing myself.</strong> Worth it just so I could sleep that night.&rdquo;
            </p>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-sm font-semibold text-white">Sarah L.</span>
              <span className="text-xs text-slate-400">Homeowner · <em>Portland, OR</em></span>
              <VerifiedBadge label="Verified Homeowner" />
            </div>
          </div>

          <a href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW" className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-10 rounded-xl transition-colors text-base shadow-lg shadow-emerald-900/50">
            Verify my contractor, $14.99 →
          </a>
          <p className="text-sm text-slate-400 mt-4">
            100% money-back guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs text-gray-400 mb-2">
            &copy; 2026 CheckLicensed. All rights reserved.
          </p>
          <p className="text-center text-xs text-gray-300 max-w-lg mx-auto leading-relaxed">
            Reports are based on publicly available state licensing records, complaints databases, BBB listings, and review platforms, and are provided for informational purposes only.
            CheckLicensed does not guarantee the completeness or accuracy of third-party data sources.
            This service does not constitute legal advice.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a href="/compare-bids" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Compare Bids</a>
            <a href="/blog" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Blog</a>
            <a href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms</a>
            <a href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
