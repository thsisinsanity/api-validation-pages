import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Received — CheckLicensed",
  description: "Tell us which contractor to verify and we'll start your report.",
  robots: { index: false, follow: false },
};

export default function ThanksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
