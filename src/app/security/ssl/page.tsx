"use client";

import { useState } from "react";
import { ArrowRight, Check, Shield, Lock, Globe, Award, Zap, Eye } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeaturedPricingWrapper } from "@/components/shared/FeaturedPricingWrapper";
import { useCurrency } from "@/lib/currency-context";
import { buildCartAddUrl } from "@/lib/whmcs";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Tilt, TiltContent } from "@/components/animate-ui/primitives/effects/tilt";

/* ── Pricing data ────────────────────────────────────────────── */
const plans = [
  {
    key: "dv",
    name: "PositiveSSL",
    audience: "Personal sites and blogs",
    monthly: { usd: 1.99,  ngn: 1499,  gbp: 1.49  },
    annual:  { usd: 13.02, ngn: 10013, gbp: 9.31  },
    renewal: "Renews annually at the same rate. Cancel anytime.",
    features: [
      "256-bit encryption",
      "Free automated installation",
      "Auto-renewal available",
      "Issued within minutes",
      "Single domain",
      "Free reissues",
    ],
    pid: "19",
    featured: false,
  },
  {
    key: "dv_multidomain",
    name: "PositiveSSL Multi-Domain",
    audience: "Sites with multiple domains",
    monthly: { usd: 5.99,  ngn: 4499,  gbp: 4.29  },
    annual:  { usd: 47.69, ngn: 36688, gbp: 34.12 },
    renewal: "Renews annually at the same rate. Cancel anytime.",
    features: [
      "256-bit encryption",
      "Up to 3 domains included",
      "Free automated installation",
      "Auto-renewal available",
      "Issued within minutes",
      "Free reissues",
    ],
    pid: "21",
    featured: true,
  },
  {
    key: "ev",
    name: "BusinessTrust EV SAN",
    audience: "E-commerce and enterprise",
    monthly: { usd: 38.99,  ngn: 29999, gbp: 27.99 },
    annual:  { usd: 333.12, ngn: 256246, gbp: 238.31 },
    renewal: "Renews annually at the same rate. Cancel anytime.",
    features: [
      "256-bit encryption",
      "Full company vetting (EV)",
      "Subject Alternative Names (SAN)",
      "Issued within 5–10 business days",
      "Multiple domains supported",
      "Enterprise SLA support",
    ],
    pid: "58",
    featured: false,
  },
];

