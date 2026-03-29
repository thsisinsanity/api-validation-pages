import Link from "next/link";
import { niches } from "@/content/niches";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          API Validation Pages
        </h1>
        <p className="text-gray-600 mb-10">
          Internal index — each link goes to a niche landing page.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.values(niches).map((niche) => (
            <Link
              key={niche.slug}
              href={`/${niche.slug}`}
              className="block p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all text-left"
            >
              <p className="font-semibold text-gray-900">{niche.name}</p>
              <p className="text-sm text-gray-500 mt-1">/{niche.slug}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
