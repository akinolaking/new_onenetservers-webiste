"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Check, Globe2, LifeBuoy, ShieldCheck, Sparkles } from "lucide-react";

import { BillingToggle } from "@/components/shared/BillingToggle";
import { FeaturedPricingWrapper } from "@/components/shared/FeaturedPricingWrapper";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useBilling } from "@/lib/billing-context";
import { useCurrency } from "@/lib/currency-context";
import { buildPricingHubUrl, type PricingHubBilling, type PricingHubCategory, type PricingHubDomainMode } from "@/lib/pricing-hub";
import { buildCartAddUrl, buildWhmcsUrl, whmcsCurrencyId } from "@/lib/whmcs";

type CurrencyCode = "NGN" | "GBP" | "USD";

type ProductPlan = {
  kind: "product";
  pid: string;
  name: string;
  summary: string;
  features: string[];
  featured?: boolean;
  badge?: string | null;
  monthly: Record<CurrencyCode, number>;
  annual: Record<CurrencyCode, number>;
};

type DomainPlan = {
  kind: "domain";
  ext: string;
  name: string;
  summary: string;
  features: string[];
  featured?: boolean;
  badge?: string | null;
  register: Record<CurrencyCode, number>;
  transfer: Record<CurrencyCode, number>;
  renew: Record<CurrencyCode, number>;
};

type PricingCategoryData = {
  key: PricingHubCategory;
  label: string;
  eyebrow: string;
  title: string;
  lead: string;
  supportsMonthly: boolean;
  benefits: string[];
  plans: Array<ProductPlan | DomainPlan>;
};

type PricingFeed = {
  generatedAt: string;
  currencies: CurrencyCode[];
  categories: PricingCategoryData[];
};

type PricingHubPageProps = {
  feed: PricingFeed;
  initialCategory: PricingHubCategory;
  initialBilling: PricingHubBilling;
  initialMode: PricingHubDomainMode;
  initialFocus?: string;
  initialTld?: string;
};

const categoryDescriptions: Record<PricingHubCategory, { tabLabel: string; microcopy: string }> = {
  "wordpress-hosting": { tabLabel: "WordPress Hosting", microcopy: "Managed WordPress with AI assistance and a cleaner launch path." },
  "web-hosting": { tabLabel: "Web Hosting", microcopy: "Shared hosting that stays stable when traffic shows up." },
  "reseller-hosting": { tabLabel: "Reseller Hosting", microcopy: "White-label hosting for your own client-facing brand." },
  domains: { tabLabel: "Domains", microcopy: "Register or transfer the extensions that match your market." },
  "vps-hosting": { tabLabel: "VPS Hosting", microcopy: "Root access, unlimited bandwidth, and room for serious workloads." },
  "business-email": { tabLabel: "Business Email", microcopy: "CrossBox mailboxes with collaboration built in." },
  security: { tabLabel: "OneGuard Security", microcopy: "Always-on website protection beyond a basic SSL padlock." },
};

