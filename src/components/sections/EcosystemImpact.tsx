"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, type KeyboardEvent } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";

const TABS = [
  {
    key: "itana",
    label: "Itana x OneNet Servers",
    title: "Itana x OneNet Servers",
    body: "Part of our Digital Growth Credit Campaign, this partnership empowers startups with the infrastructure and capital they need to scale across Africa.",
    ctaLabel: "Read the story",
    href: "https://techcabal.com/2026/04/22/onenet-servers/",
    external: true,
    image: "/assets/ecosystem/itana-onenet.png",
    alt: "Itana and OneNet Servers partnership campaign visual",
    note: "Partnership spotlight",
  },
  {
    key: "uk-africa",
    label: "UK–Africa Startup",
    title: "Africa Centre LAN x Itana",
    body: "A London-based event we attended as part of our commitment to promoting investment in Africa's startup ecosystem and strengthening UK–Africa business ties.",
    ctaLabel: "See event highlights",
    href: "https://www.instagram.com/londonafricanetwork/",
    external: true,
    image: "/assets/ecosystem/uk-africa-startup.jpg",
    alt: "OneNet Servers team at a UK-Africa startup ecosystem event in London",
    note: "Ecosystem event",
  },
  {
    key: "productivity",
    label: "Future of Productivity",
    title: "Future of Productivity",
    body: "Our virtual tech event spotlighting how AI and emerging technologies are reshaping how teams build, collaborate, and grow.",
    ctaLabel: "Watch the event",
    href: "https://luma.com/onenetservers",
    external: true,
    image: "/assets/ecosystem/future-productivity.png",
    alt: "Future of Productivity event promotional visual",
    note: "Virtual event",
  },
  {
    key: "social-impact",
    label: "Social Impact",
    title: "TheProjectArk",
    body: "We partnered with and hosted TheProjectArk, a social impact NGO that fed over 5,000 families during COVID-19. Recognized by the Lagos State Government, it continues to drive meaningful change across Lagos.",
    ctaLabel: "Learn about the initiative",
    href: "https://theprojectark.com.ng",
    external: true,
    image: "/assets/ecosystem/projectark.jpg",
    alt: "TheProjectArk social impact initiative visual",
    note: "Impact initiative",
  },
  {
    key: "black-creatives",
    label: "Black Creatives",
    title: "Black Creative Trailblazers x Sister Manchester",
    body: "A curated day designed to support, equip, and connect Black creatives across music, visual arts, poetry, dance, fashion, photography, content creation, and creative entrepreneurship — rooted in empowerment, access, and practical growth.",
    ctaLabel: "Explore the event",
    href: "https://www.instagram.com/blackcreativetrailblazers",
    external: true,
    image: "/assets/ecosystem/black-creatives.jpg",
    alt: "Black Creative Trailblazers event group photo",
    note: "Creative community",
  },
] as const;

export function EcosystemImpact() {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const activeTab = TABS[activeIndex];

  function focusTab(index: number) {
    const tab = document.getElementById(`${baseId}-tab-${index}`);
    tab?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = TABS.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    requestAnimationFrame(() => focusTab(nextIndex));
  }

  return (
    <section className="homepage-section ecosystem-impact" id="ecosystem-impact">
      <div className="shell ecosystem-impact__shell">
        <SectionHeader
          eyebrow="Ecosystem impact"
          title="Our Impact Across the Startup and Tech Ecosystem"
          lead="Partnerships, events, and initiatives shaping the future of tech, business, and community."
          centered
        />

        <div className="ecosystem-impact__tabs" role="tablist" aria-label="Our impact stories">
          {TABS.map((tab, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.key}
                id={`${baseId}-tab-${index}`}
                className={`ecosystem-impact__tab ${isActive ? "is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel-${index}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          key={activeTab.key}
          id={`${baseId}-panel-${activeIndex}`}
          className="ecosystem-impact__panel"
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeIndex}`}
        >
          <div className="ecosystem-impact__media">
            <div className="ecosystem-impact__image-frame">
              <Image
                src={activeTab.image}
                alt={activeTab.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 52vw, 640px"
                className="ecosystem-impact__image"
              />
            </div>
          </div>

          <div className="ecosystem-impact__content">
            <div className="ecosystem-impact__kicker">{activeTab.note}</div>
            <h3>{activeTab.title}</h3>
            <p>{activeTab.body}</p>
            {activeTab.external ? (
              <a
                className="ecosystem-impact__cta"
                href={activeTab.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {activeTab.ctaLabel}
              </a>
            ) : (
              <Link className="ecosystem-impact__cta" href={activeTab.href}>
                {activeTab.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
