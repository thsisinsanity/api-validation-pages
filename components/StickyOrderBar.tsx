"use client";

import { useEffect, useState } from "react";
import { PRICE_DISPLAY } from "@/lib/pricing";

// Mobile-only bottom bar, shown once the reader has scrolled past the intro.
export default function StickyOrderBar({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sm:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t border-slate-200 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] transition-transform ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={href}
        className="block w-full text-center bg-emerald-600 text-white font-bold py-3 rounded-xl no-underline"
      >
        Verify license, complaints, BBB &amp; reviews, {PRICE_DISPLAY}
      </a>
    </div>
  );
}