const faqByCategory: Record<PricingHubCategory, Array<{ q: string; a: string }>> = {
  "wordpress-hosting": [
    { q: "Can you move my existing WordPress site?", a: "Yes. We handle the migration path for existing WordPress sites, including files, database, and cutover guidance so you do not have to rebuild from scratch." },
    { q: "What is the difference between monthly and annual on this page?", a: "Monthly shows the live WHMCS month-to-month rate. Annual shows the current yearly total expressed as a monthly equivalent so you can compare value without opening checkout first." },
    { q: "Is this page only for comparison or can I buy from here?", a: "You can go straight into checkout from any plan card. The page is designed to let you compare first and commit only when the plan, currency, and billing cycle are clear." },
  ],
  "web-hosting": [
    { q: "What do these shared hosting plans already include?", a: "The plans on this page already account for essentials like SSL, backups, and isolated hosting resources. The card feature lists show what changes as you move from one tier to the next." },
    { q: "Which web hosting plan is the right starting point?", a: "Starter works for single-site launches, Lite suits growing business sites, Premium fits busier websites, and Ultimate is the better choice once you are running heavier traffic or multiple active projects." },
    { q: "Will I land in the correct product at checkout?", a: "Yes. Each button passes the exact plan and billing choice into WHMCS so the product you selected here is the one that opens in checkout." },
  ],
  "reseller-hosting": [
    { q: "Who are these reseller plans meant for?", a: "They are built for agencies, freelancers, and hosting resellers who need private nameservers, client account separation, and a cleaner way to package hosting under their own brand." },
    { q: "Does this include the tools needed to resell hosting professionally?", a: "The hosting plans are the core of the reseller offer. Compatibility notes, account limits, and provisioning-related features are shown on the cards so you can compare the tiers before checkout." },
    { q: "Can I compare reseller tiers without opening multiple product pages?", a: "Yes. That is the point of this hub. You can stay on one screen, compare capacity and positioning, then go straight into the exact tier you want." },
  ],
  domains: [
    { q: "Why are domain prices shown yearly?", a: "Domain registrations, transfers, and renewals are billed annually at the registry level, so the domain section stays focused on yearly pricing." },
    { q: "Can I compare registration and transfer pricing here?", a: "Yes. Use the register and transfer toggle above the domain cards to switch between the two pricing views without leaving the page." },
    { q: "What if the extension I want is not in the first few cards?", a: "This page highlights the extensions currently mapped into the live pricing feed. If you already know the exact name you want, you can still continue to the domain search flow for a direct lookup." },
  ],
  "vps-hosting": [
    { q: "Are these VPS plans suitable for production workloads?", a: "Yes. These plans are positioned for serious application hosting, automation, container workloads, and custom server setups where root access and stronger resource control matter." },
    { q: "What does annual pricing mean for VPS?", a: "The annual view shows the live yearly total translated into a monthly comparison figure. It helps you judge long-term value before you move into the billing flow." },
    { q: "Can I still choose my preferred billing cycle at checkout?", a: "Yes. The billing selection on this page is passed into WHMCS so the checkout flow opens with the same cycle you selected here." },
  ],
  "business-email": [
    { q: "Are these plans for a single mailbox or for a team?", a: "These are business email plans, not one-off mailbox prices. Each card shows the mailbox allowances and collaboration scope so you can choose based on team size and how you work." },
    { q: "Can I buy email without buying hosting first?", a: "Yes. Business email is available as its own service and can go directly into checkout without requiring a hosting plan first." },
    { q: "What makes these plans different from a basic mailbox product?", a: "The business email plans are intended for branded communication, team collaboration, and day-to-day operations rather than just sending and receiving mail from a single inbox." },
  ],
  security: [
    { q: "Why are there three OneGuard plans here?", a: "The security section is structured around three protection levels so you can choose basic coverage, stronger ongoing protection, or the highest-response tier depending on the website you are protecting." },
    { q: "Is OneGuard only for hacked websites?", a: "No. OneGuard is meant for prevention as well as response. The differences between the tiers are about how much monitoring, cleanup cover, backup frequency, and protection depth you need." },
    { q: "Can I go straight from comparison to checkout for OneGuard?", a: "Yes. Each OneGuard card links directly into the matching WHMCS product so you can choose the protection level here and continue immediately." },
  ],
};

function formatMoney(currency: CurrencyCode, amount: number) {
  if (currency === "NGN") return `₦${Math.round(amount).toLocaleString("en-NG")}`;
  if (currency === "GBP") return `£${amount.toFixed(2)}`;
  return `$${amount.toFixed(2)}`;
}

function normaliseCategory(feed: PricingFeed, value: string | undefined): PricingHubCategory {
  const available = new Set(feed.categories.map((category) => category.key));
  if (value && available.has(value as PricingHubCategory)) return value as PricingHubCategory;
  return feed.categories[0]?.key ?? "web-hosting";
}

