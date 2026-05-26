import { Hero } from "@/components/sections/Hero";
import { FeatureTabs } from "@/components/sections/FeatureTabs";
import { TrustBar } from "@/components/sections/TrustBar";
import { PricingBestsellers } from "@/components/sections/PricingBestsellers";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SocialProof } from "@/components/sections/SocialProof";
import { NigeriaSection } from "@/components/sections/NigeriaSection";
import { Differentiators } from "@/components/sections/Differentiators";
import { Testimonials } from "@/components/sections/Testimonials";
import { BottomCTA } from "@/components/sections/BottomCTA";
import { BlogSection } from "@/components/sections/BlogSection";
import { EcosystemImpact } from "@/components/sections/EcosystemImpact";

export default function Home() {
  return (
    <main id="main-content" className="page-shell">
      {/* 01 — Hero */}
      <Hero />
      {/* 02 — Trust signals */}
      <TrustBar />
      {/* 03 — Feature tabs */}
      <FeatureTabs />
      {/* 04 — Pricing bestsellers */}
      <PricingBestsellers />
      {/* 05 — How it works */}
      <HowItWorks />
      {/* 06 — Social proof */}
      <SocialProof />
      {/* 07 — Nigeria section */}
      <NigeriaSection />
      {/* 08 — Differentiators */}
      <Differentiators />
      {/* 09 — Ecosystem impact */}
      <EcosystemImpact />
      {/* 10 — Testimonials */}
      <Testimonials />
      {/* 11 — Blog */}
      <BlogSection />
      {/* 12 — Bottom CTA */}
      <BottomCTA />
    </main>
  );
}
