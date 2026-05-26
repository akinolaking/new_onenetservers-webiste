"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Cpu,
  Gauge,
  Globe,
  Headset,
  LayoutTemplate,
  Lock,
  MousePointer2,
  PenSquare,
  RefreshCw,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { FeaturedPricingWrapper } from "@/components/shared/FeaturedPricingWrapper";
import { BillingToggle } from "@/components/shared/BillingToggle";
import { useCurrency } from "@/lib/currency-context";
import { buildCartAddUrl } from "@/lib/whmcs";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";

type Billing = "monthly" | "annual";
type PricePoint = { usd: number; ngn: number; gbp: number };

type Plan = {
  name: string;
  audience: string;
  monthly: PricePoint;
  annual: PricePoint;
  renewal: PricePoint;
  features: string[];
  pid: string;
  featured: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    audience: "Your first website",
    monthly: { usd: 3.99, ngn: 5499, gbp: 2.79 },
    annual: { usd: 4.05, ngn: 4157, gbp: 3.0 },
    renewal: { usd: 3.99, ngn: 5499, gbp: 2.79 },
    features: [
      "1 website",
      "5 GB SSD storage",
      "Free SSL certificate",
      "Free daily backups",
      "CloudLinux isolation",
    ],
    pid: "261",
    featured: false,
  },
  {
    name: "Lite",
    audience: "Growing sites",
    monthly: { usd: 9.75, ngn: 7499, gbp: 6.97 },
    annual: { usd: 6.82, ngn: 5249, gbp: 4.88 },
    renewal: { usd: 9.75, ngn: 7499, gbp: 6.97 },
    features: [
      "3 websites",
      "20 GB SSD storage",
      "Free SSL certificate",
      "Free daily backups",
      "LiteSpeed web server",
    ],
    pid: "251",
    featured: false,
  },
  {
    name: "Premium",
    audience: "Serious builders",
    monthly: { usd: 18.2, ngn: 13999, gbp: 13.02 },
    annual: { usd: 12.74, ngn: 9799, gbp: 9.11 },
    renewal: { usd: 18.2, ngn: 13999, gbp: 13.02 },
    features: [
      "Unlimited websites",
      "50 GB SSD storage",
      "Free SSL certificate",
      "Free daily backups",
      "ImmunifyAV+ malware scanning",
    ],
    pid: "252",
    featured: true,
  },
  {
    name: "Ultimate",
    audience: "Agencies and stores",
    monthly: { usd: 32.5, ngn: 24999, gbp: 23.25 },
    annual: { usd: 22.75, ngn: 17499, gbp: 16.28 },
    renewal: { usd: 32.5, ngn: 24999, gbp: 23.25 },
    features: [
      "Unlimited websites",
      "100 GB SSD storage",
      "Free SSL certificate",
      "Priority daily backups",
      "Dedicated resources",
    ],
    pid: "254",
    featured: false,
  },
];

const reasons = [
  {
    icon: Server,
    title: "One account. Fewer moving parts.",
    description:
      "Hosting, domain, SSL, business email, and your site builder live in one place so launch day does not become five different vendor logins.",
  },
  {
    icon: Zap,
    title: "Performance that does not need babysitting.",
    description:
      "LiteSpeed, CloudLinux isolation, and daily backups keep your site fast and recoverable without extra plugins or manual tuning.",
  },
  {
    icon: Headset,
    title: "Support that understands the launch window.",
    description:
      "Our team handles migrations, DNS handoff, and setup questions quickly, so your first week stays focused on publishing rather than troubleshooting.",
  },
];

const builderFeatures = [
  { icon: MousePointer2, label: "Drag-and-drop visual editor" },
  { icon: Sparkles, label: "AI website & content generation" },
  { icon: Gauge, label: "Built-in SEO & performance tools" },
  { icon: LayoutTemplate, label: "Hosting, SSL & commerce ready" },
];