export function PricingHubPage({ feed, initialCategory, initialBilling, initialMode, initialFocus, initialTld }: PricingHubPageProps) {
  const { currency } = useCurrency();
  const { billing, setBilling } = useBilling();
  const [activeCategory, setActiveCategory] = useState<PricingHubCategory>(() => normaliseCategory(feed, initialCategory));
  const [domainMode, setDomainMode] = useState<PricingHubDomainMode>(initialMode);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setActiveCategory(normaliseCategory(feed, initialCategory));
  }, [feed, initialCategory]);

  useEffect(() => {
    setDomainMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    setBilling(initialBilling);
    // Sync from the server-provided query value only when that query value changes.
    // The provider setter is intentionally omitted because its identity is not stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialBilling]);

  const selectedCategory = useMemo(
    () => feed.categories.find((category) => category.key === activeCategory) ?? feed.categories[0],
    [activeCategory, feed.categories]
  );

  const activeFaqs = faqByCategory[selectedCategory.key] ?? [];
  const selectedTabCopy = categoryDescriptions[selectedCategory.key];

  function updateUrl(nextCategory: PricingHubCategory, options?: { mode?: PricingHubDomainMode; focus?: string; tld?: string; billing?: PricingHubBilling }) {
    if (typeof window === "undefined") return;
    const href = buildPricingHubUrl({
      category: nextCategory,
      billing: options?.billing ?? billing,
      mode: options?.mode ?? (nextCategory === "domains" ? domainMode : undefined),
      focus: options?.focus,
      tld: options?.tld,
    });
    window.history.replaceState({}, "", href);
  }

  function onCategoryClick(nextCategory: PricingHubCategory) {
    setActiveCategory(nextCategory);
    setOpenFaq(0);
    updateUrl(nextCategory, nextCategory === "domains" ? { mode: domainMode, tld: initialTld, focus: initialTld } : undefined);
  }

  function getProductCardMeta(plan: ProductPlan) {
    const liveMonthly = Math.max(0, plan.monthly[currency as CurrencyCode] ?? 0);
    const liveAnnualTotal = Math.max(0, plan.annual[currency as CurrencyCode] ?? 0);
    const categorySupportsMonthly = selectedCategory.supportsMonthly;
    const effectiveBilling: PricingHubBilling = categorySupportsMonthly ? billing : "annual";
    const annualPerMonth = liveAnnualTotal > 0 ? liveAnnualTotal / 12 : 0;
    const current = effectiveBilling === "annual"
      ? (categorySupportsMonthly ? annualPerMonth : liveAnnualTotal)
      : liveMonthly;
    const original = categorySupportsMonthly && effectiveBilling === "annual" && annualPerMonth > 0 && annualPerMonth < liveMonthly
      ? liveMonthly
      : null;
    const savingsPercent = original ? Math.round(((original - annualPerMonth) / original) * 100) : null;
    return {
      current,
      original,
      savingsPercent,
      unitLabel: categorySupportsMonthly ? "/mo" : "/yr",
      subcopy: categorySupportsMonthly
        ? effectiveBilling === "annual"
          ? `Billed annually at ${formatMoney(currency as CurrencyCode, liveAnnualTotal)}.`
          : "Pay month to month with the live monthly cycle."
        : `Annual plan. Renews at ${formatMoney(currency as CurrencyCode, liveAnnualTotal)}/yr.`,
      ctaHref: buildCartAddUrl(plan.pid, effectiveBilling, currency),
      isAvailable: current > 0,
    };
  }

  function getDomainCardMeta(plan: DomainPlan) {
    const current = Math.max(0, (domainMode === "transfer" ? plan.transfer : plan.register)[currency as CurrencyCode] ?? 0);
    return {
      current,
      renew: Math.max(0, plan.renew[currency as CurrencyCode] ?? 0),
      ctaHref: buildWhmcsUrl("/cart.php", {
        a: "add",
        domain: "",
        domainaction: domainMode,
        sld: "",
        tld: plan.ext,
        currency: whmcsCurrencyId(currency),
      }),
      isAvailable: current > 0,
    };
  }

  return (
    <main className="page-shell pricing-hub-page">
      <section className="pricing-hub-hero">
        <div className="shell pricing-hub-hero__shell">
          <div className="pricing-hub-hero__copy">
            <p className="pricing-hub-hero__eyebrow">Pricing hub</p>
            <h1>Choose your hosting. Get online today.</h1>
            <p className="pricing-hub-hero__lead">
              Compare live pricing across hosting, domains, email, VPS, and security in one place,
              then move into checkout with the same currency and billing cycle you selected here.
            </p>
          </div>

          <div className="pricing-hub-switcher pricing-hub-mobile-switcher">
            <label className="sr-only" htmlFor="pricing-hub-category-select">Choose a service category</label>
            <select
              id="pricing-hub-category-select"
              value={activeCategory}
              onChange={(event) => onCategoryClick(event.target.value as PricingHubCategory)}
              aria-label="Choose a service category"
            >
              {feed.categories.map((category) => (
                <option key={category.key} value={category.key}>
                  {categoryDescriptions[category.key]?.tabLabel ?? category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="pricing-hub-pills" role="tablist" aria-label="Pricing categories">
            {feed.categories.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`pricing-hub-pill${category.key === activeCategory ? " pricing-hub-pill--active" : ""}`}
                role="tab"
                aria-selected={category.key === activeCategory}
                onClick={() => onCategoryClick(category.key)}
              >
                {categoryDescriptions[category.key]?.tabLabel ?? category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-section pricing-hub-stage">
        <div className="shell">
          <SectionHeader eyebrow={selectedCategory.eyebrow} title={selectedCategory.title} lead={selectedCategory.lead} centered />

          <div className="pricing-hub-benefits" aria-label="Pricing page benefits">
            <span><BadgeCheck size={15} /> {selectedCategory.benefits[0]}</span>
            <span><LifeBuoy size={15} /> {selectedCategory.benefits[1]}</span>
            <span><ShieldCheck size={15} /> {selectedCategory.benefits[2]}</span>
          </div>

          {selectedCategory.key === "domains" ? (
            <div className="pricing-hub-domain-mode-wrap">
              <div className="billing-toggle">
                <div className="billing-tabs" aria-label="Domain pricing mode">
                  <button type="button" className={domainMode === "register" ? "is-active" : ""} aria-pressed={domainMode === "register"} onClick={() => { setDomainMode("register"); updateUrl("domains", { mode: "register" }); }}>
                    Register
                  </button>
                  <button type="button" className={domainMode === "transfer" ? "is-active" : ""} aria-pressed={domainMode === "transfer"} onClick={() => { setDomainMode("transfer"); updateUrl("domains", { mode: "transfer" }); }}>
                    Transfer
                  </button>
                </div>
                <span className="wh-savings-badge">Domains renew annually. Prices below are yearly live rates.</span>
              </div>
            </div>
          ) : selectedCategory.supportsMonthly ? (
            <BillingToggle
              billing={billing}
              onChange={(next) => {
                setBilling(next);
                updateUrl(activeCategory, { billing: next });
              }}
              savingsText="Annual pricing shows the live yearly total as a monthly equivalent."
            />
          ) : (
            <div className="pricing-hub-annual-only">
              <span className="wh-savings-badge">This category is billed annually. Prices below are live annual rates.</span>
            </div>
          )}

          <div className="pricing-hub-context">
            <p>{selectedTabCopy.microcopy}</p>
          </div>

          <div className="pricing-grid wh-pricing-grid pricing-hub-grid">
            {selectedCategory.plans.map((plan) => {
              const isFocused = initialFocus && ((plan.kind === "product" && plan.pid === initialFocus) || (plan.kind === "domain" && (plan.ext === initialFocus || plan.ext === initialTld)));
              const cardClass = `pricing-card pricing-hub-card${isFocused ? " pricing-hub-card--focused" : ""}`;

              if (plan.kind === "domain") {
                const meta = getDomainCardMeta(plan);
                if (!meta.isAvailable) return null;
                const body = (
                  <div className={cardClass}>
                    <div className="pricing-hub-card__topline">
                      <span className="pricing-hub-card__type">{domainMode === "transfer" ? "Transfer" : "Register"}</span>
                      {plan.badge ? <span className="pricing-hub-card__mini-badge">{plan.badge}</span> : null}
                    </div>
                    <div>
                      <h3>{plan.name}</h3>
                      <p>{plan.summary}</p>
                    </div>
                    <div className="pricing-card__price pricing-hub-priceblock">
                      <div>
                        <strong>{formatMoney(currency as CurrencyCode, meta.current)}</strong>
                        <span>/yr</span>
                      </div>
                    </div>
                    <p className="pricing-card__renewal">Renews at {formatMoney(currency as CurrencyCode, meta.renew)}/yr where the registry applies the standard renewal rate.</p>
                    <ul className="wh-features-list">
                      {plan.features.map((feature) => (
                        <li key={feature}><Check size={14} className="wh-check-icon" />{feature}</li>
                      ))}
                    </ul>
                    <a href={meta.ctaHref} className={plan.featured ? "wh-card-cta wh-card-cta--featured" : "wh-card-cta"}>
                      {domainMode === "transfer" ? "Transfer domain" : "Choose domain"}
                    </a>
                  </div>
                );
                return plan.featured ? <FeaturedPricingWrapper key={plan.ext} badge={plan.badge ?? "Featured"}>{body}</FeaturedPricingWrapper> : <div key={plan.ext}>{body}</div>;
              }

              const meta = getProductCardMeta(plan);
              if (!meta.isAvailable) return null;
              const body = (
                <div className={cardClass}>
                  <div className="pricing-hub-card__topline">
                    <span className="pricing-hub-card__type">{selectedCategory.label}</span>
                    {meta.savingsPercent ? (
                      <span className="pricing-hub-card__mini-badge">Save {meta.savingsPercent}%</span>
                    ) : plan.badge ? (
                      <span className="pricing-hub-card__mini-badge">{plan.badge}</span>
                    ) : null}
                  </div>
                  <div>
                    <h3>{plan.name}</h3>
                    <p>{plan.summary}</p>
                  </div>
                  <div className="pricing-card__price pricing-hub-priceblock">
                    <div>
                      {meta.original ? <span className="pricing-hub-priceblock__original">{formatMoney(currency as CurrencyCode, meta.original)}</span> : null}
                      <strong>{formatMoney(currency as CurrencyCode, meta.current)}</strong>
                      <span>{meta.unitLabel}</span>
                    </div>
                  </div>
                  <p className="pricing-card__renewal">{meta.subcopy}</p>
                  <ul className="wh-features-list">
                    {plan.features.map((feature) => (
                      <li key={feature}><Check size={14} className="wh-check-icon" />{feature}</li>
                    ))}
                  </ul>
                  <a href={meta.ctaHref} className={plan.featured ? "wh-card-cta wh-card-cta--featured" : "wh-card-cta"}>Choose plan</a>
                </div>
              );
              return plan.featured ? <FeaturedPricingWrapper key={plan.pid} badge={plan.badge ?? "Most popular"}>{body}</FeaturedPricingWrapper> : <div key={plan.pid}>{body}</div>;
            })}
          </div>

          <p className="pricing-hub-footnote">
            {selectedCategory.key === "domains"
              ? "Domain cards show live yearly register or transfer pricing from WHMCS in your selected currency."
              : selectedCategory.supportsMonthly
                ? "Annual pricing is shown as the live yearly total divided by 12 so you can compare it directly against the month-to-month rate."
                : "This category is billed annually. Prices shown are the live annual rates from WHMCS in your selected currency."}
          </p>
        </div>
      </section>

      <section className="homepage-section pricing-hub-why">
        <div className="shell">
          <SectionHeader eyebrow="Why this page exists" title="One place to compare before you commit." centered />
          <div className="pricing-hub-why__grid">
            <div className="pricing-hub-why__card">
              <Sparkles size={20} />
              <h3>Compare the real service fit</h3>
              <p>Each section is organised around what you are actually buying, so you can compare hosting, email, VPS, domains, or security without bouncing across disconnected product pages.</p>
            </div>
            <div className="pricing-hub-why__card">
              <Globe2 size={20} />
              <h3>See the live numbers before checkout</h3>
              <p>The pricing cards are tied to the live WHMCS feed, which makes this page the cleanest place to review current rates before you enter the order flow.</p>
            </div>
            <div className="pricing-hub-why__card">
              <ArrowRight size={20} />
              <h3>Move into checkout with context intact</h3>
              <p>Once you have settled on a plan, you can continue straight into the matching checkout path instead of reselecting the same service again on the next screen.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-section homepage-section--dark pricing-hub-guarantee">
        <div className="shell">
          <div className="pricing-hub-guarantee__box">
            <h2>{selectedCategory.key === "domains" ? "Registrar support that stays useful after payment" : "30-day money-back guarantee"}</h2>
            <p>
              {selectedCategory.key === "domains"
                ? "Need help with TLD choice, transfer timing, or NiRA-specific details? Start from the right extension first, then move into the registrar flow with context preserved."
                : "Buy with clarity. Compare plans, choose the billing cycle that fits, and move into checkout only after the pricing makes sense for your workload."}
            </p>
            <a href={buildPricingHubUrl({ category: activeCategory, billing, mode: activeCategory === "domains" ? domainMode : undefined })} className="wh-btn-primary">
              Stay on this category <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="homepage-section pricing-hub-faqs">
        <div className="shell">
          <SectionHeader eyebrow="FAQs" title="Questions before checkout" centered />
          <div className="wh-faq-list">
            {activeFaqs.map((faq, index) => (
              <div key={faq.q} className={`wh-faq-item${openFaq === index ? " wh-faq-item--open" : ""}`}>
                <button className="wh-faq-trigger" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>
                  {faq.q}
                  <span className="wh-faq-chevron" aria-hidden="true">{openFaq === index ? "−" : "+"}</span>
                </button>
                {openFaq === index ? <div className="wh-faq-answer"><p>{faq.a}</p></div> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
