"use client";

import Link from "next/link";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { SectionHeader } from "@/components/shared/SectionHeader";

const milestones = [
  { year: "2021", event: "ConqolX Technologies incorporated in England & Wales (RC: 14565201)." },
  { year: "2022", event: "NiRA accreditation granted, with direct .ng and .com.ng registry access." },
  { year: "2022", event: "Nigeria RC: 1775966 registered. SCUML compliant from launch." },
  { year: "2023", event: "Tech Nation Endorsed Founder programme, same cohort as Revolut and Monzo alumni." },
  { year: "2024", event: "Itana Digital Resident, Africa's first Digital Special Economic Zone, Abuja." },
  { year: "2025", event: "Digital Identity Initiative launched, offering a free first year for qualifying Nigerian founders." },
  { year: "2026", event: "Global rebrand to OneNet Servers. Unified Nigeria–UK–Global platform launched." },
];

const values = [
  {
    headline: "Honesty over hype.",
    body: "We show renewal prices. We tell you what plans actually include. We do not use artificial countdown timers or misleading 'was' prices.",
  },
  {
    headline: "Builders first.",
    body: "Every product decision starts with the question: does this make things easier for someone trying to build something? If not, we do not build it.",
  },
  {
    headline: "Two markets. One platform.",
    body: "Nigerian naira via Paystack. GBP via Stripe. US dollars via PayPal. No currency juggling, no conversion fees, no workarounds.",
  },
  {
    headline: "Real support. Real people.",
    body: "Engineers from Lagos and London answer your tickets. Not offshore scripts. Not bots trained to close tickets. Humans who understand your context.",
  },
];

const stats = [
  { value: "500+", label: "Businesses live" },
  { value: "30+", label: "TLD extensions" },
  { value: "9", label: "Global regions" },
  { value: "<2hr", label: "Support response" },
];

export default function AboutPage() {
  return (
    <main className="page-shell">
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="shell">
          <Fade inView inViewOnce className="about-hero__inner">
            <div className="eyebrow eyebrow--centered">About OneNet Servers</div>
            <h1>Global presence. Nigerian roots. London registered.</h1>
            <p className="hero-sub">
              We are ConqolX Technologies Limited, a hosting and domain registrar incorporated in
              England & Wales and Nigeria, NiRA accredited, Tech Nation Endorsed, and resident in
              Africa&apos;s first Digital Special Economic Zone.
            </p>
          </Fade>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="homepage-section">
        <div className="shell">
          <div className="about-stats">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {stats.map((s) => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat__value">{s.value}</div>
                  <div className="about-stat__label">{s.label}</div>
                </div>
              ))}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <div className="about-story-grid">
            <Fade inView inViewOnce>
              <div className="about-story__copy">
                <div className="eyebrow">Our story</div>
                <h2>Built from frustration. Focused on builders.</h2>
                <p>
                  OneNet Servers was founded because no existing hosting provider understood what it meant
                  to build a business across Nigeria and the UK simultaneously: the currency complexity,
                  the domain requirements, the banking friction, the support gaps.
                </p>
                <p>
                  We are the only UK-registered, NiRA-accredited hosting provider. That is not a marketing line.
                  It is a structural advantage that means lower domain prices, direct registry access, and billing
                  that works in naira, pounds, and dollars without workarounds.
                </p>
                <p>
                  Every product we build starts with the question: what would make this easier for a builder
                  in Lagos, Abuja, London, or anywhere in between?
                </p>
              </div>
            </Fade>
            <Fade inView inViewOnce delay={160}>
              <div className="about-story__credentials">
                <div className="about-cred-card">
                  <div className="about-cred-item">
                    <strong>UK RC:</strong> 14565201 (England & Wales)
                  </div>
                  <div className="about-cred-item">
                    <strong>NG RC:</strong> 1775966
                  </div>
                  <div className="about-cred-item">
                    <strong>NiRA Accredited</strong> registrar: .ng &amp; .com.ng
                  </div>
                  <div className="about-cred-item">
                    <strong>SCUML Registered</strong>, compliant under Nigerian law
                  </div>
                  <div className="about-cred-item">
                    <strong>Tech Nation Endorsed Founder</strong>, UK Home Office
                  </div>
                  <div className="about-cred-item">
                    <strong>Itana Digital Resident</strong>, Africa&apos;s first Digital SEZ
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="homepage-section">
        <div className="shell">
          <SectionHeader eyebrow="Our history" title="How we got here." centered />
          <div className="about-timeline">
            <Slides inView inViewOnce direction="up" holdDelay={70}>
              {milestones.map((m) => (
                <div key={m.year} className="about-milestone">
                  <div className="about-milestone__year">{m.year}</div>
                  <div className="about-milestone__event">{m.event}</div>
                </div>
              ))}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader eyebrow="What we believe" title="Four things we never compromise on." centered />
          <div className="about-values-grid">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {values.map((v) => (
                <Shine key={v.headline} enableOnHover color="#4343f0" opacity={0.06}>
                  <div className="about-value-card">
                    <h3>{v.headline}</h3>
                    <p>{v.body}</p>
                  </div>
                </Shine>
              ))}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="homepage-section wh-cta-section">
        <div className="shell">
          <Fade inView inViewOnce>
            <div className="wh-cta-box">
              <h2>Ready to get your business online?</h2>
              <p>Free for your first year. No credit card required. No developer needed.</p>
              <Link href="/digital-identity" className="wh-btn-primary">
                Apply for free year
              </Link>
              <div className="hero-reassurance">
                <span>Free domain + hosting</span>
                <span>No credit card</span>
                <span>30-day guarantee</span>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
