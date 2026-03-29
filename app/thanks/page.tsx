import Link from "next/link";

export const metadata = {
  title: "You're on the waitlist!",
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          You&apos;re on the waitlist!
        </h1>
        <p className="text-gray-600 mb-8">
          We&apos;ll email you when early access opens. Thanks for your interest.
        </p>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          &larr; Back
        </Link>
      </div>
    </main>
  );
}
