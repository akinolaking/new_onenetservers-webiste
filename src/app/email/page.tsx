"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, Video, MessageSquare, Users, Shield, Globe } from "lucide-react";
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
    name: "Business Starter",
    audience: "Solo professionals",
    monthly: { usd: 2.33,  ngn: 2899,  gbp: 1.79  },
    annual:  { usd: 1.80,  ngn: 2240,  gbp: 1.38  },
    renewal: "Renews at $2.33/mo after the first term.",
    features: [
      "5 email addresses",
      "10 GB mailbox storage",
      "CrossBox webmail",
      "Mobile app (iOS & Android)",
      "Free SSL / TLS encryption",
      "Spam and malware filter",
    ],
    pid: "262",
    featured: false,
  },
  {
    name: "Business Lite",
    audience: "Teams and growing brands",
    monthly: { usd: 7.80,  ngn: 5999,  gbp: 5.58  },
    annual:  { usd: 5.46,  ngn: 4199,  gbp: 3.91  },
    renewal: "Renews at $7.80/mo after the first term.",
    features: [
      "25 email addresses",
      "25 GB mailbox storage",
      "CrossBox + video calls built in",
      "Team chat and file sharing",
      "Shared calendars",
      "Custom domain alias support",
    ],
    pid: "130",
    featured: true,
  },
  {
    name: "Business Pro",
    audience: "Mid-size teams",
    monthly: { usd: 10.40, ngn: 7999,  gbp: 7.44  },
    annual:  { usd: 7.28,  ngn: 5599,  gbp: 5.21  },
    renewal: "Renews at $10.40/mo after the first term.",
    features: [
      "50 email addresses",
      "30 GB mailbox storage per address",
      "CrossBox + video calls built in",
      "Team chat and file sharing",
      "Priority support (<2hr SLA)",
      "Custom domain alias support",
    ],
    pid: "131",
    featured: false,
  },
  {
    name: "Business Pro Plus",
    audience: "Large teams and organisations",
    monthly: { usd: 15.60, ngn: 11999, gbp: 11.16 },
    annual:  { usd: 10.92, ngn: 8399,  gbp: 7.81  },
    renewal: "Renews at $15.60/mo after the first term.",
    features: [
      "100 email addresses",
      "50 GB mailbox storage per address",
      "Full CrossBox suite",
      "Priority support (<1hr SLA)",
      "Admin portal and audit logs",
      "GDPR-compliant data residency",
    ],
    pid: "132",
    featured: false,
  },
];

