import type { Metadata } from "next";

import { PricingHubPage } from "@/components/pricing/PricingHubPage";
import { coreSeo } from "@/lib/seo-metadata";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import type { PricingHubBilling, PricingHubCategory, PricingHubDomainMode } from "@/lib/pricing-hub";

export const metadata: Metadata = coreSeo.pricing;

export const dynamic = "force-dynamic";

const pricingBreadcrumbs = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
]);

const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are the prices on this page live?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The pricing hub reads current WHMCS pricing for hosting, domains, VPS, email and security plans before checkout."
      }
    },
    {
      "@type": "Question",
      name: "Can I compare monthly and annual billing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monthly and annual billing can be compared for supported hosting products. Domain, SSL and OneGuard security products are annual plans."
      }
    },
    {
      "@type": "Question",
      name: "Will my selected currency carry into checkout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The selected currency is preserved from the pricing hub into WHMCS checkout where supported by the billing platform."
      }
    }
  ]
};

type PricingFeed = {
  generatedAt: string;
  currencies: Array<"NGN" | "GBP" | "USD">;
  categories: Array<{
    key: PricingHubCategory;
    label: string;
    eyebrow: string;
    title: string;
    lead: string;
    supportsMonthly: boolean;
    benefits: string[];
    plans: unknown[];
  }>;
};

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_WHMCS_BASE_URL?.replace(/\/+$/, "") || "https://onenetservers.net";
}

async function getPricingFeed(): Promise<PricingFeed> {
  const response = await fetch(`${getBaseUrl()}/pricing-feed.php`, {
    cache: "no-store",
    next: { revalidate: 0 },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`pricing_feed_failed:${response.status}`);
  }

  return response.json();
}

function coerceCategory(value: string | string[] | undefined): PricingHubCategory {
  const candidate = Array.isArray(value) ? value[0] : value;
  const allowed: PricingHubCategory[] = [
    "wordpress-hosting",
    "web-hosting",
    "reseller-hosting",
    "domains",
    "vps-hosting",
    "business-email",
    "security",
  ];
  return allowed.includes(candidate as PricingHubCategory) ? (candidate as PricingHubCategory) : "web-hosting";
}

function coerceBilling(value: string | string[] | undefined): PricingHubBilling {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate === "monthly" ? "monthly" : "annual";
}

function coerceDomainMode(value: string | string[] | undefined): PricingHubDomainMode {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate === "transfer" ? "transfer" : "register";
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const feed = await getPricingFeed();
  const initialCategory = coerceCategory(searchParams?.category);
  const initialBilling = coerceBilling(searchParams?.billing);
  const initialMode = coerceDomainMode(searchParams?.mode);
  const initialFocus = Array.isArray(searchParams?.focus) ? searchParams?.focus[0] : searchParams?.focus;
  const initialTld = Array.isArray(searchParams?.tld) ? searchParams?.tld[0] : searchParams?.tld;

  return (
    <>
      <JsonLd data={pricingBreadcrumbs} />
      <JsonLd data={pricingFaqSchema} />
      <PricingHubPage
        feed={feed}
        initialCategory={initialCategory}
        initialBilling={initialBilling}
        initialMode={initialMode}
        initialFocus={initialFocus}
        initialTld={initialTld}
      />
    </>
  );
}
