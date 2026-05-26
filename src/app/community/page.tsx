"use client";

import Link from "next/link";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { SectionHeader } from "@/components/shared/SectionHeader";

const events = [
  {
    date: "May 2026",
    title: "AI Tools for Small Business",
    description: "Practical walkthrough of AI tools any business owner can use today: content creation, customer support, automation, and more. No technical background required.",
    location: "Lagos (hybrid)",
    tag: "Workshop",
    sdg: "SDG 8",
  },
  {
    date: "June 2026",
    title: "Building Your Digital Identity",
    description: "From registering a domain to launching a professional website in an afternoon. Live build session with Q&A. Aimed at first-time founders and freelancers.",
    location: "Online",
    tag: "Live session",
    sdg: "SDG 4",
  },
  {
    date: "July 2026",
    title: "Internet Infrastructure for Builders",
    description: "How the internet actually works: DNS, hosting, SSL, and email deliverability. For founders who want to stop guessing and start understanding.",
    location: "London (hybrid)",
    tag: "Talk",
    sdg: "SDG 10",
  },
  {
    date: "August 2026",
    title: "Women Building Africa's Digital Future",
    description: "A panel and networking event bringing together women founders and tech professionals building businesses and communities across Africa and the UK.",
    location: "Lagos (in-person)",
    tag: "Panel + Networking",
    sdg: "SDG 10",
  },
];

const pillars = [
  {
    sdg: "SDG 4",
    label: "Quality Education",
    body: "Free events and resources to help any builder understand the internet, digital tools, and how to use them for their business.",
    color: "#e11d48",
    bg: "#fff1f2",
  },
  {
    sdg: "SDG 8",
    label: "Decent Work & Economic Growth",
    body: "Practical sessions on launching a business online, reaching new customers, and building income through digital channels.",
    color: "#d97706",
    bg: "#fffbeb",
  },
  {
    sdg: "SDG 10",
    label: "Reduced Inequalities",
    body: "The internet should be accessible to every builder regardless of geography, gender, or income level. Our programme actively works towards that.",
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
];

export default function CommunityPage() {
  return (
    <main className="page-shell">
      {/* ── Hero ── */}
      <section className="wh-hero">
        <div className="shell">
          <Fade inView inViewOnce className="wh-hero__inner">
            <div className="wh-trust-strip">
              <Slides inView inViewOnce direction="up" holdDelay={60}>
                {["SDG 4", "SDG 8", "SDG 10", "Lagos · London", "Free to attend"].map((item) => (
                  <span key={item} className="wh-trust-badge">{item}</span>
                ))}
              </Slides>
            </div>
            <h1>Future of Productivity.<br />Community for builders.</h1>
            <p className="hero-sub">
              Monthly events on AI, digital identity, and internet infrastructure, open to all
              builders. Lagos. London. Online.
            </p>
            <div className="hero-actions">
              <Link href="#events" className="wh-btn-primary">
                View upcoming events
              </Link>
            </div>
            <div className="hero-reassurance">
              <span>Free to attend</span>
              <span>Online and in-person</span>
              <span>SDG 4 · 8 · 10 aligned</span>
            </div>
          </Fade>
        </div>
      </section>

      {/* ── SDG pillars ── */}
      <section className="homepage-section">
        <div className="shell">
          <SectionHeader
            eyebrow="Our purpose"
            title="Why we run this programme."
            lead="Every event is designed to reduce the gap between those who can access the internet economy and those who can't."
            centered
          />
          <div className="comm-pillars">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {pillars.map((p) => (
                <div key={p.sdg} className="comm-pillar-card" style={{ borderTopColor: p.color }}>
                  <div className="comm-pillar-sdg" style={{ background: p.bg, color: p.color }}>{p.sdg}</div>
                  <h3>{p.label}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Upcoming events ── */}
      <section className="homepage-section homepage-section--tinted" id="events">
        <div className="shell">
          <SectionHeader eyebrow="Upcoming events" title="Join us. Learn. Build." centered />
          <div className="comm-events-list">
            <Slides inView inViewOnce direction="up" holdDelay={80}>
              {events.map((ev) => (
                <Shine key={ev.title} enableOnHover color="#4343f0" opacity={0.06}>
                  <article className="comm-event-card">
                    <div className="comm-event-card__top">
                      <div className="comm-event-card__tags">
                        <span className="comm-event-tag">{ev.tag}</span>
                        <span className="comm-event-sdg">{ev.sdg}</span>
                      </div>
                      <div className="comm-event-card__date">{ev.date}</div>
                    </div>
                    <h3>{ev.title}</h3>
                    <p>{ev.description}</p>
                    <div className="comm-event-card__footer">
                      <span className="comm-event-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {ev.location}
                      </span>
                      <Link href="#register" className="comm-event-link">
                        Register interest →
                      </Link>
                    </div>
                  </article>
                </Shine>
              ))}
            </Slides>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="homepage-section">
        <div className="shell">
          <Fade inView inViewOnce>
            <div className="comm-partner-box">
              <h2>Want to sponsor or partner with us?</h2>
              <p>
                Businesses, communities, accelerators, and universities who share our mission can partner with Future of Productivity.
                Approved partners may also be eligible for the Digital Growth Credit (DGC) programme.
              </p>
              <div className="hero-actions" style={{ marginTop: 20 }}>
                <Link href="/partners" className="wh-btn-primary">
                  Apply to partner
                </Link>
                <Link href="/digital-identity" className="diff-cta-btn diff-cta-btn--ghost" style={{ marginLeft: 12 }}>
                  Digital Identity Initiative →
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
