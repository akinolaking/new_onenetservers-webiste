"use client";

import { useState } from "react";
import { ArrowRight, Shield, Globe, Zap, Award, Building2, Star } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useCurrency } from "@/lib/currency-context";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { DomainSearch } from "@/components/primitives/DomainSearch";

const ngExtensions = [
  { ext: ".ng",       usd: 23.40, badge: "Premium", popular: false },
  { ext: ".com.ng",   usd: 11.25, badge: "Popular",  popular: true  },
  { ext: ".edu.ng",   usd: 8.89,  badge: "",         popular: false },
  { ext: ".gov.ng",   usd: 14.00, badge: "",         popular: false },
  { ext: ".org.ng",   usd: 11.25, badge: "",         popular: false },
  { ext: ".net.ng",   usd: 11.25, badge: "",         popular: false },
  { ext: ".name.ng",  usd: 0.00,  badge: "Lowest",   popular: false },
];

const whyNg = [
  {
    icon: Award,
    title: "NiRA direct registration",
    description: "We are a NiRA-accredited registrar. Every .ng and .com.ng domain is registered directly, with no middleman, faster activation, and lower cost.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Shield,
    title: "WHOIS privacy included",
    description: "Your personal information stays private by default. No extra charge. NiRA regulations require registrant data to be accurate, and we protect it from public view.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Globe,
    title: "Local credibility, global reach",
    description: "A .ng domain signals you are serious about Nigeria. It builds trust with local customers and shows your commitment to Africa's largest digital economy.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: Zap,
    title: "Fast NiRA verification",
    description: "Our streamlined NiRA verification process gets your .ng domain live within 24–48 hours of submission. .com.ng typically activates faster.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: Building2,
    title: "DNSSEC and auto-renew",
    description: "Cryptographic DNS protection enabled on all .ng domains. Enable auto-renew and we handle the rest. Your domain will never lapse.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Star,
    title: "NGN billing available",
    description: "Pay for .ng domains in Naira via Paystack. No conversion fees, no exchange rate surprises. Switch to GBP or USD any time.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
];

const steps = [
  {
    n: "01",
    title: "Search and select",
    body: "Enter your preferred domain name in the search above. Select the .ng extension that fits: .ng for maximum prestige, .com.ng for most commercial businesses.",
  },
  {
    n: "02",
    title: "Complete checkout",
    body: "Pay by card, Paystack (NGN), or bank transfer. Choose your registration period (1–3 years). WHOIS privacy is included at no extra cost.",
  },
  {
    n: "03",
    title: "NiRA verification",
    body: "We submit your registration to NiRA with your registrant details. For most extensions, verification is automatic. Ensure your contact email is accurate, as NiRA may send a confirmation.",
  },
  {
    n: "04",
    title: "Your domain goes live",
    body: "Once verified, your .ng domain is active and added to your OneNet Servers dashboard. Point it to your hosting, email, or any IP address, in minutes.",
  },
];

const faqs = [
  {
    q: "What is NiRA and why does it matter?",
    a: "NiRA (Nigeria Internet Registration Association) is the registry authority that manages all .ng domain extensions. Registrars must be accredited by NiRA to register .ng and .com.ng domains directly. OneNet Servers is NiRA-accredited, meaning we don't go through a third-party reseller, which results in faster registration and lower prices.",
  },
  {
    q: "How long does a .ng domain take to activate?",
    a: "Once you register and NiRA verifies your registrant details, your .ng domain activates within 24–48 hours. .com.ng, .name.ng, and .org.ng typically activate within a few hours. .edu.ng and .gov.ng require additional documentation and may take longer.",
  },
  {
    q: "What documents do I need to register a .ng domain?",
    a: "For .com.ng and .name.ng, no documents are required beyond accurate WHOIS registrant details. For .edu.ng you must provide proof of educational institution status. For .gov.ng, the domain is reserved for verified government entities only.",
  },
  {
    q: "Can I register a .ng domain if I am based outside Nigeria?",
    a: "Yes. NiRA allows international registrants to register .ng domains provided they have a legitimate interest in Nigeria. You do not need to be a Nigerian citizen or resident. Many diaspora businesses and international companies operating in Nigeria register .ng domains.",
  },
  {
    q: "What happens if my .ng domain lapses?",
    a: "If you miss renewal, your domain enters a grace period of 30 days during which you can renew at the standard rate. After that, it enters a redemption grace period (30 days) where recovery carries a fee. After redemption, the domain becomes available for anyone to register. We send renewal reminders well in advance.",
  },
  {
    q: "Is WHOIS privacy available for .ng domains?",
    a: "Yes. OneNet Servers includes WHOIS privacy at no extra charge on all .ng registrations we handle. NiRA requires registrant data to be accurate and on file with us, but we keep it out of the public WHOIS database.",
  },
];

export default function DomainsNgPage() {
  const { currency } = useCurrency();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="page-shell domains-ng-page">
      {/* ── Hero ── */}
      <section className="wh-hero">
        <div className="shell">
          <Fade inView inViewOnce className="wh-hero__inner">
            <div className="wh-trust-strip">
              <Slides inView inViewOnce direction="up" holdDelay={60}>
                {["NiRA Accredited", "Direct Registration", "NGN Billing", "24–48hr Activation", "Free WHOIS Privacy"].map((item) => (
                  <span key={item} className="wh-trust-badge">{item}</span>
                ))}
              </Slides>
            </div>
            <h1>Your Nigerian identity online.</h1>
            <p className="hero-sub">
              OneNet Servers is a NiRA-accredited registrar. We register .ng and .com.ng
              directly — no reseller, faster activation, and the most competitive prices in the market.
            </p>
            <div className="hero-search-wrap">
              <DomainSearch />
            </div>
            <div className="hero-reassurance">
              <span>NiRA direct, no middleman</span>
              <span>Free WHOIS privacy</span>
              <span>Pay in Naira via Paystack</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── .ng extension pricing ── */}
      <section className="homepage-section" id="extensions">
        <div className="shell">
          <SectionHeader
            eyebrow=".NG extensions"
            title="Every .ng extension. One registrar."
            lead="We register all Nigerian country-code domains directly through NiRA. Pick the extension that fits your organisation."
            centered
          />
          <div className="dom-grid">
            <Slides inView inViewOnce direction="up" holdDelay={50}>
              {ngExtensions.map((row) => {
                const price = `$${row.usd.toFixed(2)}`;
                return row.popular ? (
                  <Shine key={row.ext} enableOnHover color="#4343f0" opacity={0.08}>
                    <div className="dom-card dom-card--popular">
                      {row.badge && <span className="dom-card__badge">{row.badge}</span>}
                      <div className="dom-card__ext">{row.ext}</div>
                      <div className="dom-card__price">{price}<span>/yr</span></div>
                      <a href={`/pricing?category=domains&mode=register&tld=${encodeURIComponent(row.ext)}`} className="dom-card__cta dom-card__cta--solid">
                        Register
                      </a>
                    </div>
                  </Shine>
                ) : (
                  <div key={row.ext} className="dom-card">
                    {row.badge && <span className="dom-card__badge">{row.badge}</span>}
                    <div className="dom-card__ext">{row.ext}</div>
                    <div className="dom-card__price">{price}<span>/yr</span></div>
                    <a href={`/pricing?category=domains&mode=register&tld=${encodeURIComponent(row.ext)}`} className="dom-card__cta">
                      Register
                    </a>
                  </div>
                );
              })}
            </Slides>
          </div>
          <Fade inView inViewOnce delay={400}>
            <p className="pb-footnote">All prices are per year. Free WHOIS privacy included on every .ng registration.</p>
          </Fade>
        </div>
      </section>

      {/* ── Why .ng ── */}
      <section className="homepage-section homepage-section--tinted" id="why-ng">
        <div className="shell">
          <SectionHeader
            eyebrow="Why .NG"
            title="Why your Nigerian business needs a .ng domain."
            centered
          />
          <div className="wh-features-grid">
            <Slides inView inViewOnce direction="up" holdDelay={70}>
              {whyNg.map((f) => {
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

      {/* ── How to register ── */}
      <section className="homepage-section" id="how-to-register">
        <div className="shell">
          <SectionHeader
            eyebrow="How to register"
            title="Get your .ng domain live in 24–48 hours."
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

      {/* ── FAQ ── */}
      <section className="homepage-section homepage-section--tinted" id="faq">
        <div className="shell">
          <SectionHeader eyebrow="FAQs" title=".NG domain questions answered." centered />
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
              <h2>Claim your .ng domain today.</h2>
              <p>Your Nigerian identity online. Register directly through NiRA — no middleman, faster activation, and the best prices in the market.</p>
              <a href="/pricing?category=domains&mode=register&tld=.ng" className="wh-btn-primary">
                Register .ng now <ArrowRight size={16} />
              </a>
              <div className="hero-reassurance">
                <span>NiRA direct</span>
                <span>Free WHOIS privacy</span>
                <span>Pay in Naira</span>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
