"use client";

import { useState } from "react";
import { ArrowRight, Check, Globe, Shield, Users, Zap, BarChart, Smartphone } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeaturedPricingWrapper } from "@/components/shared/FeaturedPricingWrapper";
import { BillingToggle } from "@/components/shared/BillingToggle";
import { useCurrency } from "@/lib/currency-context";
import { buildCartAddUrl } from "@/lib/whmcs";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Tilt, TiltContent } from "@/components/animate-ui/primitives/effects/tilt";

/* ── Pricing data — live from WHMCS ────────────────────────── */
const plans = [
  {
    name: "RSL Starter",
    audience: "Freelancers and consultants",
    monthly: { usd: 5.39,  ngn: 7499,  gbp: 3.97  },
    annual:  { usd: 4.15,  ngn: 5658,  gbp: 3.25  },
    renewal: "Renews at $5.39/mo after the first term.",
    features: [
      "20 cPanel accounts",
      "50 GB SSD storage",
      "White-label nameservers",
      "Free SSL per account",
      "WHMCS client portal",
    ],
    pid: "263",
    featured: false,
  },
  {
    name: "RSL Lite",
    audience: "Growing agencies",
    monthly: { usd: 14.30, ngn: 10999, gbp: 10.23 },
    annual:  { usd: 10.01, ngn: 7699,  gbp: 7.16  },
    renewal: "Renews at $14.30/mo after the first term.",
    features: [
      "50 cPanel accounts",
      "150 GB SSD storage",
      "White-label nameservers",
      "Free SSL per account",
      "WHMCS client portal",
    ],
    pid: "9",
    featured: false,
  },
  {
    name: "RSL Grow",
    audience: "Established agencies",
    monthly: { usd: 20.28, ngn: 15599, gbp: 14.51 },
    annual:  { usd: 14.20, ngn: 10919, gbp: 10.16 },
    renewal: "Renews at $20.28/mo after the first term.",
    features: [
      "100 cPanel accounts",
      "250 GB SSD storage",
      "White-label nameservers",
      "Mobile billing app",
      "Priority support",
    ],
    pid: "10",
    featured: true,
  },
  {
    name: "RSL Enterprise",
    audience: "Large agencies and reseller businesses",
    monthly: { usd: 28.60, ngn: 21999, gbp: 20.46 },
    annual:  { usd: 20.02, ngn: 15399, gbp: 14.32 },
    renewal: "Renews at $28.60/mo after the first term.",
    features: [
      "Unlimited cPanel accounts",
      "400 GB SSD storage",
      "White-label everything",
      "Mobile billing app",
      "Dedicated account manager",
    ],
    pid: "35",
    featured: false,
  },
];

