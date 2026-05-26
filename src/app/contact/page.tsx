"use client";

import { useId, useState } from "react";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { openBrevoChat } from "@/lib/live-chat";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const channels = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    label: "Live chat",
    detail: "Fastest response. Available on every page.",
    action: "Start chat",
    href: "#chat",
    color: "var(--blue)",
    bg: "var(--blue-xl)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email support",
    detail: "support@onenetservers.net · Response within 2 hours.",
    action: "Send email",
    href: "mailto:support@onenetservers.net",
    color: "#10b981",
    bg: "rgb(16 185 129 / 12%)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.02-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Nigeria",
    detail: "+234 201 330 9154",
    action: "Call Lagos",
    href: "tel:+2342013309154",
    color: "#d97706",
    bg: "rgb(245 158 11 / 10%)",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.02-1.02a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "United Kingdom",
    detail: "+44 7333 880 7775",
    action: "Call London",
    href: "tel:+447333880775",
    color: "#7c3aed",
    bg: "rgb(124 58 237 / 10%)",
  },
];

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  function validateContactForm(form: HTMLFormElement): FormErrors {
    const errs: FormErrors = {};
    const name = (form.elements.namedItem("cf-name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("cf-email") as HTMLInputElement)?.value.trim();
    const subject = (form.elements.namedItem("cf-subject") as HTMLSelectElement)?.value;
    const message = (form.elements.namedItem("cf-message") as HTMLTextAreaElement)?.value.trim();

    if (!name) errs.name = "Full name is required.";
    if (!email) {
      errs.email = "Email address is required.";
    } else if (!EMAIL_RE.test(email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!subject) errs.subject = "Please select a topic.";
    if (!message) errs.message = "Message is required.";
    return errs;
  }

  return (
    <main className="page-shell">
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="shell">
          <Fade inView inViewOnce className="about-hero__inner">
            <div className="eyebrow eyebrow--centered">Contact us</div>
            <h1>We&apos;re here. Talk to a human.</h1>
            <p className="hero-sub">
              Real engineers from Lagos and London. Not bots. Not offshore scripts.
              Average response under 2 hours.
            </p>
          </Fade>
        </div>
      </section>

      {/* ── Channels ── */}
      <section className="homepage-section">
        <div className="shell">
          <div className="contact-channels">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {channels.map((ch) => {
                const content = (
                  <>
                    <div className="contact-channel-icon" style={{ background: ch.bg, color: ch.color }}>
                      {ch.icon}
                    </div>
                    <div className="contact-channel-body">
                      <strong>{ch.label}</strong>
                      <span>{ch.detail}</span>
                    </div>
                    <span className="contact-channel-action">{ch.action} →</span>
                  </>
                );

                if (ch.href === "#chat") {
                  return (
                    <button key={ch.label} type="button" className="contact-channel-card" onClick={openBrevoChat}>
                      {content}
                    </button>
                  );
                }

                return (
                  <a key={ch.label} href={ch.href} className="contact-channel-card">
                    {content}
                  </a>
                );
              })}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="homepage-section homepage-section--tinted">
        <div className="shell">
          <SectionHeader eyebrow="Get in touch" title="Send us a message." centered />
          <Fade inView inViewOnce>
            {submitted ? (
              <div className="contact-success">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <h3>Message sent.</h3>
                <p>We&apos;ll get back to you within 2 hours during business hours.</p>
              </div>
            ) : (
              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const errs = validateContactForm(e.currentTarget as HTMLFormElement);
                  if (Object.keys(errs).length > 0) {
                    setFormErrors(errs);
                    return;
                  }
                  setFormErrors({});
                  setSubmitted(true);
                }}
                noValidate
              >
                <div className="contact-form__row contact-form__row--2col">
                  <div className={`contact-form__field${formErrors.name ? " contact-form__field--error" : ""}`}>
                    <label htmlFor={nameId}>Full name <span aria-hidden="true">*</span></label>
                    <input
                      id={nameId}
                      name="cf-name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? `${nameId}-err` : undefined}
                      onChange={() => setFormErrors((p) => ({ ...p, name: undefined }))}
                    />
                    {formErrors.name && (
                      <span id={`${nameId}-err`} className="contact-form__error" role="alert">
                        {formErrors.name}
                      </span>
                    )}
                  </div>
                  <div className={`contact-form__field${formErrors.email ? " contact-form__field--error" : ""}`}>
                    <label htmlFor={emailId}>Email address <span aria-hidden="true">*</span></label>
                    <input
                      id={emailId}
                      name="cf-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? `${emailId}-err` : undefined}
                      onChange={() => setFormErrors((p) => ({ ...p, email: undefined }))}
                    />
                    {formErrors.email && (
                      <span id={`${emailId}-err`} className="contact-form__error" role="alert">
                        {formErrors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`contact-form__field${formErrors.subject ? " contact-form__field--error" : ""}`}>
                  <label htmlFor={subjectId}>Subject <span aria-hidden="true">*</span></label>
                  <select
                    id={subjectId}
                    name="cf-subject"
                    aria-invalid={!!formErrors.subject}
                    aria-describedby={formErrors.subject ? `${subjectId}-err` : undefined}
                    onChange={() => setFormErrors((p) => ({ ...p, subject: undefined }))}
                  >
                    <option value="">Select a topic</option>
                    <option value="sales">Sales enquiry</option>
                    <option value="support">Technical support</option>
                    <option value="billing">Billing</option>
                    <option value="dii">Digital Identity Initiative</option>
                    <option value="partners">Partnerships</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.subject && (
                    <span id={`${subjectId}-err`} className="contact-form__error" role="alert">
                      {formErrors.subject}
                    </span>
                  )}
                </div>
                <div className={`contact-form__field${formErrors.message ? " contact-form__field--error" : ""}`}>
                  <label htmlFor={messageId}>Message <span aria-hidden="true">*</span></label>
                  <textarea
                    id={messageId}
                    name="cf-message"
                    placeholder="How can we help?"
                    rows={5}
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? `${messageId}-err` : undefined}
                    onChange={() => setFormErrors((p) => ({ ...p, message: undefined }))}
                  />
                  {formErrors.message && (
                    <span id={`${messageId}-err`} className="contact-form__error" role="alert">
                      {formErrors.message}
                    </span>
                  )}
                </div>
                <button type="submit" className="wh-btn-primary contact-submit">
                  Send message
                </button>
                <p className="dii-form__note">
                  We respond within 2 hours during business hours (WAT and GMT).
                </p>
              </form>
            )}
          </Fade>
        </div>
      </section>

      {/* ── Office info ── */}
      <section className="homepage-section">
        <div className="shell">
          <div className="contact-offices">
            <Fade inView inViewOnce>
              <div className="contact-office">
                <div className="contact-office__flag" aria-hidden="true">
                  <svg width="36" height="24" viewBox="0 0 30 20" aria-label="Nigeria flag" role="img">
                    <rect width="10" height="20" fill="#008751" />
                    <rect x="10" width="10" height="20" fill="#ffffff" />
                    <rect x="20" width="10" height="20" fill="#008751" />
                  </svg>
                </div>
                <h3>Lagos, Nigeria</h3>
                <p>+234 201 330 9154</p>
                <p>ConqolX Technologies Limited<br />RC: 1775966 · SCUML Registered</p>
              </div>
            </Fade>
            <Fade inView inViewOnce delay={120}>
              <div className="contact-office">
                <div className="contact-office__flag" aria-hidden="true">
                  <svg width="36" height="22" viewBox="0 0 60 36" aria-label="United Kingdom flag" role="img">
                    <rect width="60" height="36" fill="#012169" />
                    <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6" />
                    <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="4" />
                    <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="10" />
                    <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="6" />
                  </svg>
                </div>
                <h3>London, United Kingdom</h3>
                <p>+44 7333 880 7775</p>
                <p>ConqolX Technologies Limited<br />RC: 14565201 (England &amp; Wales)</p>
              </div>
            </Fade>
            <Fade inView inViewOnce delay={240}>
              <div className="contact-office">
                <div className="contact-office__flag" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-label="Email support" role="img">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3>Email & Support</h3>
                <p><a href="mailto:support@onenetservers.net">support@onenetservers.net</a></p>
                <p>24/7 ticket system.<br />Response under 2 hours.</p>
              </div>
            </Fade>
          </div>
        </div>
      </section>
    </main>
  );
}
