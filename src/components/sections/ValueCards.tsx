'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import Link from 'next/link';
import { useBilling } from '@/lib/billing-context';
import { useCurrency } from '@/lib/currency-context';
import { buildCartAddUrl } from '@/lib/whmcs';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((m) => m.DotLottieReact),
  { ssr: false },
);

interface CardDef {
  key: string;
  eyebrow: string;
  headline: string;
  body: string;
  bg: string;
  theme: 'light' | 'dark';
  accent?: string;
  lottie: string;
  cta?: { label: string; href: string };
}

const CARDS: CardDef[] = [
  {
    key: 'who',
    eyebrow: 'Who we are',
    headline: 'Built for Global Presence. Powered from Lagos – London.',
    body: 'The only Nigeria-UK registered hosting provider with NiRA accreditation serving UK and Africa\'s businesses, creators and freelancers with multi-currency billing and .co.uk and .ng domain expertise. No conversion fees. No hidden fees. No workarounds.',
    bg: '#ffffff',
    theme: 'light',
    lottie: '/assets/lottie/jcikwtux.json',
  },
  {
    key: 'mission',
    eyebrow: 'Our mission',
    headline: 'We handle the tech. You run your business.',
    body: "Servers, control panels, AI tools, domains, SSL, and private email. All managed by us. Nigerian and UK businesses deserve to focus on what they're actually good at, not infrastructure.",
    bg: '#4343f0',
    theme: 'dark',
    lottie: '/assets/lottie/qp1q7mct.json',
    cta: { label: 'Get started free', href: '/pricing?category=web-hosting&billing=annual' },
  },
  {
    key: 'speed',
    eyebrow: 'Speed & DIY tools',
    headline: '10 minutes. From signup to live website.',
    body: 'No developer. No waiting. Pick a template, add your details, and publish before your coffee gets cold. Go online at the speed of your ideation.',
    bg: '#0f0f1a',
    theme: 'dark',
    lottie: '/assets/lottie/jcikwtux.json',
  },
  {
    key: 'free',
    eyebrow: 'Free year',
    headline: 'Zero Cost. Your first year online. On us.',
    body: 'Free domain, hosting, and business email for qualifying founders, creators, students, and freelancers through the Digital Identity Initiative. No credit card required.',
    bg: '#f0fdf4',
    theme: 'light',
    accent: '#10b981',
    lottie: '/assets/lottie/w51pcehl.json',
    cta: { label: 'Apply free →', href: '/digital-identity' },
  },
  {
    key: 'community',
    eyebrow: 'Community & Partners',
    headline: 'Digital Growth Credit (DGC) for Community growth.',
    body: "Businesses, communities, organisations, non-profits, creators, freelancers, and enterprises operating for over 12 months with a community base are eligible for our partners programme. Approved partners can receive up to NGN 10,000,000 or USD 5,000 in OneNet Servers' Digital Growth Credits to help their members get online and boost their community or startup.",
    bg: '#1a1a3e',
    theme: 'dark',
    lottie: '/assets/lottie/jcikwtux.json',
    cta: { label: 'Apply for DGC →', href: '/partners' },
  },
];

const TOTAL = CARDS.length;

function StackCard({
  card,
  index,
  progress,
  billing,
  currency,
}: {
  card: CardDef;
  index: number;
  progress: MotionValue<number>;
  billing: 'monthly' | 'annual';
  currency: 'USD' | 'NGN' | 'GBP';
}) {
  const entryStart = (index - 1) / (TOTAL - 1);
  const entryEnd = index / (TOTAL - 1);

  const y = useTransform(
    progress,
    index === 0 ? [0, 1] : [entryStart, entryEnd],
    index === 0 ? ['0%', '0%'] : ['100%', '0%'],
  );

  const isLight = card.theme === 'light';
  const eyebrowColor = card.accent ?? (isLight ? '#4343f0' : 'rgba(255,255,255,0.52)');
  const headlineColor = isLight ? '#0f0f1a' : '#ffffff';
  const bodyColor = isLight ? '#3d3d5c' : 'rgba(255,255,255,0.72)';
  const numColor = isLight ? 'rgba(15,15,26,0.05)' : 'rgba(255,255,255,0.05)';

  return (
    <motion.article
      style={{ y, zIndex: index + 1 }}
      className="vc-card"
      aria-label={card.headline}
    >
      <div className="vc-card__bg" style={{ background: card.bg }} />

      <div className="vc-card__inner">
        {/* Left: text */}
        <div className="vc-card__text">
          <span className="vc-card__eyebrow" style={{ color: eyebrowColor }}>
            {card.eyebrow}
          </span>
          <h3 className="vc-card__headline" style={{ color: headlineColor }}>
            {card.headline}
          </h3>
          <p className="vc-card__copy" style={{ color: bodyColor }}>
            {card.body}
          </p>
          {card.cta ? (
            <Link
              href={card.key === 'mission' ? `/pricing?category=web-hosting&billing=${billing}` : card.cta.href}
              className={`vc-card__cta ${isLight ? 'vc-card__cta--solid' : 'vc-card__cta--ghost'}`}
            >
              {card.cta.label}
            </Link>
          ) : null}
        </div>

        {/* Right: Lottie animation */}
        <div className="vc-card__visual" aria-hidden="true">
          <DotLottieReact
            src={card.lottie}
            loop
            autoplay
            className="vc-lottie"
          />
        </div>
      </div>

      <span className="vc-card__num" aria-hidden="true" style={{ color: numColor }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.article>
  );
}

export function ValueCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { billing } = useBilling();
  const { currency } = useCurrency();

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="vc-section" id="about" aria-label="What we stand for">
      <div ref={scrollRef} className="vc-scroll">
        <div className="vc-sticky">
          {CARDS.map((card, i) => (
            <StackCard
              key={card.key}
              card={card}
              index={i}
              progress={scrollYProgress}
              billing={billing}
              currency={currency}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