const steps = [
  {
    number: "01",
    label: "STEP 1",
    icon: PenSquare,
    title: "Describe your website",
    description:
      "Tell the builder what you do, who you serve, and the kind of look you want.",
    time: "under 1 minute",
  },
  {
    number: "02",
    label: "STEP 2",
    icon: Sparkles,
    title: "AI builds the first version",
    description:
      "Pages, structure, layout, and draft content are generated instantly so you can refine instead of starting from a blank page.",
    time: "2–3 minutes",
  },
  {
    number: "03",
    label: "STEP 3",
    icon: Rocket,
    title: "Edit and publish with full control",
    description:
      "Adjust design, text, SEO, and structure visually. Nothing is locked, so you stay in control all the way to publish.",
    time: "10 minutes total",
  },
];

const featureCards = [
  {
    icon: Zap,
    title: "Faster first loads",
    description:
      "LiteSpeed caching and modern shared hosting keep the first experience cleaner for visitors and search engines.",
  },
  {
    icon: Lock,
    title: "SSL included",
    description:
      "HTTPS is there from day one, without a separate paid add-on slowing down launch day.",
  },
  {
    icon: RefreshCw,
    title: "Daily backups",
    description:
      "Recover quickly after a bad update, failed plugin, or accidental change.",
  },
  {
    icon: Cpu,
    title: "Isolated resources",
    description:
      "CloudLinux helps keep other tenants from affecting your site when their traffic spikes.",
  },
  {
    icon: Globe,
    title: "Domain, email & builder together",
    description:
      "One account covers domain, hosting, email, and website builder so you do not stitch together separate tools.",
  },
  {
    icon: Shield,
    title: "Free migration support",
    description:
      "Already have a site? We move the important pieces so you can redesign and relaunch without downtime.",
  },
];

const comparison = [
  {
    feature: "AI website builder included",
    onenet: true,
    ukHost: false,
    ngHost: false,
    globalHost: false,
  },
  {
    feature: "LiteSpeed on shared hosting",
    onenet: true,
    ukHost: false,
    ngHost: false,
    globalHost: false,
  },
  {
    feature: "Free daily backups",
    onenet: true,
    ukHost: true,
    ngHost: false,
    globalHost: true,
  },
  {
    feature: "Free migration support",
    onenet: true,
    ukHost: true,
    ngHost: false,
    globalHost: false,
  },
  {
    feature: "Domain, SSL, and email-ready setup",
    onenet: true,
    ukHost: false,
    ngHost: false,
    globalHost: true,
  },
  {
    feature: "UK and Nigeria business context",
    onenet: true,
    ukHost: false,
    ngHost: true,
    globalHost: false,
  },
];

const faqs = [
  {
    q: "Is the AI website builder included with hosting?",
    a: "Yes. Every shared hosting plan includes access to the AI website builder, ready-made templates, and the visual editor, so you can launch without adding another builder subscription.",
  },
  {
    q: "Can you migrate my existing website for me?",
    a: "Yes. Our team handles files, databases, DNS, and email migration for shared hosting customers at no extra charge. Most standard moves are completed within 24 hours.",
  },
  {
    q: "What happens after the introductory term?",
    a: "The renewal price is shown on every plan card before checkout. Your service renews at that standard rate unless you upgrade, downgrade, or cancel from your client area.",
  },
  {
    q: "Do I still get cPanel and WordPress tools?",
    a: "Yes. Shared hosting plans include cPanel for file, email, and database management, plus one-click WordPress installs and support for regular PHP and CMS workflows.",
  },
  {
    q: "Which plan is best if I want to launch quickly?",
    a: "Starter is enough for a single simple site, while Lite is a better fit if you want more storage, more sites, and extra room to grow without migrating again too soon.",
  },
];

