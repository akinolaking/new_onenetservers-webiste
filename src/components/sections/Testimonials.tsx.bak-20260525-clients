"use client";

import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { quoteTestimonials } from "@/lib/home-data";
import { SectionHeader } from "@/components/shared/SectionHeader";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="quote-card__stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="homepage-section homepage-section--tinted" id="testimonials">
      <div className="shell">
        <SectionHeader
          eyebrow="What clients say"
          title="Trusted by builders across two continents."
          centered
        />

        <div className="quote-grid">
          <Slides inView inViewOnce direction="up" holdDelay={100}>
            {quoteTestimonials.map((t) => (
              <article key={t.name} className="quote-card">
                <span className="quote-card__glyph" aria-hidden="true">&ldquo;</span>
                <p className="quote-card__text">{t.quote}</p>
                <footer className="quote-card__footer">
                  <div className="quote-card__dot" aria-hidden="true" />
                  <div>
                    <strong className="quote-card__name">{t.name}</strong>
                    <span className="quote-card__meta">{t.role} · {t.location}</span>
                  </div>
                </footer>
                <StarRating />
              </article>
            ))}
          </Slides>
        </div>
      </div>
    </section>
  );
}
