import type { Metadata } from "next";
import BidUploadForm from "@/components/BidUploadForm";

export const metadata: Metadata = {
  title: "Compare Contractor Bids — Free AI Bid Analyzer | CheckLicensed",
  description:
    "Upload up to 3 contractor bids and get a side-by-side analysis in 60 seconds. Spots scope mismatches, missing line items, and bid red flags. Free, no signup required.",
  alternates: {
    canonical: "https://checklicensed.com/compare-bids",
  },
  openGraph: {
    title: "Compare Contractor Bids — Free AI Bid Analyzer",
    description:
      "Stop guessing. Upload your contractor bids and a clear, line-by-line comparison in minutes.",
    url: "https://checklicensed.com/compare-bids",
    images: [
      {
        url: "/api/og?title=Compare%20Contractor%20Bids%20Side%20by%20Side",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const painCards = [
  {
    title: "Scope mismatch you can't see",
    body: "Each contractor heard something different when you walked them through the project. One bid is for your dream renovation. Another is for a stripped-down version. You have no idea which is which.",
  },
  {
    title: "The low-bid trap",
    body: "Cheap bids win jobs by leaving things out — demolition, permits, disposal, haul-away. You pick the winner, then spend the next six months approving change orders you never saw coming.",
  },
  {
    title: "No standard format",
    body: "One contractor sends a one-page total. Another sends a 12-page spreadsheet. Another emails a paragraph. There's no common language — so true comparison is impossible without expertise you don't have.",
  },
  {
    title: "Nobody to ask",
    body: "Calling contractors to question their bids is awkward, slow, and rarely productive. You end up either going with your gut or picking the middle number just to feel like you did something.",
  },
];

const featureCards = [
  {
    title: "Scope gap detection",
    body: "Identifies items present in some bids but missing from others — permits, demolition, haul-away, cleanup, inspections — the hidden costs that inflate final bills.",
  },
  {
    title: "Apples-to-apples normalization",
    body: "Reorganizes bids into a common structure so you can actually compare them.",
  },
  {
    title: "Market range flags",
    body: "Flags individual line items that fall significantly outside typical market ranges for your region and project type.",
  },
  {
    title: "Red flag alerts",
    body: "Surfaces signs of lowball bids designed to win on price and recoup through change orders — vague allowances, oversized deposits, missing license numbers.",
  },
  {
    title: "Questions to ask each contractor",
    body: "Generates a specific, prioritized list of follow-up questions for each contractor before you sign anything.",
  },
  {
    title: "Per-contractor due diligence",
    body: "Every bid in your comparison gets a verification card with a one-click path to a full CheckLicensed background report.",
  },
];

const faqs = [
  {
    q: "What file formats do you accept?",
    a: "PDF, JPG, PNG, WebP, DOCX, and plain text. You can also paste bid contents directly. We handle the parsing — you don't need to reformat anything.",
  },
  {
    q: "Do I need to format my bids before uploading?",
    a: "No. Drop them in as you received them. Our extraction works on typed PDFs, scanned PDFs, phone photos of paper bids, Word docs, and plain text.",
  },
  {
    q: "How accurate is the comparison?",
    a: "Bid extraction is automated and very fast, but not infallible. Each bid in your results includes a confidence score, and we'll flag any extracted line items you should double-check against the original document.",
  },
  {
    q: "Is my bid data kept private?",
    a: "Yes. Your bids are processed in-memory and deleted immediately after analysis. We don't store the original files. We do save the email you provide so we can send you the comparison link.",
  },
  {
    q: "Does this replace a contractor or construction consultant?",
    a: "No. This is a fast, free first-pass tool. It catches the obvious stuff — missing scope, oversized deposits, vague allowances — so you can have a smarter conversation with your contractors.",
  },
  {
    q: "What if I only have one bid so far?",
    a: "You can still upload it. We'll flag red flags and missing scope on a single bid. But the real value of this tool is catching scope mismatches between competing bids — so come back when you have 2 or 3.",
  },
];

export default function CompareBidsPage() {
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
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">
              How it works
            </a>
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">
              Features
            </a>
            <a href="/blog" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">
              Blog
            </a>
            <a
              href="/"
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Verify a Contractor, $14.99 →
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 min-h-[560px]">

          {/* Left: copy */}
          <div className="flex flex-col justify-center px-6 sm:px-12 py-16 lg:py-20 lg:col-span-2">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
              AI-powered bid analysis · Free
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Stop guessing.
              <br />
              <span className="text-emerald-400">Start knowing.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-lg">
              Upload your contractor bids and get a clear, line-by-line analysis in minutes — flagging missing scope, vague allowances, and the gaps that turn cheap bids into expensive mistakes.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href="#analyze"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-7 rounded-xl transition-colors shadow-lg shadow-emerald-900/40"
              >
                Analyze my bids free →
              </a>
              <a href="#how-it-works" className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
                See how it works ↓
              </a>
            </div>

            {/* Stat strip */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-700 pt-8">
              {[
                { stat: "53%", label: "exceeded their renovation budget" },
                { stat: "100%", label: "avg gap between high and low bids" },
                { stat: "$0", label: "to analyze your first set of bids" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-emerald-400">{s.stat}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bid analyzer image */}
          <div className="relative hidden lg:block overflow-hidden lg:col-span-3">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent z-10" />
            <img
              src="/bid-analyzer.png"
              alt="AI bid analyzer showing unclear bid transformed into analyzed bid with flags"
              className="w-full h-full object-contain object-center"
            />
          </div>
        </div>
      </section>

      {/* ── Problem section ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">The problem</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5 tracking-tight">
                Three bids. Three completely different jobs.
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                You do everything right. You get three quotes. Then they come back at <strong className="text-gray-900">$41k, $58k, and $79k</strong> — and suddenly you&apos;re more confused than when you started. The real issue isn&apos;t the price gap. It&apos;s that you have <strong className="text-gray-900">no way to know <em>why</em></strong> they&apos;re different. Is one lowballing and planning to hit you with change orders? Is another padding overhead? Did anyone actually include permits?
              </p>
              <blockquote className="border-l-4 border-emerald-500 pl-4 text-gray-700 italic mb-5">
                &ldquo;It all feels like a black box and makes it hard to compare apples-to-apples.&rdquo;
                <footer className="text-xs text-gray-500 mt-1 not-italic">— Homeowner, r/HomeImprovement</footer>
              </blockquote>
              <p className="text-gray-900 font-semibold">
                Without construction knowledge, you&apos;re not comparing bids. <strong>You&apos;re guessing.</strong> And a bad guess at $50,000 is an expensive one.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {painCards.map((card) => (
                <div key={card.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-600 text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              Expert analysis. No expert required.
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We read your contractor bids the way a seasoned construction manager would — then explain what we found in plain English.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Upload your bids",
                body: "Drop in 2–3 contractor bids in any format — PDF, Word doc, photo, or plain text. We handle the parsing so you don't have to reformat anything.",
              },
              {
                step: "2",
                title: "AI reads between the lines",
                body: "Our extraction engine normalizes scope, identifies what's included vs. omitted, flags vague line items, and surfaces pricing that falls outside market range.",
              },
              {
                step: "3",
                title: "Get a clear verdict",
                body: "You receive a side-by-side comparison with plain-language flags, red-flag alerts, and a prioritized list of questions to ask each contractor.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4 shadow-md shadow-emerald-100">
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">What the analysis covers</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We don&apos;t just compare totals. We read line items, infer what&apos;s missing, and flag the specific things that turn &ldquo;competitive bids&rdquo; into budget nightmares.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureCards.map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M12 2L3 7V12C3 17.25 6.75 22.05 12 23C17.25 22.05 21 17.25 21 12V7L12 2Z" fill="#059669" />
                    <path d="M9 12.5L11 14.5L15.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 className="font-bold text-gray-900">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upload form ── */}
      <section id="analyze" className="py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Upload your bids</h2>
            <p className="text-slate-400">Free analysis. No account required. Results in about 60 seconds.</p>
          </div>
          <BidUploadForm />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12 tracking-tight">
            Common questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">Free analysis · No account required</p>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
            Upload your bids. Get clarity in 60 seconds.
          </h2>
          <p className="text-slate-400 mb-8">
            Stop picking the middle number and hoping for the best. <strong className="text-slate-300">Know exactly what you&apos;re paying for</strong> before you sign anything.
          </p>
          <a
            href="#analyze"
            className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-lg shadow-emerald-900/50"
          >
            Analyze my bids free →
          </a>
          <p className="text-xs text-slate-400 mt-3">No account. No credit card. No construction knowledge required.</p>
          <div className="mt-8 border-t border-slate-700 pt-6">
            <p className="text-sm text-slate-400 mb-3">Know which bid to verify? Run a full background check.</p>
            <a
              href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
              className="inline-block bg-white text-emerald-700 font-bold py-2.5 px-6 rounded-lg hover:bg-emerald-50 transition-colors text-sm"
            >
              Verify a contractor — $14.99 →
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs text-gray-400 mb-2">
            &copy; 2026 CheckLicensed. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <a href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">CheckLicensed</a>
            <a href="/blog" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Blog</a>
            <a href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms</a>
            <a href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
