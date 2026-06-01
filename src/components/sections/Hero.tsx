"use client";

import Image from "next/image";
import { useState } from "react";
import { DomainSearch } from "@/components/primitives/DomainSearch";
import { useCurrency } from "@/lib/currency-context";
import type { Currency } from "@/lib/site-data";

const AVATARS = [
  { src: "https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Ada", name: "Ada", role: "Entrepreneur" },
  { src: "https://plus.unsplash.com/premium_photo-1759569361991-ff009a99e98c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Emeka", name: "Emeka", role: "Business Owner" },
  { src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Seun", name: "Seun", role: "Freelancer" },
];

const STARTING_PRICES: Record<Currency, { hosting: string; domains: string }> = {
  NGN: { hosting: "₦4,599/mo", domains: "₦8,650/yr" },
  GBP: { hosting: "£3.00/mo", domains: "£8.04/yr" },
  USD: { hosting: "$4.05/mo", domains: "$11.25/yr" },
};

const HERO_VIDEO_URL = "https://eu2.contabostorage.com/ea33529288244a5ba1392f473566ed15:panelalpha/onenetserversimagesfolders/onenet%20servers%20customer.webm";

type TooltipState = { name: string; role: string; x: number; y: number } | null;

export function Hero() {
  const { currency } = useCurrency();
  const prices = STARTING_PRICES[currency];
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  function handleAvatarEnter(e: React.MouseEvent<HTMLDivElement>, av: typeof AVATARS[0]) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      name: av.name,
      role: av.role,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }

  return (
    <section className="hero-home" aria-label="Get your business online">
      <div className="hero-media" aria-hidden="true">
        <video className="hero-video" autoPlay loop muted playsInline preload="auto">
          <source src={HERO_VIDEO_URL} type="video/webm" />
        </video>
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner shell">

        {/* Centered content block */}
        <div className="hero-content">
          <div className="hero-proof">
            <div className="hero-proof__avatars">
              {AVATARS.map((av, i) => (
                <div
                  key={i}
                  className="hero-proof__item"
                  onMouseEnter={(e) => handleAvatarEnter(e, av)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <Image
                    src={av.src}
                    alt={av.alt}
                    width={30}
                    height={30}
                    className="hero-proof__avatar"
                  />
                </div>
              ))}
            </div>
            <p>Join 500+ businesses already live with OneNet Servers</p>
          </div>

          <h1 className="hero-h1">
            Get your business online
          </h1>

          <p className="hero-sub">
            Launch your website in under 10&nbsp;minutes. No developer, no stress.
          </p>
        </div>

        {/* Search pinned to base */}
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

      {/* Fixed tooltip — rendered outside stacking contexts, never clipped */}
      {tooltip && (
        <div
          className="hero-proof__tooltip"
          style={{
            position: "fixed",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translateX(-50%) translateY(calc(-100% - 10px))",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <strong>{tooltip.name}</strong>
          <em>{tooltip.role}</em>
        </div>
      )}
    </section>
  );
}
