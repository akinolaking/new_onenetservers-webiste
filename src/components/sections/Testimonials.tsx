"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useRef, useState } from "react";

const FEATURED_SLIDES = [
  {
    slug: "baytree",
    domain: "baytreeng.com",
    name: "Baytree",
    role: "E-commerce brand",
    quoteLead: "Baytree's storefront feels instant on every device.",
    quoteBody:
      "Products, images, and checkout stay quick enough to keep browsing smooth for shoppers across Nigeria and the UK.",
    href: "https://baytreeng.com",
    tone: "violet",
  },
  {
    slug: "rogertomlinson",
    domain: "rogertomlinsonltd.com",
    name: "Roger Tomlinson Ltd",
    role: "Professional services · United Kingdom",
    quoteLead: "Our UK clients trust the speed and uptime.",
    quoteBody:
      "The experience feels stable, polished, and dependable every time someone lands on the site or reaches out.",
    href: "https://rogertomlinsonltd.com",
    tone: "blue",
  },
  {
    slug: "bitgifty",
    domain: "bitgifty.com",
    name: "Bitgifty",
    role: "Fintech platform",
    quoteLead: "Scaling fintech traffic has been effortless.",
    quoteBody:
      "As usage grows, the platform keeps feeling fast and resilient instead of fragile under pressure.",
    href: "https://bitgifty.com",
    tone: "black",
  },
  {
    slug: "desdistrict",
    domain: "desdistrict.com",
    name: "Des District",
    role: "Fashion brand",
    quoteLead: "Our lookbook loads beautifully, worldwide.",
    quoteBody:
      "The visual quality holds up while pages stay responsive, which matters when design is part of the product.",
    href: "https://desdistrict.com",
    tone: "green",
  },
  {
    slug: "vnest",
    domain: "vnest.ng",
    name: "VNest",
    role: "Community platform · Nigeria",
    quoteLead: "Reliable hosting our members can count on.",
    quoteBody:
      "The site stays available for members, updates cleanly, and gives the team confidence when activity spikes.",
    href: "https://vnest.ng",
    tone: "indigo",
  },
] as const;

const SHOWCASE_ITEMS = {
  baytree: {
    slug: "baytree",
    name: "Baytree",
    href: "https://baytreeng.com",
    alt: "Website made on OneNet Servers — Baytree",
  },
  veeb: {
    slug: "veeb",
    name: "Veeb",
    href: "https://veeb.site",
    alt: "Website made on OneNet Servers — Veeb",
  },
  rogertomlinson: {
    slug: "rogertomlinson",
    name: "Roger Tomlinson Ltd",
    href: "https://rogertomlinsonltd.com",
    alt: "Website made on OneNet Servers — Roger Tomlinson Ltd",
  },
  reliancecapital: {
    slug: "reliancecapital",
    name: "Reliance Capital",
    href: "https://reliancecapitalng.com",
    alt: "Website made on OneNet Servers — Reliance Capital",
  },
  kunie: {
    slug: "kunie",
    name: "Kunie",
    href: "https://kunie.org",
    alt: "Website made on OneNet Servers — Kunie",
  },
  foci: {
    slug: "foci",
    name: "FOCI",
    href: "https://foci.ng",
    alt: "Website made on OneNet Servers — FOCI",
  },
  vnest: {
    slug: "vnest",
    name: "VNest",
    href: "https://vnest.ng",
    alt: "Website made on OneNet Servers — VNest",
  },
  desdistrict: {
    slug: "desdistrict",
    name: "Des District",
    href: "https://desdistrict.com",
    alt: "Website made on OneNet Servers — Des District",
  },
  bitgifty: {
    slug: "bitgifty",
    name: "Bitgifty",
    href: "https://bitgifty.com",
    alt: "Website made on OneNet Servers — Bitgifty",
  },
} as const;

const SHOWCASE_ROW = [
  SHOWCASE_ITEMS.baytree,
  SHOWCASE_ITEMS.veeb,
  SHOWCASE_ITEMS.rogertomlinson,
  SHOWCASE_ITEMS.reliancecapital,
  SHOWCASE_ITEMS.foci,
  SHOWCASE_ITEMS.vnest,
  SHOWCASE_ITEMS.desdistrict,
  SHOWCASE_ITEMS.bitgifty,
] as const;

