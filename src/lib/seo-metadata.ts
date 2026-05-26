import type { Metadata } from "next";

export const siteUrl = "https://onenetservers.net";
export const siteName = "OneNet Servers";
export const defaultOgImage = "/assets/website-cover.png";

export type SeoMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildSeoMetadata({ title, description, path = "/", keywords = [] }: SeoMetaInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${siteUrl}${canonicalPath === "/" ? "" : canonicalPath}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: "OneNet Servers hosting, domains, email and VPS" }],
      locale: "en_NG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
      creator: "@onenetservers",
    },
  };
}

export const coreSeo = {
  home: buildSeoMetadata({
    title: "Web Hosting Nigeria, UK & Global | OneNet Servers",
    description: "Affordable web hosting, .ng domain registration, business email and VPS for Nigeria, UK and global businesses. NiRA accredited with Naira billing.",
    path: "/",
    keywords: ["web hosting Nigeria", ".ng domain registration", "business email Nigeria", "VPS hosting", "OneNet Servers"],
  }),
  about: buildSeoMetadata({
    title: "About OneNet Servers | Nigeria & UK Hosting Company",
    description: "Learn about OneNet Servers, a Nigeria and UK hosting provider offering domains, web hosting, email, VPS and digital infrastructure for businesses.",
    path: "/about",
  }),
  contact: buildSeoMetadata({
    title: "Contact OneNet Servers | Hosting Support Nigeria & UK",
    description: "Contact OneNet Servers for hosting, domain, email, VPS and security support across Nigeria, the UK and global markets.",
    path: "/contact",
  }),
  domains: buildSeoMetadata({
    title: "Domain Registration Nigeria | .ng, .com.ng & Global Domains",
    description: "Register .ng, .com.ng, .com, .co.uk and global domains with OneNet Servers. NiRA accredited registrar with Naira billing and hosting add-ons.",
    path: "/domains",
    keywords: ["domain registration Nigeria", ".ng domains", ".com.ng domains", "NiRA registrar"],
  }),
  domainTransfer: buildSeoMetadata({
    title: "Transfer Domain to OneNet Servers | Domain Transfer Nigeria",
    description: "Transfer your domain to OneNet Servers with registrar guidance, annual renewal support and .ng, .com.ng, .com and .co.uk transfer options.",
    path: "/domains/transfer",
  }),
  domainsNg: buildSeoMetadata({
    title: ".NG Domain Registration | NiRA Accredited Registrar",
    description: "Register .ng, .com.ng, .org.ng, .net.ng and Nigerian domain names through OneNet Servers, a NiRA accredited registrar.",
    path: "/domains/ng",
  }),
  webHosting: buildSeoMetadata({
    title: "Web Hosting Nigeria | Fast SSD Hosting with Free SSL",
    description: "Fast web hosting for Nigerian, UK and global businesses with SSD storage, free SSL, backups, Naira billing and 30-day money-back guarantee.",
    path: "/hosting/web",
    keywords: ["web hosting Nigeria", "SSD hosting", "cheap web hosting Nigeria"],
  }),
  wordpressHosting: buildSeoMetadata({
    title: "WordPress Hosting Nigeria | LiteSpeed, Backups & Free SSL",
    description: "Managed WordPress hosting with LiteSpeed cache, free SSL, backups, staging options and direct checkout in NGN, GBP or USD.",
    path: "/hosting/wordpress",
  }),
  resellerHosting: buildSeoMetadata({
    title: "Reseller Hosting Nigeria | White Label Hosting Plans",
    description: "Start or grow your hosting business with OneNet reseller hosting, white-label account management, SSD storage and scalable client plans.",
    path: "/hosting/reseller",
  }),
  vpsHosting: buildSeoMetadata({
    title: "VPS Hosting Nigeria & UK | Cloud VPS Servers",
    description: "Deploy cloud VPS hosting with scalable resources, Linux options, deployment tools and billing in NGN, GBP or USD.",
    path: "/hosting/vps",
  }),
  email: buildSeoMetadata({
    title: "Business Email Hosting | Domain Email for Teams",
    description: "Professional business email hosting with domain-based mailboxes, CrossBox webmail, collaboration tools and secure access for teams.",
    path: "/email",
  }),
  ssl: buildSeoMetadata({
    title: "SSL Certificates | DV, Wildcard, OV & EV Security",
    description: "Buy SSL certificates for websites and apps, including DV, Wildcard, OV and EV options with installation support from OneNet Servers.",
    path: "/security/ssl",
  }),
  oneguard: buildSeoMetadata({
    title: "OneGuard Website Security | Malware Scan, WAF & DDoS Protection",
    description: "Protect your website with OneGuard Security: malware scanning, automatic cleanup, WAF, DDoS protection and annual security plans.",
    path: "/security/oneguard",
  }),
  community: buildSeoMetadata({
    title: "Digital Growth for Communities | OneNet Servers",
    description: "OneNet Servers helps communities, founders and organisations get online with hosting, domains, email and digital growth support.",
    path: "/community",
  }),
  digitalIdentity: buildSeoMetadata({
    title: "Digital Identity Initiative | Free First Year for Qualifying Founders",
    description: "Apply for OneNet Servers Digital Identity Initiative for qualifying founders, students, creators and community projects seeking a first year online.",
    path: "/digital-identity",
  }),
  pricing: buildSeoMetadata({
    title: "Hosting Pricing Nigeria | Domains, VPS, Email & Security Plans",
    description: "Compare live OneNet Servers pricing for web hosting, WordPress hosting, domains, VPS, business email, SSL and OneGuard security plans.",
    path: "/pricing",
  }),
};
