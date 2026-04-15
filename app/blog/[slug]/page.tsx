import type { Metadata } from "next";
import Link from "next/link";
import { posts, getPost } from "@/content/blog";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | CheckLicensed`,
    description: post.description,
    authors: [{ name: "CheckLicensed Editorial Team" }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["CheckLicensed Editorial Team"],
      siteName: "CheckLicensed",
      url: `https://checklicensed.com/blog/${slug}`,
      images: [
        {
          url: `https://checklicensed.com/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://checklicensed.com/blog/${slug}`,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Dynamic import of post content component
  let Content: React.ComponentType;
  try {
    const mod = await import(`@/content/posts/${slug}`);
    Content = mod.default;
  } catch {
    notFound();
  }

  // Article JSON-LD schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "CheckLicensed Editorial Team",
      url: "https://checklicensed.com",
    },
    publisher: {
      "@type": "Organization",
      name: "CheckLicensed",
      url: "https://checklicensed.com",
      logo: {
        "@type": "ImageObject",
        url: "https://checklicensed.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://checklicensed.com/blog/${slug}`,
    },
  };

  // FAQPage JSON-LD schema (if FAQs exist for this post)
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <main className="bg-white min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
            <a href="/blog" className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block">
              Blog
            </a>
            <a
              href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
              className="text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Verify my contractor, $14.99 →
            </a>
          </div>
        </div>
      </nav>

      <article className="pt-12 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block"
          >
            &larr; Back to blog
          </Link>

          <p className="text-sm text-gray-400 mt-6">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}{" "}
            &middot; {post.readTime}
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-2 leading-tight">
            {post.title}
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L3 7V12C3 17.25 6.75 22.05 12 23C17.25 22.05 21 17.25 21 12V7L12 2Z" fill="#10b981" />
              <path d="M9 12.5L11 14.5L15.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>CheckLicensed Editorial Team</span>
          </div>

          <div className="mt-10 prose prose-gray max-w-none text-gray-600 leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc [&_li]:mb-2 [&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:list-decimal [&_a]:text-emerald-600 [&_a]:underline [&_strong]:text-gray-900 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500">
            <Content />
          </div>

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-gray-100 pb-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 bg-slate-900 rounded-2xl p-8 text-center">
            <h3 className="font-bold text-white text-xl">
              Don&apos;t sign until you know who you&apos;re hiring.
            </h3>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
              License status is the easy part. We also pull <strong className="text-white">complaints, BBB history, and verified reviews</strong> — then hand you <strong className="text-white">one clear verdict</strong>. In your inbox in <strong className="text-white">1 hr or less</strong>.
            </p>
            <a
              href="https://www.paypal.com/ncp/payment/MQJVDCTLLX4BW"
              className="inline-block mt-5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-900/40"
            >
              Verify my contractor, $14.99 →
            </a>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400">
              <span>All 50 states</span>
              <span className="text-slate-600">·</span>
              <span>Under 1-hour delivery</span>
              <span className="text-slate-600">·</span>
              <span>100% money-back guarantee</span>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V12C3 17.25 6.75 22.05 12 23C17.25 22.05 21 17.25 21 12V7L12 2Z" fill="#059669" />
                <path d="M9 12.5L11 14.5L15.5 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">CheckLicensed Editorial Team</p>
              <p className="text-sm text-gray-500 mt-1">
                We research contractor licensing laws across all 50 states and verify data against official state databases. Our goal is to make it easy for homeowners to hire with confidence.
              </p>
            </div>
          </div>
        </div>
      </article>

      <footer className="py-12 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CheckLicensed
          </span>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <a href="/check" className="hover:text-gray-600">
              Check a contractor
            </a>
            <a href="/privacy" className="hover:text-gray-600">
              Privacy
            </a>
            <a href="/terms" className="hover:text-gray-600">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