function QuoteGlyph() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M16.2 11.4c-5 2.1-8.2 6-8.2 11.8 0 4.5 3 7.9 7.1 7.9 3.8 0 6.5-2.8 6.5-6.8 0-4-2.5-6.3-6-6.7.5-2.1 2.2-4 4.9-5.6l-4.3-.6Zm15.2 0c-5 2.1-8.2 6-8.2 11.8 0 4.5 3 7.9 7.1 7.9 3.8 0 6.5-2.8 6.5-6.8 0-4-2.5-6.3-6-6.7.5-2.1 2.2-4 4.9-5.6l-4.3-.6Z" fill="currentColor" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return direction === "prev" ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function BrowserShot({ slug, alt }: { slug: string; alt: string }) {
  return (
    <picture>
      <source srcSet={`/assets/clients-showcase/${slug}.webp`} type="image/webp" />
      <img
        src={`/assets/clients-showcase/${slug}.jpg`}
        alt={alt}
        loading="lazy"
        className="clients-shot__img"
      />
    </picture>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", skipSnaps: false });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();

    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    sync();
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);

    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  const showcaseRow = useMemo(() => (reduceMotion ? [...SHOWCASE_ROW] : [...SHOWCASE_ROW, ...SHOWCASE_ROW]), [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={`clients-section${isVisible ? " is-visible" : ""}${reduceMotion ? " is-reduced-motion" : ""}`}
      id="clients"
      aria-labelledby="clients-title"
    >
      <span id="testimonials" className="clients-section__legacy-anchor" aria-hidden="true" />

      <div className="shell clients-section__shell">
        <header className="clients-section__hero">
          <span className="clients-section__badge">Testimonials</span>
          <h2 id="clients-title" className="clients-section__title">What clients say</h2>
          <p className="clients-section__lead">Trusted by builders across two continents.</p>
          <a href="#pricing" className="clients-section__cta">Get started</a>
        </header>

        <div className="clients-carousel" role="region" aria-roledescription="carousel" aria-label="Client testimonials carousel">
          <div className="clients-carousel__viewport" ref={emblaRef}>
            <div className="clients-carousel__track">
              {FEATURED_SLIDES.map((slide, index) => (
                <div className="clients-carousel__slide" key={slide.slug} aria-roledescription="slide" aria-label={`${index + 1} of ${FEATURED_SLIDES.length}`}>
                  <a
                    href={slide.href}
                    target="_blank"
                    rel="noopener"
                    className={`clients-spotlight clients-spotlight--${slide.tone}`}
                  >
                    <div className="clients-spotlight__grid">
                      <div className="clients-spotlight__copy">
                        <span className="clients-spotlight__icon"><QuoteGlyph /></span>
                        <div className="clients-spotlight__quote">
                          <p>{slide.quoteLead}</p>
                          <p>{slide.quoteBody}</p>
                        </div>
                        <div className="clients-spotlight__meta">
                          <strong>{slide.domain}</strong>
                          <span>{slide.role}</span>
                        </div>
                      </div>

                      <div className="clients-spotlight__media">
                        <div className="clients-browser-shot">
                          <div className="clients-browser-shot__bar" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                          </div>
                          <BrowserShot slug={slide.slug} alt={`Live customer website preview — ${slide.name}`} />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          <p className="clients-visually-hidden" aria-live="polite">
            Slide {selectedIndex + 1} of {FEATURED_SLIDES.length}: {FEATURED_SLIDES[selectedIndex]?.domain}
          </p>

          <div className="clients-carousel__controls">
            <button
              type="button"
              className="clients-carousel__control"
              aria-label="Previous slide"
              aria-controls="clients-title"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
            >
              <ArrowIcon direction="prev" />
            </button>
            <button
              type="button"
              className="clients-carousel__control"
              aria-label="Next slide"
              aria-controls="clients-title"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
            >
              <ArrowIcon direction="next" />
            </button>
          </div>
        </div>
      </div>

      <div className="clients-showcase" aria-label="Customer websites showcase">
        <div className="clients-showcase__row clients-showcase__row--forward">
          <div className="clients-showcase__rail">
            {showcaseRow.map((site, index) => (
              <a key={`${site.slug}-${index}`} href={site.href} target="_blank" rel="noopener" className="clients-showcase__card">
                <BrowserShot slug={site.slug} alt={site.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
