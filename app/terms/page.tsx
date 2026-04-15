import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | CheckLicensed",
  description: "Terms of service for CheckLicensed — contractor license verification service.",
  alternates: {
    canonical: "https://checklicensed.com/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto prose prose-gray">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 mb-8 inline-block">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 3, 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Service Description</h2>
          <p className="text-gray-600 leading-relaxed">
            CheckLicensed (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides contractor license verification
            reports based on publicly available data from state licensing boards and government
            databases. Our service is designed to help homeowners and businesses verify contractor
            license status, bond information, workers&apos; compensation coverage, and complaint
            history before hiring.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Accuracy of Information</h2>
          <p className="text-gray-600 leading-relaxed">
            Our reports are based on data retrieved from official state licensing databases at the
            time of the request. While we make every effort to provide accurate and current
            information, we cannot guarantee that all data is complete, up-to-date, or free from
            errors. State databases may have processing delays, and license status can change
            between our query and your review of the report.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            CheckLicensed reports are informational only and should not be your sole basis for
            hiring decisions. We recommend independently verifying critical information directly
            with the relevant state licensing board.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Payment and Refunds</h2>
          <p className="text-gray-600 leading-relaxed">
            Each verification report is a one-time purchase. Payment is processed securely at the
            time of your request. Because our service delivers a digital report immediately upon
            purchase, all sales are final. If you believe there is a technical error with your
            report, please contact us within 7 days and we will review your request.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Permitted Use</h2>
          <p className="text-gray-600 leading-relaxed">
            CheckLicensed reports are for personal, non-commercial use in connection with hiring
            decisions. You may not use our service for bulk data collection, resale of report data,
            or any purpose that violates applicable law. Automated or programmatic access to our
            service is prohibited without our express written permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            To the fullest extent permitted by law, CheckLicensed and its operators shall not be
            liable for any direct, indirect, incidental, special, or consequential damages arising
            from your use of, or reliance on, our reports or website. Our total liability to you
            for any claim arising from use of our service shall not exceed the amount you paid for
            the report in question.
          </p>
          <p className="text-gray-600 leading-relaxed mt-3">
            CheckLicensed is not a law firm and does not provide legal advice. Nothing in our
            reports constitutes legal, financial, or professional advice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. No Warranties</h2>
          <p className="text-gray-600 leading-relaxed">
            Our service is provided &quot;as is&quot; without warranties of any kind, express or implied,
            including but not limited to warranties of merchantability, fitness for a particular
            purpose, or non-infringement. We do not warrant that the service will be uninterrupted,
            error-free, or that reports will be complete or current.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Privacy</h2>
          <p className="text-gray-600 leading-relaxed">
            Your use of CheckLicensed is also governed by our{" "}
            <Link href="/privacy" className="text-emerald-600 hover:underline">
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to These Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these Terms from time to time. Changes will be posted on this page with
            an updated date. Continued use of our service after any changes constitutes your
            acceptance of the revised Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms are governed by the laws of the United States. Any disputes arising from
            your use of our service shall be resolved through binding arbitration in accordance
            with applicable law, except where prohibited.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about these Terms? Email us at{" "}
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