const features = [
  {
    icon: Globe,
    title: "Private nameservers",
    description: "Your brand. Your nameservers. Clients never see 'OneNet Servers': they see your company name throughout.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Smartphone,
    title: "Mobile billing app",
    description: "Manage your clients, view invoices, and handle renewals from your phone. White-labelled under your brand.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Shield,
    title: "WHMCS client portal",
    description: "Full billing automation, client management, and support ticketing, all set up under your domain and brand.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: Zap,
    title: "LiteSpeed for all accounts",
    description: "Every cPanel account under your reseller gets LiteSpeed performance and CloudLinux isolation, same as our premium plans.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: BarChart,
    title: "WHM reseller dashboard",
    description: "Full Web Host Manager access. Create accounts, set resource limits, monitor usage, and manage packages, all from WHM.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Users,
    title: "Free migration for your clients",
    description: "When you sign a client who wants to move hosts, we handle the technical migration at no charge to you or your client.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
];

const faqs = [
  {
    q: "Will my clients know I'm using OneNet Servers?",
    a: "Not unless you tell them. Private nameservers, white-label WHMCS, and a white-label client portal all carry your brand. From your client's perspective, they are dealing with your hosting company.",
  },
  {
    q: "What does the mobile billing app look like?",
    a: "The mobile app is a white-labelled version of our client billing system. You provide your logo and brand colour, and the app is published under your company name. Available on iOS and Android.",
  },
  {
    q: "Can I set my own prices?",
    a: "Yes, completely. You set your own prices in WHMCS, invoice your clients independently, and keep the margin. We charge you the wholesale reseller rate; everything above that is yours.",
  },
  {
    q: "Do I need technical hosting knowledge?",
    a: "Some familiarity with cPanel and DNS is helpful but not required. We provide onboarding documentation, and our team is available 24/7 for technical questions. Many of our resellers are designers and digital marketers who want to offer hosting as an add-on service.",
  },
  {
    q: "What if I need more accounts than the plan includes?",
    a: "You can upgrade your plan at any time. On the Reseller Pro plan, accounts are unlimited. You can also request a custom enterprise reseller arrangement if your volume is significant.",
  },
];

export default function ResellerPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { currency } = useCurrency();

  function showPrice(p: { usd: number; ngn: number; gbp: number }) {
    if (currency === "NGN") return `₦${Math.round(p.ngn).toLocaleString("en-US")}`;
    if (currency === "GBP") return `£${p.gbp.toFixed(2)}`;
    return `$${p.usd.toFixed(2)}`;
  }

  return (
    <main className="page-shell hosting-page hosting-reseller-page">
      {/* ── Hero ── */}
      <section className="wh-hero">
        <div className="shell">
          <Fade inView inViewOnce className="wh-hero__inner">
            <div className="wh-trust-strip">
              <Slides inView inViewOnce direction="up" holdDelay={60}>
                {["White-label", "WHM + WHMCS", "Private Nameservers", "Mobile Billing App", "LiteSpeed"].map((item) => (
                  <span key={item} className="wh-trust-badge">{item}</span>
                ))}
              </Slides>
            </div>
            <h1>Launch your hosting brand.<br />We handle the infrastructure.</h1>
            <p className="hero-sub">
              White-label hosting with WHM, WHMCS, private nameservers, and a mobile billing app
              under your brand. Starting from {showPrice(plans[0].monthly)}/mo.
            </p>
            <div className="hero-actions">
              <a href={buildCartAddUrl((plans.find((plan) => plan.featured) ?? plans[0]).pid, billing, currency)} className="wh-btn-primary">
                Start reselling <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>30-day money-back</span>
              <span>White-label from day one</span>
              <span>Free migration included</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="homepage-section" id="plans">
        <div className="shell">
          <SectionHeader
            eyebrow="Pricing"
            title="Your infrastructure. Your margin."
            lead="All plans include white-label nameservers, WHMCS, and a 30-day money-back guarantee."
            centered
          />
          <BillingToggle billing={billing} onChange={setBilling} savingsText="Save up to 35% · +2 months free" />

          <div className="pricing-grid wh-pricing-grid">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {plans.map((plan) =>
                plan.featured ? (
                  <FeaturedPricingWrapper key={plan.name}>
                    <div className="pricing-card pricing-card--featured pricing-card--mui-inner">

                      <div><h3>{plan.name}</h3><p>{plan.audience}</p></div>
                      <div className="pricing-card__price">
                        <strong>{showPrice(billing === "annual" ? plan.annual : plan.monthly)}</strong>
                        <span>{billing === "annual" ? "/mo billed annually" : "/mo"}</span>
                      </div>
                      <p className="pricing-card__renewal">{plan.renewal}</p>
                      <ul className="wh-features-list">
                        {plan.features.map((f) => (<li key={f}><Check size={14} className="wh-check-icon" />{f}</li>))}
                        <li><Check size={14} className="wh-check-icon" /><span className="wh-mbg-badge">30-day MBG</span></li>
                      </ul>
                      <a href={buildCartAddUrl(plan.pid, billing, currency)} className="wh-card-cta wh-card-cta--featured">Start reselling</a>
                    </div>
                  </FeaturedPricingWrapper>
                ) : (
                  <div key={plan.name} className="pricing-card">
                    <div><h3>{plan.name}</h3><p>{plan.audience}</p></div>
                    <div className="pricing-card__price">
                      <strong>{showPrice(billing === "annual" ? plan.annual : plan.monthly)}</strong>
                      <span>{billing === "annual" ? "/mo billed annually" : "/mo"}</span>
                    </div>
                    <p className="pricing-card__renewal">{plan.renewal}</p>
                    <ul className="wh-features-list">
                      {plan.features.map((f) => (<li key={f}><Check size={14} className="wh-check-icon" />{f}</li>))}
                      <li><Check size={14} className="wh-check-icon" /><span className="wh-mbg-badge">30-day MBG</span></li>
                    </ul>
                    <a href={buildCartAddUrl(plan.pid, billing, currency)} className="wh-card-cta">Start reselling</a>
                  </div>
                )
              )}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader eyebrow="What you get" title="Everything a real hosting business needs." centered />
          <div className="wh-features-grid">
            <Slides inView inViewOnce direction="up" holdDelay={70}>
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <Tilt key={feat.title}>
                    <TiltContent>
                      <div className="wh-feature-card">
                        <div className="wh-feature-icon" style={{ background: feat.bg, color: feat.color }}>
                          <Icon size={20} />
                        </div>
                        <h3>{feat.title}</h3>
                        <p>{feat.description}</p>
                      </div>
                    </TiltContent>
                  </Tilt>
                );
              })}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader eyebrow="Questions" title="Reseller questions answered." centered />
          <Fade inView inViewOnce>
            <div className="wh-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`wh-faq-item${openFaq === i ? " wh-faq-item--open" : ""}`}>
                  <button className="wh-faq-trigger" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                    {faq.q}
                    <span className="wh-faq-chevron" aria-hidden="true">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && <div className="wh-faq-answer"><p>{faq.a}</p></div>}
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="homepage-section wh-cta-section">
        <div className="shell">
          <Fade inView inViewOnce>
            <div className="wh-cta-box">
              <h2>Your brand. Our infrastructure. Start today.</h2>
              <p>30-day money-back guarantee. White-label from day one. Free migration.</p>
              <a href={buildCartAddUrl((plans.find((plan) => plan.featured) ?? plans[0]).pid, billing, currency)} className="wh-btn-primary">
                Start reselling <ArrowRight size={16} />
              </a>
              <div className="hero-reassurance">
                <span>30-day money-back</span>
                <span>White-label nameservers</span>
                <span>Mobile billing app</span>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
