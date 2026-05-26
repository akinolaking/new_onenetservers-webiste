"use client";

import { useState } from "react";
import { ArrowRight, Check, Globe, Shield, Lock, RefreshCw, Zap, Search } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useCurrency } from "@/lib/currency-context";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { tlds } from "@/lib/home-data";
import { DomainSearch } from "@/components/primitives/DomainSearch";

/* TLD prices — live from WHMCS GetTLDPricing API */
const extensions = [
  { ext: ".ng",     usd: 23.40,  ngn: "₦17,999",  gbp: "£16.74", badge: "NiRA",    popular: true },
  { ext: ".com.ng", usd: 11.25,  ngn: "₦8,650",   gbp: "£8.04",  badge: "NiRA",    popular: true },
  { ext: ".com",    usd: 15.00,  ngn: "₦21,999",  gbp: "£11.99", badge: "",         popular: false },
  { ext: ".co.uk",  usd: 8.12,   ngn: "₦14,900",  gbp: "£7.38",  badge: "",         popular: false },
  { ext: ".uk",     usd: 8.12,   ngn: "₦14,900",  gbp: "£7.38",  badge: "",         popular: false },
  { ext: ".shop",   usd: 4.99,   ngn: "₦7,699",   gbp: "£3.79",  badge: "Popular",  popular: false },
  { ext: ".online", usd: 3.80,   ngn: "₦7,000",   gbp: "£3.45",  badge: "",         popular: false },
  { ext: ".xyz",    usd: 3.42,   ngn: "₦6,300",   gbp: "£3.11",  badge: "Lowest",   popular: false },
  { ext: ".dev",    usd: 19.04,  ngn: "₦35,000",  gbp: "£17.30", badge: "",         popular: false },
  { ext: ".ai",     usd: 95.24,  ngn: "₦175,200", gbp: "£86.53", badge: "",         popular: false },
  { ext: ".tech",   usd: 10.79,  ngn: "₦16,469",  gbp: "£8.57",  badge: "",         popular: false },
  { ext: ".io",     usd: 44.44,  ngn: "₦81,800",  gbp: "£40.37", badge: "",         popular: false },
];

