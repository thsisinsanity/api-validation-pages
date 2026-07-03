// app/order/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order a Contractor Verification Report — CheckLicensed",
  description:
    "Tell us who you're hiring. We verify license, complaints, BBB, and reviews — one clear verdict in your inbox in under an hour. $25.",
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