const testimonials = [
  {
    name: "Adebola O.",
    role: "E-commerce founder",
    location: "Lagos",
    quote:
      "We moved from a slower international host and the difference was immediate. The migration was handled for us and we launched updates the same week.",
  },
  {
    name: "The BB Bespokes",
    role: "Fashion brand",
    location: "London",
    quote:
      "Going from DMs to a proper storefront felt less intimidating because the design tools were already bundled with the hosting.",
  },
  {
    name: "Emeka Tax Advisory",
    role: "Professional services",
    location: "Abuja",
    quote:
      "It gave us the speed of a real launch without the usual setup chaos. Domain, email, and hosting all came together cleanly.",
  },
];

function CheckCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="wh-table-value">{value}</span>;
  }

  return value ? (
    <span className="wh-table-check wh-table-check--yes" aria-label="Yes">
      ✓
    </span>
  ) : (
    <span className="wh-table-check wh-table-check--no" aria-label="No">
      ✗
    </span>
  );
}

export default function WebHostingPage() {
  const [billing, setBilling] = useState<Billing>("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { currency } = useCurrency();

  const featuredPlan = plans.find((plan) => plan.featured) ?? plans[0];
  const starterPlan = plans[0];

  function showPrice(price: PricePoint) {
    if (currency === "NGN") {
      return `₦${Math.round(price.ngn).toLocaleString("en-NG")}`;
    }
    if (currency === "GBP") {
      return `£${price.gbp.toFixed(2)}`;
    }
    return `$${price.usd.toFixed(2)}`;
  }

  function renewalCopy(price: PricePoint) {
    return `Renews at ${showPrice(price)}/mo after the first term.`;
  }

  return (
    <main className="page-shell hosting-page">
      <section className="wh-hero">
        <div className="shell">
          <div className="hosting-web-hero-grid">
            <Fade inView inViewOnce className="hero-copy hosting-web-hero-copy">
              <span className="hero-badge">AI Builder Included · Free SSL · Free Migration</span>
              <h1>High-performance hosting for websites that need to look serious from day one.</h1>
              <p className="hero-sub">
                Launch with LiteSpeed, CloudLinux isolation, daily backups, and an AI website
                builder already included.
              </p>
              <div className="hero-actions">
                <a href="#view" className="wh-card-cta hosting-web-inline-cta">
                  View Plans
                </a>
                <a
                  href={buildCartAddUrl(featuredPlan.pid, billing, currency)}
                  className="hero-secondary-link"
                >
                  Start with Premium
                </a>
              </div>
              <p className="hosting-web-hero-price">
                Starting at <strong>{showPrice(starterPlan.annual)}</strong>
                <span>/mo billed annually</span>
                <em>{showPrice(starterPlan.monthly)}/mo standard</em>
              </p>
              <div className="wh-trust-strip hosting-web-hero-trust">
                <span className="wh-trust-badge">AI Builder Included</span>
                <span className="wh-trust-badge">Free SSL &amp; Backups</span>
                <span className="wh-trust-badge">Free Migration</span>
              </div>
            </div>

            <Fade inView inViewOnce delay={0.08} className="hosting-web-hero-visual">
              <div className="hosting-web-visual-card">
                <Image
                  src="/assets/website-cover.png"
                  alt="Website preview built on OneNet Servers"
                  width={1240}
                  height={930}
                  priority
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="shell">
          <SectionHeader
            eyebrow="Why OneNet Servers"
            title="Hosting that gives you fewer things to worry about."
            lead="It is not just server space. It is getting your site live with less friction, fewer tools, and support that understands launch windows."
            centered
          />

          <div className="diff-grid">
            <Slides inView inViewOnce direction="up" holdDelay={90}>
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <article key={reason.title} className="diff-card">
                    <span className="diff-card__icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3>{reason.title}</h3>
                    <p>{reason.description}</p>
                  </article>
                );
              })}
            </Slides>
          </div>
        </div>
      </section>

      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <div className="ftabs-inner hosting-web-builder-grid">
            <Fade inView inViewOnce className="hosting-web-builder-media">
              <div className="hosting-web-builder-main">
                <Image
                  src="/assets/website-cover.png"
                  alt="OneNet Servers AI builder website preview"
                  width={1240}
                  height={930}
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
              </div>
              <div className="hosting-web-builder-overlay">
                <Image
                  src="/assets/email-mockup.png"
                  alt="OneNet Servers builder controls and business email preview"
                  width={960}
                  height={700}
                  loading="lazy"
                  sizes="(max-width: 1024px) 60vw, 280px"
                />
              </div>
            </Fade>

            <Fade inView inViewOnce delay={0.08} className="hero-copy hosting-web-builder-copy">
              <div className="section-header hosting-web-inline-header">
                <span className="hero-badge">OneNet AI Website Builder</span>
                <h2>Build your website with confidence</h2>
              </div>
              <p className="lead hosting-web-inline-lead">
                Launch a professional website using ready-made templates, a visual drag-and-drop
                editor, and built-in AI assistance. Customise freely and publish without code.
              </p>
              <ul className="hosting-web-builder-list" aria-label="Builder features">
                {builderFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <li key={feature.label}>
                      <span className="hosting-web-builder-icon">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <span>{feature.label}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="hero-actions">
                <a
                  href={buildCartAddUrl(featuredPlan.pid, billing, currency)}
                  className="wh-card-cta hosting-web-inline-cta"
                >
                  Start Building with AI
                </a>
                <a href="#view" className="hero-secondary-link">
                  See Plans &amp; Pricing
                </a>
              </div>
              <p className="hosting-web-note">
                Included free with every Web Hosting plan. Powered by SiteJet Builder.
              </p>
            </Fade>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="shell">
          <SectionHeader
            eyebrow="Powered by SiteJet Builder"
            title="Create websites faster with AI"
            lead="Available with every OneNet Servers Web Hosting plan. Go from idea to live website in minutes, then refine everything visually."
            centered
          />

          <div className="how-steps">
            <div className="how-connector" aria-hidden="true" />
            <Slides inView inViewOnce direction="up" holdDelay={85}>
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article key={step.label} className="how-step">
                    <div className="how-step__icon-wrap">
                      <span className="how-step__icon">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="how-step__num">{step.number}</span>
                    </div>
                    <div className="how-step__body">
                      <span className="eyebrow">{step.label}</span>
                      <h3 className="how-step__title">{step.title}</h3>
                      <p className="how-step__desc">{step.description}</p>
                      <span className="how-step__time-badge">
                        <span className="how-step__time-dot" aria-hidden="true" />
                        {step.time}
                      </span>
                    </div>
                  </article>
                );
              })}
            </Slides>
          </div>

          <div className="hero-actions hosting-web-actions-center">
            <a
              href={buildCartAddUrl(featuredPlan.pid, billing, currency)}
              className="wh-card-cta hosting-web-inline-cta"
            >
              Start Building Free
            </a>
            <a href="#view" className="hero-secondary-link">
              View Hosting Plans
            </a>
          </div>
        </div>
      </section>

      <section className="homepage-section" id="view">
        <div className="shell">
          <SectionHeader
            eyebrow="Plans and Pricing"
            title="Pick the plan that fits the site you are launching now."
            lead="All shared hosting plans include SSL, daily backups, migration support, and the AI builder. Pricing follows the currency selected in the header."
            centered
          />

          <BillingToggle
            billing={billing}
            onChange={setBilling}
            savingsText="Save up to 35% on annual billing"
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
                      <p className="pricing-card__renewal">{renewalCopy(plan.renewal)}</p>
                      <ul className="wh-features-list">
                        {plan.features.map((feature) => (
                          <li key={feature}>
                            <Check size={14} className="wh-check-icon" />
                            {feature}
                          </li>
                        ))}
                        <li>
                          <Check size={14} className="wh-check-icon" />
                          AI website builder included
                        </li>
                      </ul>
                      <a
                        href={buildCartAddUrl(plan.pid, billing, currency)}
                        className="wh-card-cta wh-card-cta--featured"
                      >
                        Choose {plan.name}
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
                    <p className="pricing-card__renewal">{renewalCopy(plan.renewal)}</p>
                    <ul className="wh-features-list">
                      {plan.features.map((feature) => (
                        <li key={feature}>
                          <Check size={14} className="wh-check-icon" />
                          {feature}
                        </li>
                      ))}
                      <li>
                        <Check size={14} className="wh-check-icon" />
                        AI website builder included
                      </li>
                    </ul>
                    <a href={buildCartAddUrl(plan.pid, billing, currency)} className="wh-card-cta">
                      Choose {plan.name}
                    </a>
                  </div>
                ),
              )}
            </Slides>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="shell">
          <SectionHeader
            eyebrow="Hosting Features"
            title="Built for fast launches and cleaner handoffs."
            lead="LiteSpeed, CloudLinux, daily backups, and a migration team cover the basics that usually get left for later."
            centered
          />

          <div className="wh-features-grid">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="wh-feature-card">
                    <span
                      className="wh-feature-icon"
                      style={{ background: "var(--blue-xl)", color: "var(--blue)" }}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                );
              })}
            </Slides>
          </div>
        </div>
      </section>

      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader
            eyebrow="Compare"
            title="A cleaner stack than the usual budget-hosting mix."
            lead="This is where OneNet Servers stands apart: builder access, migration help, and launch-ready essentials already inside the base offer."
            centered
          />

          <div className="wh-table-scroll-wrap">
            <p className="wh-table-scroll-hint">&#8592; Swipe to compare &#8594;</p>
            <div className="wh-table-inner">
              <table className="wh-comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Feature</th>
                    <th scope="col" className="wh-col-onenet">
                      OneNet Servers
                    </th>
                    <th scope="col">Popular UK Host</th>
                    <th scope="col">Budget NG Host</th>
                    <th scope="col">Global Budget Host</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td className="wh-col-onenet">
                        <CheckCell value={row.onenet} />
                      </td>
                      <td>
                        <CheckCell value={row.ukHost} />
                      </td>
                      <td>
                        <CheckCell value={row.ngHost} />
                      </td>
                      <td>
                        <CheckCell value={row.globalHost} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="shell">
          <SectionHeader
            eyebrow="Customer stories"
            title="Hosting that feels simpler once the work starts."
            centered
          />
          <div className="wh-testimonials-grid">
            <Slides inView inViewOnce direction="up" holdDelay={100}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="wh-testimonial-card">
                  <div className="wh-stars" aria-label="5 out of 5 stars" role="img">
                    ★★★★★
                  </div>
                  <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  <footer>
                    <strong>{testimonial.name}</strong>
                    <span>
                      {testimonial.role} · {testimonial.location}
                    </span>
                  </footer>
                </div>
              ))}
            </Slides>
          </div>
        </div>
      </section>

      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader eyebrow="Questions" title="Common questions answered." centered />
          <Fade inView inViewOnce>
            <div className="wh-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={faq.q}
                  className={`wh-faq-item${openFaq === index ? " wh-faq-item--open" : ""}`}
                >
                  <button
                    className="wh-faq-trigger"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                    aria-controls={`hosting-web-faq-${index}`}
                  >
                    {faq.q}
                    <span className="wh-faq-chevron" aria-hidden="true">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div id={`hosting-web-faq-${index}`} className="wh-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </section>

      <section className="homepage-section wh-cta-section">
        <div className="shell">
          <Fade inView inViewOnce>
            <div className="wh-cta-box">
              <h2>Launch on hosting that already covers the hard bits.</h2>
              <p>
                Pick a plan, publish with the AI builder, and let the stack handle SSL, backups,
                and migration support behind the scenes.
              </p>
              <a href={buildCartAddUrl(featuredPlan.pid, billing, currency)} className="wh-card-cta hosting-web-inline-cta">
                Start building now
              </a>
              <div className="hero-reassurance">
                <span>AI builder included</span>
                <span>Free SSL and backups</span>
                <span>Migration support</span>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
