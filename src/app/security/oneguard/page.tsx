"use client";

import { useState } from "react";
import { ArrowRight, Check, Shield, Lock, Zap, Eye, RefreshCw, AlertTriangle, Activity } from "lucide-react";
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
    key: "single",
    name: "OneGuard Essential",
    audience: "Single website",
    monthly: { usd: 4.58,  ngn: 3499,  gbp: 3.49 },
    annual:  { usd: 3.82,  ngn: 2899,  gbp: 2.99 },
    renewal: "Renews at $4.58/mo after the first term.",
    features: [
      "Daily malware scanning",
      "Automatic malware removal",
      "Web application firewall (WAF)",
      "DDoS protection",
      "Blacklist monitoring",
      "SSL certificate included",
    ],
    pid: "238",
    featured: false,
  },
  {
    key: "pro",
    name: "OneGuard Basic",
    audience: "Growing businesses",
    monthly: { usd: 9.52,  ngn: 7499,  gbp: 6.99 },
    annual:  { usd: 7.93,  ngn: 6249,  gbp: 5.99 },
    renewal: "Renews at $9.52/mo after the first term.",
    features: [
      "Continuous malware scanning",
      "Priority automatic removal",
      "Advanced WAF rules",
      "DDoS mitigation",
      "Site seal badge",
      "Uptime monitoring",
      "Email alerts",
    ],
    pid: "237",
    featured: true,
  },
  {
    key: "enterprise",
    name: "OneGuard Premium",
    audience: "High-traffic and e-commerce",
    monthly: { usd: 38.89, ngn: 29999, gbp: 28.99 },
    annual:  { usd: 32.41, ngn: 24999, gbp: 24.99 },
    renewal: "Renews at $38.89/mo after the first term.",
    features: [
      "Real-time threat detection",
      "SIEM-grade audit logs",
      "Emergency response SLA: 4hr",
      "Dedicated security analyst",
      "Advanced bot management",
      "PCI-DSS compliance assist",
      "Custom WAF rules",
    ],
    pid: "236",
    featured: false,
  },
];

