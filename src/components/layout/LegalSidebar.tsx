"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, ShieldCheck, Server } from "lucide-react";

const LEGAL_LINKS = [
  {
    href: "/legal/terms",
    label: "Terms of Service",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    href: "/legal/privacy",
    label: "Privacy Policy",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  {
    href: "/legal/agreement",
    label: "Hosting Agreement",
    icon: <Server className="h-4 w-4" />,
  },
];

export function LegalSidebar() {
  const pathname = usePathname();

  return (
    <nav className="legal-nav" aria-label="Legal documents">
      <p className="legal-nav__heading">Legal</p>
      <ul className="legal-nav__list">
        {LEGAL_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "legal-nav__item",
                pathname === link.href && "legal-nav__item--active"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="legal-nav__meta">
        <p className="legal-nav__meta-label">Last updated</p>
        <p className="legal-nav__meta-value">1 March 2026</p>
      </div>
    </nav>
  );
}
