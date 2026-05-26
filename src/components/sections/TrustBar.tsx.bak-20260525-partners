'use client';

import { Fade } from '@/components/animate-ui/primitives/effects/fade';
import {
  Gift,
  ShieldCheck,
  Zap,
  Globe,
  BadgeCheck,
  RotateCcw,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface TrustItem {
  icon: LucideIcon;
  label: string;
  detail: string;
}

const items: TrustItem[] = [
  {
    icon: Gift,
    label: 'Free domain included',
    detail: 'with every hosting plan',
  },
  {
    icon: ShieldCheck,
    label: 'SSL security built in',
    detail: 'automatic HTTPS, always on',
  },
  {
    icon: Zap,
    label: 'Live in under 10 minutes',
    detail: 'no developer needed',
  },
  {
    icon: Globe,
    label: 'Nigeria · UK · Global',
    detail: 'built for both markets',
  },
  {
    icon: BadgeCheck,
    label: 'NiRA accredited registrar',
    detail: 'official .ng registry partner',
  },
  {
    icon: RotateCcw,
    label: '30-day money-back',
    detail: 'no questions, no retention team',
  },
];

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Trust signals">
      <div className="trust-bar__inner">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Fade key={item.label} inView inViewOnce delay={i * 70} asChild>
              <div className="trust-bar__item">
                <span className="trust-bar__icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="trust-bar__text">
                  <span className="trust-bar__label">{item.label}</span>
                  <span className="trust-bar__detail">{item.detail}</span>
                </span>
              </div>
            </Fade>
          );
        })}
      </div>
    </section>
  );
}