const features = [
  {
    icon: Shield,
    title: "Free WHOIS privacy",
    description: "Your personal details stay private by default. We protect your identity on every domain registration.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Lock,
    title: "DNSSEC protection",
    description: "Cryptographic security for your DNS records. Prevents spoofing attacks that redirect your visitors.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Zap,
    title: "Instant activation",
    description: "Most domains go live within minutes of registration. .ng and .com.ng domains activate after NiRA verification.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: RefreshCw,
    title: "Auto-renew available",
    description: "Never lose a domain you care about. Enable auto-renew and we handle the rest from your billing cycle.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Globe,
    title: "30+ TLD extensions",
    description: "Country codes, generics, industry-specific: we register them all. One dashboard, any extension.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Search,
    title: "Bulk domain search",
    description: "Check multiple names and extensions at once. Find the perfect combination before your competitors do.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
];

const faqs = [
  {
    q: "What makes OneNet Servers different for .ng domains?",
    a: "We are a NiRA (Nigeria Internet Registration Association) accredited registrar. That means we register .ng and .com.ng domains directly, with no middleman, no extra layer, faster activation and lower prices than resellers.",
  },
  {
    q: "How long does a .ng domain take to activate?",
    a: "Once you complete registration and NiRA verifies your details, your .ng domain activates within 24–48 hours. .com.ng and .name.ng typically activate faster. All other extensions activate in minutes.",
  },
  {
    q: "Can I transfer a domain I already own?",
    a: "Yes. Get the EPP/auth code from your current registrar, then initiate a transfer from your OneNet Servers client area. Most transfers complete within 5–7 days. We do not charge transfer fees on top of the standard renewal rate.",
  },
  {
    q: "What is WHOIS privacy and do I need it?",
    a: "WHOIS is a public database that lists domain ownership details. Without privacy protection, your name, email, and address are publicly searchable. We include WHOIS privacy free with every registration.",
  },
  {
    q: "Can I buy a domain without buying hosting?",
    a: "Yes, you can register a domain on its own. If you decide to add hosting later, you can point your domain to any host or use it with an OneNet Servers hosting plan.",
  },
];

export default function DomainsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { currency, format } = useCurrency();

  return (
    <main className="page-shell domains-page">
      {/* ── Hero ── */}
      <section className="wh-hero">
        <div className="shell">
          <Fade inView inViewOnce className="wh-hero__inner">
            <div className="wh-trust-strip">
              <Slides inView inViewOnce direction="up" holdDelay={60}>
                {["NiRA Accredited", ".ng Direct", ".co.uk", "30+ TLDs", "Free WHOIS Privacy"].map((item) => (
                  <span key={item} className="wh-trust-badge">{item}</span>
                ))}
              </Slides>
            </div>
            <h1>Your domain.<br />Your identity online.</h1>
            <p className="hero-sub">
              NiRA-accredited registrar. Direct .ng and .com.ng registration with no middleman.
              Free WHOIS privacy on every domain.
            </p>
            <div className="hero-search-wrap">
              <DomainSearch />
            </div>
            <div className="hero-reassurance">
              <span>Free WHOIS privacy</span>
              <span>30+ extensions</span>
              <span>Instant activation</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── TLD Pricing Grid ── */}
      <section className="homepage-section" id="prices">
        <div className="shell">
          <Fade inView inViewOnce>
            <SectionHeader
              eyebrow="Domain pricing"
              title="Transparent pricing. No surprises."
              lead="All prices include free WHOIS privacy and DNSSEC. Renewal rates shown."
              centered
            />
          </Fade>

          <div className="dom-grid">
            <Slides inView inViewOnce direction="up" holdDelay={50}>
              {extensions.map((ext) => {
                const price = currency === "NGN" ? ext.ngn : currency === "GBP" ? ext.gbp : `$${ext.usd.toFixed(2)}`;
                return ext.popular ? (
                  <Shine key={ext.ext} enableOnHover color="#4343f0" opacity={0.08}>
                    <div className="dom-card dom-card--popular">
                      {ext.badge && <span className="dom-card__badge">{ext.badge}</span>}
                      <div className="dom-card__ext">{ext.ext}</div>
                      <div className="dom-card__price">{price}<span>/yr</span></div>
                      <a href={`/pricing?category=domains&mode=register&tld=${encodeURIComponent(ext.ext)}`} className="dom-card__cta dom-card__cta--solid">
                        Register
                      </a>
                    </div>
                  </Shine>
                ) : (
                  <div key={ext.ext} className="dom-card">
                    {ext.badge && <span className="dom-card__badge">{ext.badge}</span>}
                    <div className="dom-card__ext">{ext.ext}</div>
                    <div className="dom-card__price">{price}<span>/yr</span></div>
                    <a href={`/pricing?category=domains&mode=register&tld=${encodeURIComponent(ext.ext)}`} className="dom-card__cta">
                      Register
                    </a>
                  </div>
                );
              })}
            </Slides>
          </div>

          <Fade inView inViewOnce delay={400}>
            <p className="pb-footnote">
              All prices are per year. Renewal rates may differ from first-term promotional prices where applicable.
            </p>
          </Fade>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader
            eyebrow="What's included"
            title="Every domain. Every protection."
            centered
          />
          <div className="wh-features-grid">
            <Slides inView inViewOnce direction="up" holdDelay={70}>
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="wh-feature-card">
                    <div className="wh-feature-icon" style={{ background: feat.bg, color: feat.color }}>
                      <Icon size={20} />
                    </div>
                    <h3>{feat.title}</h3>
                    <p>{feat.description}</p>
                  </div>
                );
              })}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── NiRA Callout ── */}
      <section className="homepage-section homepage-section--dark">
        <div className="shell">
          <Fade inView inViewOnce>
            <div className="dom-nira-box">
              <div className="dom-nira-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div>
                <h3>NiRA-accredited registrar</h3>
                <p>
                  We register .ng and .com.ng domains directly through the Nigeria Internet Registration Association registry.
                  No reseller layer. Direct registry access means faster activation and authoritative management of your Nigerian domain.
                </p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader eyebrow="Questions" title="Domain questions answered." centered />
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
                  {openFaq === i && (
                    <div className="wh-faq-answer"><p>{faq.a}</p></div>
                  )}
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
              <h2>Find your domain today.</h2>
              <p>Free WHOIS privacy. Instant activation. NiRA-accredited registry access.</p>
              <div className="hero-search-wrap" style={{ maxWidth: 520, margin: "0 auto 16px" }}>
                <DomainSearch />
              </div>
              <div className="hero-reassurance">
                <span>Free WHOIS privacy</span>
                <span>DNSSEC included</span>
                <span>30+ extensions</span>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
