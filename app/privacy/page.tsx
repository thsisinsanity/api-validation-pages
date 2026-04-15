import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | CheckLicensed",
  description: "Privacy policy for CheckLicensed — contractor license verification service.",
  alternates: {
    canonical: "https://checklicensed.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto prose prose-gray">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 3, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. What We Collect</h2>
          <p className="text-gray-600 leading-relaxed">
            When you use CheckLicensed, we collect:
          </p>
          <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
            <li>
              <strong>Contractor information you submit</strong> — the name, license number, or
              business name you provide to run a verification check.
            </li>
            <li>
              <strong>Your email address</strong> — to deliver your report and provide order
              confirmation.
            </li>
            <li>
              <strong>Payment information</strong> — processed securely through our payment
              processor. We do not store your full card number; our payment processor handles
              all payment data.
            </li>
            <li>
              <strong>Usage data</strong> — pages visited, time on site, and general traffic
              patterns, collected via Google Analytics 4 to help us improve the service.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use It</h2>
          <p className="text-gray-600 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
            <li>Run the contractor license verification you requested and deliver your report.</li>
            <li>Process your payment and send order confirmation.</li>
            <li>Respond to questions or support requests you send us.</li>
            <li>Understand how people use our site so we can improve it.</li>
            <li>Send occasional product updates if you opt in — you can unsubscribe at any time.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            We do not sell, rent, or share your personal information with third parties for
            marketing purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Contractor Data</h2>
          <p className="text-gray-600 leading-relaxed">
            Contractor license information in our reports is sourced from publicly available
            government databases (state licensing boards, contractor registries, and similar
            public records). This data is public by law and is not private information. We
            do not store or publish contractor data beyond what is needed to generate and
            deliver your report.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookies and Analytics</h2>
          <p className="text-gray-600 leading-relaxed">
            We use Google Analytics 4 to understand site traffic and usage patterns. This
            involves cookies that collect anonymized data about your visit. We do not use
            advertising cookies, retargeting pixels, or cross-site tracking for ad purposes.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            You can opt out of Google Analytics by using the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
          <p className="text-gray-600 leading-relaxed">
            We retain order and report records for a reasonable period to support customer
            service and legal compliance. You may request deletion of your personal data
            by contacting us at the email below, and we will honor such requests to the
            extent permitted by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed">
            We use the following third-party services, each with their own privacy policies:
          </p>
          <ul className="text-gray-600 leading-relaxed mt-3 space-y-2">
            <li><strong>Vercel</strong> — website hosting and infrastructure.</li>
            <li><strong>Google Analytics</strong> — anonymized site usage analytics.</li>
            <li><strong>Stripe or similar</strong> — secure payment processing.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We use industry-standard measures to protect your data, including HTTPS encryption
            for all data in transit. No method of transmission over the internet is 100% secure,
            and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Children&apos;s Privacy</h2>
          <p className="text-gray-600 leading-relaxed">
            CheckLicensed is not directed to children under 13 and we do not knowingly collect
            personal information from children.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this
            page with an updated date. Continued use of our service after changes constitutes
            acceptance of the revised policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about this Privacy Policy? Email us at{" "}
            <a href="mailto:hello@checklicensed.com" className="text-emerald-600 hover:underline">
              hello@checklicensed.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
