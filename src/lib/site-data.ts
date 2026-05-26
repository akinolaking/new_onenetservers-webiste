export type NavGroup = {
  title: string;
  href?: string;
  items: Array<{
    label: string;
    href: string;
    description?: string;
    disabled?: boolean;
  }>;
};

export const navGroups: NavGroup[] = [
  {
    title: "Hosting",
    items: [
      {
        label: "Web Hosting",
        href: "/hosting/web",
        description: "LiteSpeed · CloudLinux",
      },
      {
        label: "WordPress Hosting",
        href: "/hosting/wordpress",
        description: "Docker isolation · AI builder",
      },
      {
        label: "Reseller Hosting",
        href: "/hosting/reseller",
        description: "White-label · WHMCS",
      },
      {
        label: "Cloud VPS",
        href: "/hosting/vps",
        description: "Full root access · 9 regions",
      },
    ],
  },
  {
    title: "Domains",
    items: [
      { label: "Register a Domain", href: "/domains", description: "Search 30+ extensions" },
      { label: "Transfer a Domain", href: "/domains/transfer", description: "Free renewal year included" },
      { label: ".NG Domains", href: "/domains/ng", description: "NiRA accredited registrar" },
    ],
  },
  {
    title: "Tools & Security",
    items: [
      { label: "Business Email", href: "/email", description: "CrossBox · No per-user fees" },
      { label: "SSL Certificates", href: "/security/ssl", description: "HTTPS for every site" },
      { label: "OneGuard Security", href: "/security/oneguard", description: "Managed protection suite" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about", description: "Brand story and trust signals" },
      { label: "Contact Us", href: "/contact", description: "Sales and support" },
      { label: "Future of Productivity", href: "/community", description: "Community and editorial" },
      { label: "Digital Identity Initiative", href: "/digital-identity", description: "Identity programme" },
      { label: "Legal", href: "/legal/terms", description: "Terms, privacy, and agreements" },
    ],
  },
];

export const currencies = ["NGN", "GBP", "USD"] as const;
export type Currency = (typeof currencies)[number];

export const footerColumns = [
  {
    title: "Hosting",
    links: [
      { label: "Web Hosting", href: "/hosting/web" },
      { label: "WordPress Hosting", href: "/hosting/wordpress" },
      { label: "Reseller Hosting", href: "/hosting/reseller" },
      { label: "Cloud VPS", href: "/hosting/vps" },
    ],
  },
  {
    title: "Domains",
    links: [
      { label: "Register a Domain", href: "/domains" },
      { label: "Transfer a Domain", href: "/domains/transfer" },
      { label: ".NG Domains", href: "/domains/ng" },
      { label: ".COM.NG Domains", href: "/domains/ng" },
      { label: "TLD Pricing", href: "/domains" },
    ],
  },
  {
    title: "Tools & Security",
    links: [
      { label: "Business Email", href: "/email" },
      { label: "SSL Certificates", href: "/security/ssl" },
      { label: "OneGuard Security", href: "/security/oneguard" },
      { label: "Future of Productivity", href: "/community" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Digital Identity Initiative", href: "/digital-identity" },
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Hosting Agreement", href: "/legal/agreement" },
    ],
  },
];

export const trustBadges = [
  "NiRA Accredited",
  "UK RC: 14565201",
  "NG RC: 1775966",
  "SCUML Registered",
  "Tech Nation Endorsed",
  "Itana Digital Resident",
] as const;

export const paymentMethods = [
  "Paystack",
  "Visa",
  "Mastercard",
  "Verve",
  "Bank Transfer",
] as const;

export const phoneNumbers = [
  { label: "Nigeria", href: "tel:+2342013309154", text: "+234 201 330 9154" },
  { label: "United Kingdom", href: "tel:+447333880775", text: "+44 7333 880 7775" },
] as const;

export const quickActions = [
  { label: "Call sales", href: "tel:+2342013309154" },
  { label: "Chat on WhatsApp", href: "https://wa.me/2342013309154" },
] as const;

export const socialLinks = [
  { label: "X", href: "https://twitter.com/onenetservers" },
  { label: "LinkedIn", href: "https://linkedin.com/company/onenetservers" },
  { label: "Instagram", href: "https://instagram.com/onenetservers" },
  { label: "YouTube", href: "https://youtube.com/@onenetservers" },
] as const;
