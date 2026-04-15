import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog";

const POSTS_PER_PAGE = 20;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const pageLabel = currentPage > 1 ? ` — Page ${currentPage} of ${totalPages}` : "";

  return {
    title: `Blog${pageLabel} | CheckLicensed`,
    description:
      "Guides, tips, and research on verifying contractor licenses across all 50 states.",
    alternates: {
      canonical:
        currentPage === 1
          ? "https://checklicensed.com/blog"
          : `https://checklicensed.com/blog?page=${currentPage}`,
    },
  };
}

export default async function BlogIndex({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const pagePosts = posts.slice(startIndex, endIndex);

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
            <a href="/compare-bids" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">
              Compare Bids
            </a>
            <a
              href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Verify a Contractor, $14.99 →
            </a>
          </div>
        </div>
      </nav>

      {/* ── Blog header ── */}
      <section className="bg-slate-900 py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">CheckLicensed Blog</p>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
            Contractor verification guides
          </h1>
          <p className="text-slate-400 text-lg">
            Guides and research on verifying contractors before you hire.
          </p>
        </div>
      </section>

      {/* ── Post list ── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 mb-10">
            Page {safePage} of {totalPages}
          </p>

          <div className="space-y-10">
            {pagePosts.map((post) => (
              <article key={post.slug} className="border-b border-gray-100 pb-10">
                <p className="text-sm text-gray-400 mb-1">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}{" "}
                  &middot; {post.readTime}
                </p>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                    {post.description}
                  </p>
                </Link>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-3 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
            <div>
              {safePage > 1 ? (
                <Link
                  href={safePage === 2 ? "/blog" : `/blog?page=${safePage - 1}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ← Previous
                </Link>
              ) : (
                <span className="text-sm text-gray-300">← Previous</span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - safePage) <= 2
                )
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                    acc.push("…");
                  }
                  acc.push(p);
                  return acc;
                }, [])
                .map((item, idx) =>
                  item === "…" ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 text-sm">
                      &hellip;
                    </span>
                  ) : (
                    <Link
                      key={item}
                      href={item === 1 ? "/blog" : `/blog?page=${item}`}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        item === safePage
                          ? "bg-emerald-600 text-white"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </Link>
                  )
                )}
            </div>

            <div>
              {safePage < totalPages ? (
                <Link
                  href={`/blog?page=${safePage + 1}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Next →
                </Link>
              ) : (
                <span className="text-sm text-gray-300">Next →</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="bg-emerald-600 py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to verify your contractor?</h2>
          <p className="text-emerald-100 mb-6">License, complaints, BBB, and reviews — one report, under an hour.</p>
          <a
            href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
            className="inline-block bg-white text-emerald-700 font-bold py-3 px-7 rounded-xl hover:bg-emerald-50 transition-colors"
          >
            Verify my contractor — $14.99
          </a>
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
            <a href="/compare-bids" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Compare Bids</a>
            <a href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms</a>
            <a href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
