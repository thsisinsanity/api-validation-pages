import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for ContractorAPI.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto prose prose-gray">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: March 29, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What we collect</h2>
          <p className="text-gray-600 leading-relaxed">
            When you join the waitlist, we collect your email address and the role you select.
            We do not collect payment information during the waitlist phase.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How we use it</h2>
          <p className="text-gray-600 leading-relaxed">
            We use your email address to notify you when the API launches and to send product
            updates. We do not sell, rent, or share your information with third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            We may use basic analytics cookies to understand which pages receive the most interest.
            No advertising cookies or cross-site tracking.
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
