"use client";

import { useState } from "react";
import { ArrowRight, Check, Globe, Shield, Lock, RefreshCw, Clock, AlertTriangle } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useCurrency } from "@/lib/currency-context";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { DomainSearch } from "@/components/primitives/DomainSearch";

const features = [
  {
    icon: Shield,
    title: "Free WHOIS privacy",
    description: "Your personal details stay private on every transferred domain. No extra charge, ever.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Lock,
    title: "DNSSEC carried over",
    description: "We preserve your DNSSEC records during transfer so your domain's cryptographic security is never interrupted.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Clock,
    title: "Transfer in 5–7 days",
    description: "Most generic domains complete in 5–7 days. .ng and ccTLDs may vary. We keep you updated at every step.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: RefreshCw,
    title: "Free year added",
    description: "Every transfer adds one year to your expiry date at no extra cost. You never lose renewal time.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Globe,
    title: "30+ TLD extensions",
    description: "Transfer .com, .co.uk, .ng, .com.ng, .net, .org and 30+ other extensions into one dashboard.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: AlertTriangle,
    title: "Pre-transfer check",
    description: "We check your domain's lock status and eligibility before you pay. No surprises mid-transfer.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
];

const steps = [
  {
    n: "01",
    title: "Unlock your domain",
    body: "Log into your current registrar and disable the transfer lock (sometimes called \"registrar lock\" or \"EPP lock\"). Get your authorisation (EPP) code, which you'll need in step 3.",
  },
  {
    n: "02",
    title: "Search for your domain",
    body: "Enter your domain in the transfer search below. We check it's eligible and show you the transfer price plus the one free year added to your expiry.",
  },
  {
    n: "03",
    title: "Enter your auth code",
    body: "Paste your EPP authorisation code during checkout. We submit the transfer request to the registry. You'll receive an email from your old registrar to approve. Approve it promptly.",
  },
  {
    n: "04",
    title: "Go live with us",
    body: "Once approved, the transfer completes in 5–7 days. Your DNS, email, and settings move across untouched. We notify you when it's done.",
  },
];

const transferPrices = [
  { ext: ".com",    usd: 15.00,  popular: true  },
  { ext: ".co.uk",  usd: 8.12,   popular: false },
  { ext: ".uk",     usd: 8.12,   popular: false },
  { ext: ".net",    usd: 15.05,  popular: false },
  { ext: ".org",    usd: 13.45,  popular: false },
  { ext: ".ng",     usd: 23.40,  popular: true  },
  { ext: ".com.ng", usd: 11.25,  popular: false },
  { ext: ".dev",    usd: 19.04,  popular: false },
  { ext: ".io",     usd: 60.82,  popular: false },
  { ext: ".tech",   usd: 63.49,  popular: false },
];

const faqs = [
  {
    q: "What is an EPP / authorisation code?",
    a: "An EPP code (also called an auth code, authorisation code, or transfer secret) is a unique string your current registrar issues for each domain. It proves you authorise the transfer. Log into your current registrar's control panel and look for 'Transfer lock' or 'Get authorisation code'.",
  },
  {
    q: "Will my website or email go down during a transfer?",
    a: "No. DNS records are not changed during a transfer unless you explicitly update them. Your site and email continue to work throughout the process. The transfer only moves ownership, not your hosting.",
  },
  {
    q: "Can I transfer a .ng or .com.ng domain?",
    a: "Yes. We are a NiRA-accredited registrar, so we accept direct transfers of .ng and .com.ng domains. The process requires NiRA verification and typically takes up to 5 business days after approval.",
  },
  {
    q: "Does the transfer renew my domain?",
    a: "Yes. Every successful transfer adds one year to your domain's current expiry date at no extra cost. If your domain was expiring in 6 months, it will expire in 18 months after transfer.",
  },
  {
    q: "My domain was recently registered. Can I still transfer?",
    a: "Most registries require a 60-day waiting period after initial registration or a previous transfer before allowing another transfer. If your domain is less than 60 days old, you will need to wait before transferring.",
  },
  {
    q: "What if my current registrar won't release the domain?",
    a: "If your registrar refuses to issue an auth code or release the domain, contact us. We can advise on escalation paths including ICANN's Transfer Dispute Resolution Policy (TDRP). You always have the right to transfer your domain.",
  },
];

export default function DomainsTransferPage() {
  const { currency, format } = useCurrency();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="page-shell domains-transfer-page">
      {/* ── Hero ── */}
      <section className="wh-hero">
        <div className="shell">
          <Fade inView inViewOnce className="wh-hero__inner">
            <div className="wh-trust-strip">
              <Slides inView inViewOnce direction="up" holdDelay={60}>
                {["NiRA Accredited", "Free WHOIS Privacy", "+1 Year Free", "DNSSEC Preserved", "30-Day MBG"].map((item) => (
                  <span key={item} className="wh-trust-badge">{item}</span>
                ))}
              </Slides>
            </div>
            <h1>Move your domain. Keep everything else.</h1>
            <p className="hero-sub">
              Transfer to OneNet Servers in 5–7 days. Your DNS, email, and settings
              stay exactly as they are, and you get a free year added on every transfer.
            </p>
            <div className="hero-search-wrap">
              <DomainSearch mode="transfer" />
            </div>
            <div className="hero-reassurance">
              <span>No credit card required</span>
              <span>Transfer lock check included</span>
              <span>30-day money-back guarantee</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="homepage-section" id="how-it-works">
        <div className="shell">
          <SectionHeader
            eyebrow="How it works"
            title="Four steps to bring your domain home."
            lead="Most transfers complete in 5–7 days. We handle the technical side: you just approve one email."
            centered
          />
          <div className="steps-grid">
            <Slides inView inViewOnce direction="up" holdDelay={100}>
              {steps.map((step) => (
                <div key={step.n} className="step-card">
                  <div className="step-card__number">{step.n}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Transfer pricing ── */}
      <section className="homepage-section homepage-section--tinted" id="pricing">
        <div className="shell">
          <SectionHeader
            eyebrow="Transfer prices"
            title="Transparent pricing. One year free on every transfer."
            centered
          />
          <div className="dom-grid">
            <Slides inView inViewOnce direction="up" holdDelay={50}>
              {transferPrices.map((row) => {
                const price = `$${row.usd.toFixed(2)}`;
                return row.popular ? (
                  <Shine key={row.ext} enableOnHover color="#4343f0" opacity={0.08}>
                    <div className="dom-card dom-card--popular">
                      <div className="dom-card__ext">{row.ext}</div>
                      <div className="dom-card__price">{price}<span>/yr</span></div>
                      <a href={`/pricing?category=domains&mode=transfer&tld=${encodeURIComponent(row.ext)}`} className="dom-card__cta dom-card__cta--solid">
                        Transfer
                      </a>
                    </div>
                  </Shine>
                ) : (
                  <div key={row.ext} className="dom-card">
                    <div className="dom-card__ext">{row.ext}</div>
                    <div className="dom-card__price">{price}<span>/yr</span></div>
                    <a href={`/pricing?category=domains&mode=transfer&tld=${encodeURIComponent(row.ext)}`} className="dom-card__cta">
                      Transfer
                    </a>
                  </div>
                );
              })}
            </Slides>
          </div>
          <Fade inView inViewOnce delay={400}>
            <p className="pb-footnote">+1 year free added to your expiry date on every completed transfer.</p>
          </Fade>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="homepage-section" id="features">
        <div className="shell">
          <SectionHeader eyebrow="What's included" title="Everything you need, included by default." centered />
          <div className="wh-features-grid">
            <Slides inView inViewOnce direction="up" holdDelay={70}>
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="wh-feature-card">
                    <div className="wh-feature-icon" style={{ background: f.bg, color: f.color }} aria-hidden="true">
                      <Icon size={20} />
                    </div>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                  </div>
                );
              })}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Before you transfer checklist ── */}
      <section className="homepage-section homepage-section--tinted" id="checklist">
        <div className="shell transfer-checklist-shell">
          <SectionHeader
            eyebrow="Before you transfer"
            title="Transfer checklist."
            lead="Run through this before you start so the transfer completes cleanly the first time."
            centered
          />
          <div className="transfer-checklist">
            <ul className="transfer-checklist__list">
              {[
                "Domain is more than 60 days old",
                "Transfer lock (registrar lock) is disabled at your current registrar",
                "Your WHOIS contact email is up to date and accessible",
                "You have your EPP / authorisation code ready",
                "Domain is not in a redemption grace period or dispute",
                "For .ng/.com.ng: NiRA registrant details are correct",
              ].map((item) => (
                <li key={item} className="transfer-checklist__item">
                  <span className="transfer-checklist__icon" aria-hidden="true"><Check size={16} /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="transfer-checklist__note">
              If any one of these is missing, sort it before checkout. That prevents failed transfers, approval delays, and wasted turnaround time.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="homepage-section homepage-section--tinted" id="faq">
        <div className="shell">
          <SectionHeader eyebrow="FAQs" title="Questions about domain transfers." centered />
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
              <h2>Your domain. Our infrastructure.</h2>
              <p>Start your transfer now. We add a free year and protect your domain with WHOIS privacy from day one.</p>
              <a href="/pricing?category=domains&mode=transfer" className="wh-btn-primary">
                Start transfer <ArrowRight size={16} />
              </a>
              <div className="hero-reassurance">
                <span>Free WHOIS privacy</span>
                <span>+1 year free</span>
                <span>30-day money-back</span>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