const features = [
  {
    icon: Shield,
    title: "Malware scanning and removal",
    description: "We scan your site daily (continuous on Pro+) for malware, viruses, and injected code. If we find anything, we remove it automatically, no manual intervention needed.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Zap,
    title: "Web Application Firewall",
    description: "Our WAF blocks SQL injection, XSS, and common OWASP Top 10 attacks before they reach your site. Rules updated in real time as new threats emerge.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: AlertTriangle,
    title: "DDoS protection",
    description: "Distributed denial-of-service attacks are detected and mitigated at the edge, before they impact your server or your visitors' experience.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: Eye,
    title: "Blacklist monitoring",
    description: "We monitor 30+ blacklists: Google Safe Browsing, McAfee, Norton, and others. If your site is flagged, we alert you immediately and assist with delisting.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Activity,
    title: "Uptime and anomaly monitoring",
    description: "OneGuard Pro and Enterprise include uptime checks every 60 seconds from multiple locations. Traffic spikes and error rate changes trigger instant alerts.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Lock,
    title: "HTTPS and SSL enforcement",
    description: "OneGuard enforces HTTPS across your entire site and monitors your SSL certificate validity. We alert you before any certificate expires.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: RefreshCw,
    title: "Automated backups",
    description: "Daily encrypted backups stored off-site. If a breach does occur, restore your clean site in one click from your OneNet Servers dashboard.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Shield,
    title: "Bot management",
    description: "Distinguish real visitors from bots and scrapers. Block credential stuffing, content theft, and automated vulnerability probing, while keeping legitimate crawlers through.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
];

const faqs = [
  {
    q: "What is OneGuard and how is it different from a standard SSL?",
    a: "An SSL certificate encrypts data in transit between your visitors and your server. OneGuard goes much further: it scans your site for malware and removes it automatically, blocks attacks via a web application firewall, monitors blacklists, detects DDoS, and alerts you to anomalies. SSL and OneGuard work together: SSL is the foundation, OneGuard is the active defence.",
  },
  {
    q: "How does automatic malware removal work?",
    a: "OneGuard scans your site's files and database for known malware signatures, injected scripts, backdoors, and suspicious modifications. When a threat is found, our system isolates and removes it automatically within minutes. You receive an email report of what was found and what was removed. For complex infections on Enterprise plans, a security analyst reviews and confirms the clean.",
  },
  {
    q: "Does OneGuard work with WordPress?",
    a: "Yes. OneGuard is compatible with WordPress, WooCommerce, Joomla, Drupal, Magento, and any PHP-based site. The malware scanner is CMS-aware and checks for WordPress-specific threats including plugin backdoors, theme injections, and compromised core files.",
  },
  {
    q: "Will the WAF break my site?",
    a: "Our WAF is pre-configured with rules tuned to avoid false positives on standard web applications. In the unlikely event a legitimate request is blocked, you can whitelist specific URLs or parameters from your OneNet Servers dashboard in seconds. Enterprise plans include custom rule authoring.",
  },
  {
    q: "What happens if my site gets blacklisted by Google?",
    a: "OneGuard monitors Google Safe Browsing and 30+ other blacklists continuously. The moment your site is flagged, we alert you and begin the remediation process: malware removal, clean verification, and Google Search Console delisting request submission. Most sites are delisted within 24–48 hours of a successful clean.",
  },
  {
    q: "Is OneGuard required for PCI-DSS compliance?",
    a: "OneGuard Enterprise assists with several PCI-DSS requirements including malware scanning, audit logging, and web application security. However, PCI-DSS compliance is a certification process involving your full payment stack. We recommend consulting a qualified security assessor (QSA) for full certification. Our security team can advise on scope.",
  },
];

export default function SecurityOneguardPage() {
  const { currency } = useCurrency();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function showPrice(p: { usd: number; ngn: number; gbp: number }) {
    if (currency === "NGN") return `₦${Math.round(p.ngn).toLocaleString("en-US")}`;
    if (currency === "GBP") return `£${p.gbp.toFixed(2)}`;
    return `$${p.usd.toFixed(2)}`;
  }

  const periodLabel = "/yr";
  const annualTotal = (price: { usd: number; ngn: number; gbp: number }) => ({ usd: price.usd * 12, ngn: price.ngn * 12, gbp: price.gbp * 12 });

  return (
    <>
      <head>
        <meta name="description" content="OneGuard Security: daily malware scanning, automatic removal, WAF, DDoS protection, and blacklist monitoring for your website. From £2.99/mo." />
        <link rel="canonical" href="https://onenetservers.net/security/oneguard" />
      </head>

      <main className="page-shell oneguard-page">
        {/* ── Hero ── */}
        <section className="wh-hero">
          <div className="shell">
            <Fade inView inViewOnce className="wh-hero__inner">
              <div className="wh-trust-strip">
                <Slides inView inViewOnce direction="up" holdDelay={60}>
                  {["Malware Scanning", "Auto Removal", "WAF Protection", "DDoS Mitigation", "30-Day MBG"].map((item) => (
                    <span key={item} className="wh-trust-badge">{item}</span>
                  ))}
                </Slides>
              </div>
              <h1>Your site defended. Around the clock.</h1>
              <p className="hero-sub">
                OneGuard combines malware scanning, automatic removal, web application firewall,
                and DDoS protection into one plan. From {showPrice(annualTotal(plans[0].annual))}/yr.
              </p>
              <div className="hero-actions">
                <a href={buildCartAddUrl((plans.find((plan) => plan.featured) ?? plans[0]).pid, "annual", currency)} className="wh-btn-primary">
                  Activate OneGuard <ArrowRight size={16} />
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
              eyebrow="OneGuard plans"
              title="Active security for every site."
              lead="Choose the level of protection that matches your risk. Upgrade any time, downgrade any time."
              centered
            />

            <div className="pricing-hub-annual-only">
              <span className="wh-savings-badge">OneGuard is billed annually. Prices below are yearly subscription totals.</span>
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
                          <strong>{showPrice(annualTotal(plan.annual))}</strong>
                          <span>{periodLabel}</span>
                        </div>
                        <p className="pricing-card__renewal">Annual subscription. Renews yearly unless cancelled.</p>
                        <ul className="wh-features-list">
                          {plan.features.map((f) => (
                            <li key={f}><Check size={14} className="wh-check-icon" />{f}</li>
                          ))}
                          <li><Check size={14} className="wh-check-icon" /><span className="wh-mbg-badge">30-day MBG</span></li>
                        </ul>
                        <a href={buildCartAddUrl(plan.pid, "annual", currency)} className="wh-card-cta wh-card-cta--featured">
                          Get {plan.name.replace("OneGuard ", "")}
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
                        <strong>{showPrice(annualTotal(plan.annual))}</strong>
                        <span>{periodLabel}</span>
                      </div>
                      <p className="pricing-card__renewal">Annual subscription. Renews yearly unless cancelled.</p>
                      <ul className="wh-features-list">
                        {plan.features.map((f) => (
                          <li key={f}><Check size={14} className="wh-check-icon" />{f}</li>
                        ))}
                        <li><Check size={14} className="wh-check-icon" /><span className="wh-mbg-badge">30-day MBG</span></li>
                      </ul>
                      <a href={buildCartAddUrl(plan.pid, "annual", currency)} className="wh-card-cta">
                        Get {plan.name.replace("OneGuard ", "")}
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
              eyebrow="How OneGuard protects you"
              title="Eight layers of active defence."
              centered
            />
            <div className="wh-features-grid">
              <Slides inView inViewOnce direction="up" holdDelay={60}>
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
            <SectionHeader eyebrow="FAQs" title="Security questions answered." centered />
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
                <h2>Your site, actively defended.</h2>
                <p>Stop threats before they reach your visitors. 30-day money-back guarantee. Cancel anytime.</p>
                <a href={buildCartAddUrl((plans.find((plan) => plan.featured) ?? plans[0]).pid, "annual", currency)} className="wh-btn-primary">
                  Activate OneGuard <ArrowRight size={16} />
                </a>
                <div className="hero-reassurance">
                  <span>30-day money-back</span>
                  <span>Cancel anytime</span>
                  <span>No expertise needed</span>
                </div>
              </div>
            </Fade>
          </div>
        </section>
      </main>
    </>
  );
}
