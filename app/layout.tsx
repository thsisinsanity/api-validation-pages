import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://checklicensed.com"),
  title: "CheckLicensed | Verify Contractor Licenses Across All 50 States",
  description:
    "Verify contractor licenses, bonds, and insurance instantly. CheckLicensed checks state licensing records and delivers a plain-English report before you hire.",
  authors: [{ name: "CheckLicensed" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "CheckLicensed | Verify Contractor Licenses",
    description:
      "Verify contractor licenses, bonds, and insurance instantly. CheckLicensed checks state licensing records and delivers a plain-English report before you hire.",
    images: ["/logo.png"],
    type: "website",
    siteName: "CheckLicensed",
    url: "https://checklicensed.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "CheckLicensed | Verify Contractor Licenses",
    description:
      "Verify contractor licenses, bonds, and insurance instantly.",
  },
  verification: {
    google: "F7Cw2hcBtGWRpn7impM3GuBHc1meAU5ztw4-1wJpntI",
  },
  other: {
    "msvalidate.01": "B4064153DB59ED0B80A1F782A6A3BE54",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CheckLicensed",
  url: "https://checklicensed.com",
  logo: "https://checklicensed.com/logo.png",
  description:
    "CheckLicensed helps homeowners verify contractor licenses across all 50 states. We check state licensing records for license status, bond, workers' comp, and complaint history.",
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CheckLicensed",
  url: "https://checklicensed.com",
  description:
    "Verify contractor licenses, bonds, and insurance before you hire.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://checklicensed.com/check?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-[family-name:var(--font-inter)]">
        {children}
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-415SLVYXLW"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-415SLVYXLW');
          gtag('config', 'AW-18050346060');
        `}
      </Script>
    </html>
  );
}