const features = [
  {
    icon: Mail,
    title: "Your name. Your domain.",
    description: "hello@yourbusiness.com, not @gmail or @yahoo. Professional email on your own domain builds trust from the first message.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Video,
    title: "Video calls built in",
    description: "No Zoom link required. CrossBox includes video conferencing directly in your inbox: one less subscription, one less tab.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: MessageSquare,
    title: "Team chat included",
    description: "Real-time messaging, file sharing, and channels for your team, without leaving your email workspace.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: Users,
    title: "Flat pricing. No per-user trap.",
    description: "5 to 100 addresses on one monthly plan. Add team members without watching your bill multiply.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Shield,
    title: "Spam and malware blocked",
    description: "Enterprise-grade filtering catches threats before they reach your inbox. Reputation-based rules updated in real time.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Globe,
    title: "Works anywhere",
    description: "CrossBox webmail, native iOS and Android apps, and full IMAP/POP3 support for any email client you already use.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
];

const faqs = [
  {
    q: "Can I use my own domain with OneNet Servers email?",
    a: "Yes. You can use any domain you own, whether registered with us or elsewhere. We walk you through the DNS setup, or our team can do it for you at no extra charge.",
  },
  {
    q: "What is CrossBox?",
    a: "CrossBox is the professional email and collaboration platform included with all OneNet Servers email plans. It includes webmail, mobile apps, video conferencing, team chat, and shared file storage, all accessible from a single login.",
  },
  {
    q: "Is the flat pricing really all-inclusive?",
    a: "Yes. The monthly fee covers all the addresses shown on your plan. You do not pay extra per user, per mailbox, or per feature. Storage is per-address on Enterprise; shared on Starter and Business.",
  },
  {
    q: "Can I migrate email from Gmail or another host?",
    a: "Yes, free migration for all plans. Our team handles the IMAP migration, folder structure, and DNS cutover so your email history arrives intact before any downtime.",
  },
  {
    q: "Do you offer email-only plans (without hosting)?",
    a: "Yes. Business email is a standalone product. You do not need to have web hosting with us to use our email service.",
  },
];

export default function EmailPage() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { currency } = useCurrency();

  function showPrice(p: { usd: number; ngn: number; gbp: number }) {
    if (currency === "NGN") return `₦${Math.round(p.ngn).toLocaleString("en-US")}`;
    if (currency === "GBP") return `£${p.gbp.toFixed(2)}`;
    return `$${p.usd.toFixed(2)}`;
  }

  return (
    <main className="page-shell">
      {/* ── Hero ── */}
      <section className="wh-hero">
        <div className="shell">
          <Fade inView inViewOnce className="wh-hero__inner">
            <div className="wh-trust-strip">
              <Slides inView inViewOnce direction="up" holdDelay={60}>
                {["CrossBox", "Video Calls", "Team Chat", "No Per-User Fees", "Free Migration"].map((item) => (
                  <span key={item} className="wh-trust-badge">{item}</span>
                ))}
              </Slides>
            </div>
            <h1>Business email that earns trust.</h1>
            <p className="hero-sub">
              Your name on your domain. 5–100 addresses on one plan. Video calls, team chat, and
              shared storage, all included. Starting from {showPrice(plans[0].monthly)}/mo.
            </p>
            <div className="hero-actions">
              <a href={buildCartAddUrl((plans.find((plan) => plan.featured) ?? plans[0]).pid, billing, currency)} className="wh-btn-primary">
                Get started <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-reassurance">
              <span>30-day money-back</span>
              <span>Free migration included</span>
              <span>No per-user fees</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="homepage-section" id="plans">
        <div className="shell">
          <SectionHeader
            eyebrow="Pricing"
            title="One flat fee. Every address included."
            lead="No per-user charges. No surprise renewal spike. All plans include a 30-day money-back guarantee."
            centered
          />

          <BillingToggle
            billing={billing}
            onChange={setBilling}
            savingsText="Save up to 35% · +2 months free"
          />

          <div className="pricing-grid wh-pricing-grid">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {plans.map((plan) =>
                plan.featured ? (
                  <FeaturedPricingWrapper key={plan.name}>
                    <div className="pricing-card pricing-card--featured pricing-card--mui-inner">
                      <div>
                        <h3>{plan.name}</h3>
                        <p>{plan.audience}</p>
                      </div>
                      <div className="pricing-card__price">
                        <strong>{showPrice(billing === "annual" ? plan.annual : plan.monthly)}</strong>
                        <span>{billing === "annual" ? "/mo billed annually" : "/mo"}</span>
                      </div>
                      <p className="pricing-card__renewal">{plan.renewal}</p>
                      <ul className="wh-features-list">
                        {plan.features.map((f) => (
                          <li key={f}><Check size={14} className="wh-check-icon" />{f}</li>
                        ))}
                        <li><Check size={14} className="wh-check-icon" /><span className="wh-mbg-badge">30-day MBG</span></li>
                      </ul>
                      <a href={buildCartAddUrl(plan.pid, billing, currency)} className="wh-card-cta wh-card-cta--featured">
                        Get started
                      </a>
                    </div>
                  </FeaturedPricingWrapper>
                ) : (
                  <div key={plan.name} className="pricing-card">
                    <div>
                      <h3>{plan.name}</h3>
                      <p>{plan.audience}</p>
                    </div>
                    <div className="pricing-card__price">
                      <strong>{showPrice(billing === "annual" ? plan.annual : plan.monthly)}</strong>
                      <span>{billing === "annual" ? "/mo billed annually" : "/mo"}</span>
                    </div>
                    <p className="pricing-card__renewal">{plan.renewal}</p>
                    <ul className="wh-features-list">
                      {plan.features.map((f) => (
                        <li key={f}><Check size={14} className="wh-check-icon" />{f}</li>
                      ))}
                      <li><Check size={14} className="wh-check-icon" /><span className="wh-mbg-badge">30-day MBG</span></li>
                    </ul>
                    <a href={buildCartAddUrl(plan.pid, billing, currency)} className="wh-card-cta">
                      Get started
                    </a>
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
          <SectionHeader eyebrow="What's included" title="More than just email." centered />
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
          <SectionHeader eyebrow="Questions" title="Email questions answered." centered />
          <Fade inView inViewOnce>
            <div className="wh-faq-list">
              {faqs.map((faq, i) => (
                <div key={i} className={`wh-faq-item${openFaq === i ? " wh-faq-item--open" : ""}`}>
                  <button
                    className="wh-faq-trigger"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
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
              <h2>Professional email. First impression every time.</h2>
              <p>30-day money-back guarantee. Free migration. No per-user fees.</p>
              <a href={buildCartAddUrl((plans.find((plan) => plan.featured) ?? plans[0]).pid, billing, currency)} className="wh-btn-primary">
                Get started free <ArrowRight size={16} />
              </a>
              <div className="hero-reassurance">
                <span>30-day money-back</span>
                <span>Free migration</span>
                <span>No per-user fees</span>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
