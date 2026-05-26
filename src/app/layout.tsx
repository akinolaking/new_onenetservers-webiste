import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { BillingProvider } from "@/lib/billing-context";
import { CurrencyProvider } from "@/lib/currency-context";
import { coreSeo, siteUrl } from "@/lib/seo-metadata";

import "./globals.css";

/* ── Fonts ── Inter: headings (max 500) | Lato: body copy ── */
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...coreSeo.home,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OneNet Servers",
  url: siteUrl,
  logo: `${siteUrl}/assets/logo.svg`,
  sameAs: [
    "https://www.facebook.com/onenetservers",
    "https://www.instagram.com/onenet.servers",
    "https://twitter.com/onenetservers",
    "https://linkedin.com/company/onenetservers",
    "https://youtube.com/@onenetservers"
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+2342013309154",
      contactType: "customer support",
      areaServed: ["NG", "GB"],
      availableLanguage: ["English"]
    }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OneNet Servers",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/domains?query={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lato.variable}`}>
      <body>
        <CurrencyProvider>
          <BillingProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <div className="app-frame">
              <Nav />
              {children}
              <Footer />
            </div>
          </BillingProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
