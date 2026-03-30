import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for ContractorAPI.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto prose prose-gray">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 29, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Waitlist</h2>
          <p className="text-gray-600 leading-relaxed">
            By joining the waitlist, you agree to receive email updates about this product.
            You can unsubscribe at any time by replying to any email with &quot;unsubscribe.&quot;
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">No warranties</h2>
          <p className="text-gray-600 leading-relaxed">
            This site is a pre-launch validation page. The API described has not yet launched.
            Pricing, features, and availability are subject to change. Nothing on this site
            constitutes a binding offer or guarantee.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Limitation of liability</h2>
          <p className="text-gray-600 leading-relaxed">
            We are not liable for any damages arising from your use of or reliance on this
            website or its content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions? Email us at{" "}
            <a href="mailto:hello@contractorapi.dev" className="text-blue-600 hover:underline">
              hello@contractorapi.dev
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
