"use client";

import { useState } from "react";
import Link from "next/link";
import { pricingCategories } from "@/lib/home-data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { BillingToggle } from "@/components/shared/BillingToggle";
import { useCurrency } from "@/lib/currency-context";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { buildCartAddUrl } from "@/lib/whmcs";

type BillingMode = "monthly" | "annual";
type CategoryKey = typeof pricingCategories[number]["key"];

export function PricingPreview() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>(pricingCategories[0].key);
  const [billing, setBilling] = useState<BillingMode>("monthly");
  const { currency } = useCurrency();

  const category =
    pricingCategories.find((item) => item.key === activeCategory) ?? pricingCategories[0];

  function pickPrice(obj: { USD: string; NGN: string; GBP: string }): string {
    const raw = currency === "NGN" ? obj.NGN : currency === "GBP" ? obj.GBP : obj.USD;
    return raw.split("/")[0];
  }

  return (
    <section className="homepage-section shell" id="plans">
      <SectionHeader
        eyebrow="Pricing"
        title="Plans for every stage of growth."
        lead="All plans include free SSL, daily backups, free domain migration, and 24/7 support. No hidden fees."
        centered
      />

      <div className="pricing-proof">
        <div className="pricing-proof__avatars" aria-hidden="true">
          <span>AO</span>
          <span>TC</span>
          <span>SB</span>
          <span>+</span>
        </div>
        <p>★★★★★ Trusted by 500+ businesses across Nigeria, the UK, and beyond.</p>
      </div>

      <BillingToggle
        billing={billing}
        onChange={setBilling}
        savingsText="Save up to 35% · +2 months free"
      />

      <div className="pricing-tabs">
        {pricingCategories.map((item) => (
          <button
            key={item.key}
            type="button"
            className={item.key === activeCategory ? "is-active" : ""}
            onClick={() => setActiveCategory(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="pricing-grid">
        {category.plans.map((plan, i) => {
          const priceObj = billing === "monthly" ? plan.monthly : plan.annual;
          const suffix = (activeCategory as string) === "domains" ? "/yr" : "/mo";
          const isFeatured = "featured" in plan && (plan as { featured?: boolean }).featured;

          return (
            <Fade key={plan.name} inView inViewOnce delay={i * 0.07}>
              <div className={`pricing-card${isFeatured ? " pricing-card--featured" : ""}`}>
                {isFeatured && (
                  <span className="pricing-card__badge">Most popular</span>
                )}
                <article>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  <div className="pricing-card__price">
                    <strong>{pickPrice(priceObj)}{suffix}</strong>
                  </div>
                  <p className="pricing-card__renewal">{plan.renewal}</p>
                  <Link
                    href={activeCategory === "domains"
                      ? "/pricing?category=domains"
                      : activeCategory === "wordpress"
                        ? `/pricing?category=wordpress-hosting&billing=${billing}`
                        : activeCategory === "vps"
                          ? `/pricing?category=vps-hosting&billing=${billing}`
                          : `/pricing?category=web-hosting&billing=${billing}`}
                    className="pricing-card__cta"
                  >
                    Get started →
                  </Link>
                </article>
              </div>
            </Fade>
          );
        })}
      </div>
    </section>
  );
}
