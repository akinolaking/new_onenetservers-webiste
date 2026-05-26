"use client";

import Link from "next/link";
import { Fade } from "@/components/animate-ui/primitives/effects/fade";
import { Slides } from "@/components/animate-ui/primitives/effects/slide";
import { Shine } from "@/components/animate-ui/primitives/effects/shine";
import { services } from "@/lib/home-data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { useCurrency } from "@/lib/currency-context";
import type { Currency } from "@/lib/site-data";

function resolveServiceHref(href: string) {
  return href;
}

export function ServicesGrid() {
  const { currency } = useCurrency();

  return (
    <section className="homepage-section" id="services">
      <div className="shell">
        <Fade inView inViewOnce>
          <SectionHeader
            eyebrow="What we offer"
            title="Everything to put your business online."
            lead="From your first domain to a fully managed AI-powered stack. Built for serious builders in Lagos, London, and everywhere in between."
          />
        </Fade>

        <div className="services-grid">
          <Slides inView inViewOnce direction="up" holdDelay={80}>
            {services.map((service) => {
              const price = service.price[currency as Currency] ?? service.price.USD;
              const href = resolveServiceHref(service.href);
              return ("featured" in service && service.featured) ? (
                <Shine key={service.title} enableOnHover color="#4343f0" opacity={0.08}>
                  <article className="service-card service-card--featured">
                    <div className="service-card__tag">{service.tag}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="service-card__meta">
                      <strong className="service-card__price">{price}</strong>
                    </div>
                    <Link href={href} className="service-card__cta service-card__cta--featured">
                      {service.cta}
                    </Link>
                  </article>
                </Shine>
              ) : (
                <article key={service.title} className="service-card">
                  <div className="service-card__tag">{service.tag}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-card__meta">
                    <strong className="service-card__price">{price}</strong>
                  </div>
                  <Link href={href} className="service-card__cta">
                    {service.cta}
                  </Link>
                </article>
              );
            })}
          </Slides>
        </div>
      </div>
    </section>
  );
}
