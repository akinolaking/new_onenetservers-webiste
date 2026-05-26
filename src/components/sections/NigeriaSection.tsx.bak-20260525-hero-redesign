"use client";

import Link from "next/link";
import { Slide, Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { nigeriaPoints } from "@/lib/home-data";

/* SVG flag icons — no emoji (UI/UX Pro Max: no-emoji-icons) */
function FlagNG({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.67} viewBox="0 0 30 20" aria-label="Nigeria flag" role="img">
      <rect width="10" height="20" fill="#008751" />
      <rect x="10" width="10" height="20" fill="#ffffff" />
      <rect x="20" width="10" height="20" fill="#008751" />
    </svg>
  );
}

function FlagUK({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 60 36" aria-label="United Kingdom flag" role="img">
      <rect width="60" height="36" fill="#012169" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export function NigeriaSection() {
  return (
    <section className="homepage-section homepage-section--dark" id="nigeria">
      <div className="shell">
        {/* Centered header: flags + heading + lead */}
        <Fade inView inViewOnce>
          <div className="nigeria-header">
            <div className="nigeria-flags" aria-label="Nigeria and United Kingdom">
              <FlagNG size={32} />
              <span className="nigeria-flags__sep" aria-hidden="true">+</span>
              <FlagUK size={32} />
            </div>
            <h2 className="nigeria-heading">
              Built for Nigeria.<br />Powered from London.
            </h2>
            <p className="nigeria-lead">
              The only UK-registered hosting provider with NiRA accreditation, Naira billing via Paystack, and .ng domain expertise. No conversion fees. No workarounds.
            </p>
          </div>
        </Fade>

        {/* Two-column grid: left = bullet cards, right = panel */}
        <div className="nigeria-grid">
          {/* Left: feature cards */}
          <div className="nigeria-points">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {nigeriaPoints.map((point, i) => (
                <div key={i} className="nigeria-point">
                  <CheckIcon />
                  {point}
                </div>
              ))}
            </Slides>
          </div>

          {/* Right: advantage panel */}
          <div>
            <Slide inView inViewOnce direction="up" delay={150}>
              <Shine enableOnHover color="#4343f0" opacity={0.12}>
                <div className="nigeria-panel">
                  <div className="nigeria-panel__accred">
                    <ShieldIcon />
                    NiRA Accredited Registrar
                  </div>

                  <h3>Your Nigeria-first advantage</h3>

                  <ul className="nigeria-panel__list">
                    <li>
                      <CheckIcon />
                      Direct .ng and .com.ng registration, no middleman
                    </li>
                    <li>
                      <CheckIcon />
                      Naira billing via Paystack: cards, USSD, bank transfer, Verve
                    </li>
                    <li>
                      <CheckIcon />
                      Support team that understands WAT hours and local needs
                    </li>
                    <li>
                      <CheckIcon />
                      SCUML registered, compliant under Nigerian law
                    </li>
                    <li>
                      <CheckIcon />
                      Digital Identity Initiative: free first year for qualifying founders
                    </li>
                  </ul>

                  <div className="nigeria-panel__actions">
                    <Link href="/domains" className="nigeria-cta-primary">
                      Get your .ng domain →
                    </Link>
                    <Link href="/digital-identity" className="nigeria-cta-secondary">
                      Apply for free year
                    </Link>
                  </div>
                </div>
              </Shine>
            </Slide>
          </div>
        </div>
      </div>
    </section>
  );
}
