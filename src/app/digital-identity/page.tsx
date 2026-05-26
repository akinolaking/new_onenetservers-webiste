"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Check, Gift, Globe, Mail, BookOpen, Briefcase, Users } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";

const included = [
  {
    icon: Globe,
    title: "Free domain (1st year)",
    description: "Choose from .name.ng, .com.ng, or .ng, the extensions that establish a Nigerian digital identity. Yours at no cost in year one.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
  {
    icon: "server",
    title: "Free web hosting (1st year)",
    description: "Shared hosting with LiteSpeed, CloudLinux isolation, and free SSL. Enough to run a professional website, blog, or portfolio.",
    bg: "rgb(16 185 129 / 12%)",
    color: "var(--green)",
  },
  {
    icon: Mail,
    title: "Free business email (1st year)",
    description: "Up to 5 email addresses on your own domain. No @gmail. hello@yourbrand.ng from day one.",
    bg: "rgb(245 158 11 / 10%)",
    color: "var(--amber)",
  },
  {
    icon: BookOpen,
    title: "AI website builder",
    description: "Generate your full website from a text prompt. Templates for any industry. No design skills required.",
    bg: "var(--blue-xl)",
    color: "var(--blue)",
  },
];

const whoQualifies = [
  {
    icon: Briefcase,
    label: "Founders & entrepreneurs",
    description: "Businesses registered for less than 24 months, operating from Nigeria.",
  },
  {
    icon: BookOpen,
    label: "Students & graduates",
    description: "Current students and recent graduates building their professional presence.",
  },
  {
    icon: Users,
    label: "Freelancers & creators",
    description: "Independent professionals, artists, and content creators seeking an online home.",
  },
  {
    icon: Gift,
    label: "Community organisations",
    description: "Registered non-profits, clubs, and community groups with a Nigerian presence.",
  },
];

const steps = [
  {
    number: "01",
    title: "Complete the application",
    description: "Fill in the short form below with your name, what you do, and why you need an online presence. No long essays required.",
    time: "2 minutes",
  },
  {
    number: "02",
    title: "Verification",
    description: "We review your application within 2 business days. Most applicants are approved. We may ask for a brief confirmation of eligibility.",
    time: "1–2 business days",
  },
  {
    number: "03",
    title: "Go live",
    description: "Once approved, pick your domain and activate your free hosting. Your account is ready. Our team is available to help you launch.",
    time: "Same day",
  },
];

const faqs = [
  {
    q: "Is this completely free? What's the catch?",
    a: "Yes, free for the first year. No credit card required during the free period. After 12 months, you can continue at our standard rates (from $3.99/mo for hosting, standard domain rates). We notify you 30 days before any charge. You can cancel before renewal with no obligation.",
  },
  {
    q: "What happens after the first year?",
    a: "We send a renewal notice 30 days in advance. You choose to continue at the standard rate or let the services lapse. There are no surprise charges and no obligation to continue.",
  },
  {
    q: "Who reviews my application?",
    a: "Our team in Lagos reviews every application. We aim to respond within 2 business days. Most qualifying applications are approved. If yours is not, we will explain why and suggest how to reapply.",
  },
  {
    q: "Can I choose any domain extension?",
    a: "Approved applicants can choose .name.ng (free on DII), .com.ng, or .ng. Standard domain registration costs apply for extensions not listed above. We recommend .name.ng or .com.ng for the DII programme as they are most affordable.",
  },
  {
    q: "Can I upgrade my hosting during the free year?",
    a: "Yes. You can upgrade to a paid plan at any time during your free year. The upgrade takes effect immediately and you are charged only for the plan you select going forward.",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type DiiErrors = {
  name?: string;
  email?: string;
  category?: string;
  why?: string;
};

export default function DigitalIdentityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [diiSubmitted, setDiiSubmitted] = useState(false);
  const [diiErrors, setDiiErrors] = useState<DiiErrors>({});
  const [diiName, setDiiName] = useState("");
  const [diiEmail, setDiiEmail] = useState("");
  const [diiCategory, setDiiCategory] = useState("");
  const [diiWhy, setDiiWhy] = useState("");
  const diiNameId = useId();
  const diiEmailId = useId();
  const diiCategoryId = useId();
  const diiWhyId = useId();

  function validateDiiForm(): DiiErrors {
    const errs: DiiErrors = {};
    if (!diiName.trim()) errs.name = "Full name is required.";
    const trimmedEmail = diiEmail.trim();
    if (!trimmedEmail) {
      errs.email = "Email address is required.";
    } else if (!EMAIL_RE.test(trimmedEmail)) {
      errs.email = "Enter a valid email address.";
    }
    if (!diiCategory) errs.category = "Please select a category.";
    if (!diiWhy.trim()) errs.why = "Please describe your project.";
    return errs;
  }

  function handleDiiSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateDiiForm();
    if (Object.keys(errs).length > 0) {
      setDiiErrors(errs);
      return;
    }
    setDiiErrors({});
    setDiiSubmitted(true);
  }

  return (
    <main className="page-shell">
      {/* ── Hero ── */}
      <section className="wh-hero dii-hero">
        <div className="shell">
          <Fade inView inViewOnce className="wh-hero__inner">
            <div className="wh-trust-strip">
              <Slides inView inViewOnce direction="up" holdDelay={60}>
                {["Free Domain", "Free Hosting", "Free Email", "No Credit Card", "Year One Free"].map((item) => (
                  <span key={item} className="wh-trust-badge">{item}</span>
                ))}
              </Slides>
            </div>
            <h1>Your first year online. On us.</h1>
            <p className="hero-sub">
              Free domain, hosting, and business email for qualifying Nigerian founders,
              students, freelancers, and creators. No credit card required.
            </p>
            <div className="hero-actions">
              <Link href="#apply" className="wh-btn-primary">
                Apply for free
              </Link>
            </div>
            <div className="hero-reassurance">
              <span>No credit card</span>
              <span>Reviewed in 2 days</span>
              <span>Free for 12 months</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="homepage-section" id="included">
        <div className="shell">
          <SectionHeader
            eyebrow="What you get"
            title="Everything to start. Nothing to pay."
            lead="Year one, covered. Domain, hosting, and email at no cost to qualifying applicants."
            centered
          />
          <div className="wh-features-grid">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {included.map((item) => {
                const IconComponent = typeof item.icon === "string" ? null : item.icon;
                return (
                  <div key={item.title} className="wh-feature-card wh-feature-card--dii">
                    <div className="wh-feature-icon" style={{ background: item.bg, color: item.color }}>
                      {IconComponent ? <IconComponent size={20} /> : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                );
              })}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Who qualifies ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader eyebrow="Eligibility" title="Who qualifies?" centered />
          <div className="dii-who-grid">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {whoQualifies.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="dii-who-card">
                    <div className="dii-who-icon" aria-hidden="true">
                      <Icon size={22} />
                    </div>
                    <h3>{item.label}</h3>
                    <p>{item.description}</p>
                  </div>
                );
              })}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="homepage-section">
        <div className="shell">
          <SectionHeader eyebrow="The process" title="Three steps to go live." centered />
          <div className="steps-grid">
            <Slides inView inViewOnce direction="up" holdDelay={100}>
              {steps.map((step) => (
                <div key={step.number} className="step-card">
                  <div className="step-card__number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="how-step__time-badge" aria-label={`Time: ${step.time}`}>
                    <span className="how-step__time-dot" aria-hidden="true" />
                    {step.time}
                  </div>
                </div>
              ))}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Apply form ── */}
      <section className="homepage-section homepage-section--dark" id="apply">
        <div className="shell">
          <Fade inView inViewOnce>
            <div className="dii-apply-box">
              <h2>Apply for the Digital Identity Initiative</h2>
              <p>Applications are reviewed within 2 business days. Most qualifying applicants are approved.</p>
              {diiSubmitted ? (
                <div className="dii-success">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <h3>Application submitted.</h3>
                  <p>We will review your application and respond within 2 business days.</p>
                </div>
              ) : (
                <form
                  className="dii-form"
                  onSubmit={handleDiiSubmit}
                  noValidate
                >
                  <div className={`dii-form__row${diiErrors.name ? " dii-form__row--error" : ""}`}>
                    <label htmlFor={diiNameId}>Full name <span aria-hidden="true">*</span></label>
                    <input
                      id={diiNameId}
                      type="text"
                      placeholder="Your full name"
                      autoComplete="name"
                      value={diiName}
                      onChange={(e) => { setDiiName(e.target.value); setDiiErrors((p) => ({ ...p, name: undefined })); }}
                      aria-invalid={!!diiErrors.name}
                      aria-describedby={diiErrors.name ? `${diiNameId}-err` : undefined}
                    />
                    {diiErrors.name && (
                      <span id={`${diiNameId}-err`} className="dii-form__error" role="alert">
                        {diiErrors.name}
                      </span>
                    )}
                  </div>
                  <div className={`dii-form__row${diiErrors.email ? " dii-form__row--error" : ""}`}>
                    <label htmlFor={diiEmailId}>Email address <span aria-hidden="true">*</span></label>
                    <input
                      id={diiEmailId}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={diiEmail}
                      onChange={(e) => { setDiiEmail(e.target.value); setDiiErrors((p) => ({ ...p, email: undefined })); }}
                      aria-invalid={!!diiErrors.email}
                      aria-describedby={diiErrors.email ? `${diiEmailId}-err` : undefined}
                    />
                    {diiErrors.email && (
                      <span id={`${diiEmailId}-err`} className="dii-form__error" role="alert">
                        {diiErrors.email}
                      </span>
                    )}
                  </div>
                  <div className={`dii-form__row${diiErrors.category ? " dii-form__row--error" : ""}`}>
                    <label htmlFor={diiCategoryId}>Who are you? <span aria-hidden="true">*</span></label>
                    <select
                      id={diiCategoryId}
                      value={diiCategory}
                      onChange={(e) => { setDiiCategory(e.target.value); setDiiErrors((p) => ({ ...p, category: undefined })); }}
                      aria-invalid={!!diiErrors.category}
                      aria-describedby={diiErrors.category ? `${diiCategoryId}-err` : undefined}
                    >
                      <option value="">Select one</option>
                      <option value="founder">Founder or entrepreneur (under 24 months)</option>
                      <option value="student">Student or recent graduate</option>
                      <option value="freelancer">Freelancer or independent creator</option>
                      <option value="ngo">Non-profit or community organisation</option>
                    </select>
                    {diiErrors.category && (
                      <span id={`${diiCategoryId}-err`} className="dii-form__error" role="alert">
                        {diiErrors.category}
                      </span>
                    )}
                  </div>
                  <div className={`dii-form__row${diiErrors.why ? " dii-form__row--error" : ""}`}>
                    <label htmlFor={diiWhyId}>What will you use the website for? <span aria-hidden="true">*</span></label>
                    <textarea
                      id={diiWhyId}
                      placeholder="Briefly describe your project or business (2–4 sentences)"
                      rows={4}
                      value={diiWhy}
                      onChange={(e) => { setDiiWhy(e.target.value); setDiiErrors((p) => ({ ...p, why: undefined })); }}
                      aria-invalid={!!diiErrors.why}
                      aria-describedby={diiErrors.why ? `${diiWhyId}-err` : undefined}
                    />
                    {diiErrors.why && (
                      <span id={`${diiWhyId}-err`} className="dii-form__error" role="alert">
                        {diiErrors.why}
                      </span>
                    )}
                  </div>
                  <button type="submit" className="wh-btn-primary dii-submit">
                    Submit application
                  </button>
                  <p className="dii-form__note">
                    No credit card required. We will email you within 2 business days.
                  </p>
                </form>
              )}
            </div>
          </Fade>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader eyebrow="Questions" title="DII questions answered." centered />
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
    </main>
  );
}
