"use client";

import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { newSteps } from "@/lib/home-data";

const STEP_ICONS = [
  /* search / domain */
  <svg key="s" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>,
  /* template / grid */
  <svg key="t" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>,
  /* rocket / publish */
  <svg key="r" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>,
];

export function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works">
      <div className="shell">
        <Fade inView inViewOnce>
          <div className="section-header section-header--centered">
            <div className="eyebrow eyebrow--centered">Getting started</div>
            <h2>From idea to online in minutes and success.</h2>
            <p className="lead">
              No technical knowledge required. We handle setup, then hand you the keys.
            </p>
          </div>
        </Fade>

        <div className="how-steps" role="list" aria-label="Steps to go live" style={{ position: "relative" }}>
          <div className="how-connector" aria-hidden="true" />
          {newSteps.map((step, i) => (
            <Fade key={step.number} inView inViewOnce delay={i * 140}>
              <div className="how-step" role="listitem">
                <div className="how-step__icon-wrap">
                  <div className="how-step__icon" aria-hidden="true">{STEP_ICONS[i]}</div>
                  <div className="how-step__num" aria-hidden="true">{step.number}</div>
                </div>
                <div className="how-step__body">
                  <h3 className="how-step__title">{step.title}</h3>
                  <p className="how-step__desc">{step.description}</p>
                  <div className="how-step__time-badge" aria-label={`Time: ${step.time}`}>
                    <span className="how-step__time-dot" aria-hidden="true" />
                    {step.time}
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        <Fade inView inViewOnce delay={500}>
          <div className="how-total-row">
            <span className="how-total-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Total: under 10 minutes
            </span>
            <span className="how-total-note">No developer. No waiting. Just you and your business.</span>
          </div>
        </Fade>
      </div>
    </section>
  );
}
