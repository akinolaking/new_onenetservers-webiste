"use client";

import Image from "next/image";
import { DomainSearch } from "@/components/primitives/DomainSearch";
import { useCurrency } from "@/lib/currency-context";
import type { Currency } from "@/lib/site-data";

const AVATARS = [
  { src: "/assets/avatar-a.svg", alt: "OneNet customer profile from Lagos" },
  { src: "/assets/avatar-b.svg", alt: "OneNet customer profile from London" },
  { src: "/assets/avatar-c.svg", alt: "OneNet customer profile from Abuja" },
];

const STARTING_PRICES: Record<Currency, { hosting: string; domains: string }> = {
  NGN: { hosting: "₦4,599/mo", domains: "₦8,650/yr" },
  GBP: { hosting: "£3.00/mo", domains: "£8.04/yr" },
  USD: { hosting: "$4.05/mo", domains: "$11.25/yr" },
};

const HERO_VIDEO_URL = "https://eu2.contabostorage.com/ea33529288244a5ba1392f473566ed15:panelalpha/onenetserversimagesfolders/onenet%20servers%20customer.webm";

export function Hero() {
  const { currency } = useCurrency();
  const prices = STARTING_PRICES[currency];

  return (
    <section className="hero-home" aria-label="Get your business online">
      <div className="hero-media" aria-hidden="true">
        <video className="hero-video" autoPlay loop muted playsInline preload="auto">
          <source src={HERO_VIDEO_URL} type="video/webm" />
        </video>
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner shell">

        <div className="hero-proof">
          <div className="hero-proof__avatars">
            {AVATARS.map((av, i) => (
              <Image
                key={i}
                src={av.src}
                alt={av.alt}
                width={36}
                height={36}
                className="hero-proof__avatar"
              />
            ))}
          </div>
          <span className="hero-proof__play" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 2.5L11 7L3 11.5V2.5Z" />
            </svg>
          </span>
          <p>Join 500+ businesses already live with OneNet Servers</p>
        </div>

        <h1 className="hero-h1">
          Get your business online
        </h1>

        <p className="hero-sub">
          Launch your website in under 10&nbsp;minutes. No developer, no stress.
        </p>

        <div className="hero-search-row">
          <div className="hero-search-wrap">
            <DomainSearch />
          </div>
          <p className="hero-price-anchor">
            Hosting from <strong>{prices.hosting}</strong><br />
            Domains from <strong>{prices.domains}</strong>
          </p>
        </div>

      </div>
    </section>
  );
}