const features = [
  {
    icon: Shield,
    title: "256-bit encryption",
    description: "All certificates use 256-bit AES encryption, the same standard used by banks, governments, and global payment platforms.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Zap,
    title: "Automated installation",
    description: "We install your SSL certificate automatically in your hosting control panel. No manual configuration, no technical knowledge needed.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Globe,
    title: "Browser and device compatible",
    description: "Compatible with 99.9% of browsers and devices worldwide: Chrome, Safari, Firefox, Edge, iOS, Android. No exclusions.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: Award,
    title: "Issued by trusted CAs",
    description: "Certificates issued through globally trusted Certificate Authorities. Your visitors see a valid, trusted padlock, no browser warnings.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Lock,
    title: "Free Let's Encrypt included",
    description: "Every OneNet Servers hosting plan includes a free Let's Encrypt SSL. Paid certificates add validation depth, warranty, and OV/EV assurance.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Eye,
    title: "Warranty coverage",
    description: "Paid SSL certificates include a warranty that protects your customers if a mis-issuance causes financial loss. DV from $10k, EV up to $1.75m.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
];

const faqs = [
  {
    q: "Do I need a paid SSL if my hosting already includes a free one?",
    a: "Free Let's Encrypt certificates cover encryption, so your site gets the padlock. Paid certificates add validation depth: OV confirms your business identity, EV adds the highest trust level. For e-commerce, enterprise, or any site handling payments, a paid certificate signals a higher level of vetting to your visitors.",
  },
  {
    q: "What is the difference between DV, OV, and EV?",
    a: "DV (Domain Validation) verifies domain ownership only, fastest to issue and lowest cost. OV (Organisation Validation) verifies your business identity against public records and takes 1–3 days. EV (Extended Validation) requires the most thorough company vetting and displays maximum trust indicators in browsers, making it the standard for banking and finance.",
  },
  {
    q: "What is a Wildcard certificate?",
    a: "A Wildcard SSL covers your main domain and all subdomains at one level, e.g., *.yourdomain.com covers shop.yourdomain.com, mail.yourdomain.com, app.yourdomain.com, and any other subdomain. Instead of buying separate certificates for each subdomain, one Wildcard covers them all.",
  },
  {
    q: "How long does installation take?",
    a: "For hosting plans on our platform, SSL installation is automated and your certificate is active within minutes of issuance. If you are installing on an external server, we provide full installation guides for Apache, Nginx, cPanel, and Plesk.",
  },
  {
    q: "Does SSL affect my Google ranking?",
    a: "Yes. Google has used HTTPS as a ranking signal since 2014. Sites without SSL are marked as 'Not Secure' in Chrome, which increases bounce rate and reduces trust. An SSL certificate is a baseline requirement for any site that expects to rank.",
  },
  {
    q: "What happens when my SSL expires?",
    a: "Browsers display a security warning and your visitors are blocked from accessing your site. Enable auto-renewal in your OneNet Servers dashboard to ensure your certificate renews automatically before it expires. We also send email reminders 30, 14, and 7 days before expiry.",
  },
];

export default function SecuritySslPage() {
  const { currency } = useCurrency();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function showPrice(p: { usd: number; ngn: number; gbp: number }) {
    if (currency === "NGN") return `₦${Math.round(p.ngn).toLocaleString("en-US")}`;
    if (currency === "GBP") return `£${p.gbp.toFixed(2)}`;
    return `$${p.usd.toFixed(2)}`;
  }

  const period = "/yr";

  return (
    <>
      <head>
        <meta name="description" content="SSL certificates from £8.99/yr: DV, Wildcard, OV, and EV. Automated installation, 256-bit encryption, and trusted CAs. For every site, every level of validation." />
        <link rel="canonical" href="https://onenetservers.net/security/ssl" />
      </head>

      <main className="page-shell ssl-page">
        {/* ── Hero ── */}
        <section className="wh-hero">
          <div className="shell">
            <Fade inView inViewOnce className="wh-hero__inner">
              <div className="wh-trust-strip">
                <Slides inView inViewOnce direction="up" holdDelay={60}>
                  {["256-bit Encryption", "Auto-installation", "Browser Compatible", "Trusted CAs", "30-Day MBG"].map((item) => (
                    <span key={item} className="wh-trust-badge">{item}</span>
                  ))}
                </Slides>
              </div>
              <h1>The padlock your visitors trust.</h1>
              <p className="hero-sub">
                From DV to Extended Validation, every level of trust covered. Automated
                installation included on all OneNet Servers hosting plans. From {showPrice(plans[0].annual)}/yr.
              </p>
              <div className="hero-actions">
                <a href={buildCartAddUrl((plans.find((plan) => plan.featured) ?? plans[0]).pid, "annual", currency)} className="wh-btn-primary">
                  Get started <ArrowRight size={16} />
                </a>
              </div>
              <div className="hero-reassurance">
                <span>No credit card required</span>
                <span>Cancel anytime</span>
                <span>30-day money-back</span>
              </div>
            </Fade>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="homepage-section" id="plans">
          <div className="shell">
            <SectionHeader
              eyebrow="SSL plans"
              title="Every level of validation. One trusted registrar."
              lead="All plans include 256-bit encryption, auto-renewal, and free reissues. Choose your validation level."
              centered
            />

            <div className="pricing-hub-annual-only">
              <span className="wh-savings-badge">SSL certificates are billed annually. Prices below are yearly certificate rates.</span>
            </div>

            <div className="pricing-grid wh-pricing-grid wh-pricing-grid--3">
              <Slides inView inViewOnce direction="up" holdDelay={80}>
                {plans.map((plan) =>
                  plan.featured ? (
                    <FeaturedPricingWrapper key={plan.key}>
                      <div className="pricing-card pricing-card--featured pricing-card--mui-inner">
                        <div>
                          <h3>{plan.name}</h3>
                          <p>{plan.audience}</p>
                        </div>
                        <div className="pricing-card__price">
                          <strong>{showPrice(plan.annual)}</strong>
                          <span>{period}</span>
                        </div>
                        <p className="pricing-card__renewal">{plan.renewal}</p>
                        <ul className="wh-features-list">
                          {plan.features.map((f) => (
                            <li key={f}><Check size={14} className="wh-check-icon" />{f}</li>
                          ))}
                          <li><Check size={14} className="wh-check-icon" /><span className="wh-mbg-badge">30-day MBG</span></li>
                        </ul>
                        <a href={buildCartAddUrl(plan.pid, "annual", currency)} className="wh-card-cta wh-card-cta--featured">
                          Get {plan.name}
                        </a>
                      </div>
                    </FeaturedPricingWrapper>
                  ) : (
                    <div key={plan.key} className="pricing-card">
                      <div>
                        <h3>{plan.name}</h3>
                        <p>{plan.audience}</p>
                      </div>
                      <div className="pricing-card__price">
                        <strong>{showPrice(plan.annual)}</strong>
                        <span>{period}</span>
                      </div>
                      <p className="pricing-card__renewal">{plan.renewal}</p>
                      <ul className="wh-features-list">
                        {plan.features.map((f) => (
                          <li key={f}><Check size={14} className="wh-check-icon" />{f}</li>
                        ))}
                        <li><Check size={14} className="wh-check-icon" /><span className="wh-mbg-badge">30-day MBG</span></li>
                      </ul>
                      <a href={buildCartAddUrl(plan.pid, "annual", currency)} className="wh-card-cta">
                        Get {plan.name}
                      </a>
                    </div>
                  )
                )}
              </Slides>
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="homepage-section homepage-section--tinted" id="features">
          <div className="shell">
            <SectionHeader
              eyebrow="What's included"
              title="Enterprise-grade security. Starter-friendly price."
              centered
            />
            <div className="wh-features-grid">
              <Slides inView inViewOnce direction="up" holdDelay={70}>
                {features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <Tilt key={f.title}>
                      <TiltContent>
                        <div className="wh-feature-card">
                          <div className="wh-feature-icon" style={{ background: f.bg, color: f.color }}>
                            <Icon size={20} />
                          </div>
                          <h3>{f.title}</h3>
                          <p>{f.description}</p>
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
        <section className="homepage-section homepage-section--tinted" id="faq">
          <div className="shell">
            <SectionHeader eyebrow="FAQs" title="SSL questions answered." centered />
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
                <h2>The padlock your visitors trust.</h2>
                <p>Automated installation. 256-bit encryption. 30-day money-back guarantee.</p>
                <a href={buildCartAddUrl((plans.find((plan) => plan.featured) ?? plans[0]).pid, "annual", currency)} className="wh-btn-primary">
                  Get started free <ArrowRight size={16} />
                </a>
                <div className="hero-reassurance">
                  <span>30-day money-back</span>
                  <span>Auto-installation</span>
                  <span>Auto-renewal</span>
                </div>
              </div>
            </Fade>
          </div>
        </section>
      </main>
    </>
  );
}
