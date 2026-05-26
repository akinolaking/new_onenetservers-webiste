/* TLD pricing — live from WHMCS. NGN/GBP stored directly; no exchange-rate conversion. */
export const tlds = [
  { ext: ".ng",      usd: 23.40,  ngn: 17999,  gbp: 16.74, note: "NiRA" },
  { ext: ".com",     usd: 15.00,  ngn: 21999,  gbp: 11.99, note: "" },
  { ext: ".com.ng",  usd: 11.25,  ngn: 8650,   gbp: 8.04,  note: "NiRA" },
  { ext: ".co.uk",   usd: 8.12,   ngn: 14900,  gbp: 7.38,  note: "" },
  { ext: ".uk",      usd: 8.12,   ngn: 14900,  gbp: 7.38,  note: "" },
  { ext: ".shop",    usd: 4.99,   ngn: 7699,   gbp: 3.79,  note: "" },
  { ext: ".online",  usd: 3.80,   ngn: 7000,   gbp: 3.45,  note: "" },
  { ext: ".xyz",     usd: 3.42,   ngn: 6300,   gbp: 3.11,  note: "Lowest" },
  { ext: ".dev",     usd: 19.04,  ngn: 35000,  gbp: 17.30, note: "" },
  { ext: ".tech",    usd: 10.79,  ngn: 16469,  gbp: 8.57,  note: "" },
  { ext: ".me",      usd: 12.69,  ngn: 23300,  gbp: 11.53, note: "" },
  { ext: ".io",      usd: 44.44,  ngn: 81800,  gbp: 40.37, note: "" },
  { ext: ".ai",      usd: 95.24,  ngn: 175200, gbp: 86.53, note: "" },
  { ext: ".net",     usd: 15.05,  ngn: 27700,  gbp: 13.67, note: "" },
  { ext: ".org",     usd: 13.58,  ngn: 25000,  gbp: 12.34, note: "" },
  { ext: ".biz",     usd: 8.70,   ngn: 16000,  gbp: 7.90,  note: "" },
  { ext: ".info",    usd: 4.55,   ngn: 8400,   gbp: 4.13,  note: "" },
  { ext: ".name.ng", usd: 0,      ngn: 0,      gbp: 0,     note: "DII free" },
] as const;

export const services = [
  {
    tag: "AI Builder · Docker · PanelAlpha · LiteSpeed",
    title: "WordPress Hosting with AI Website Builder",
    description:
      "Docker-isolated containers. AI generates your full site from a prompt. One-click staging. 10–30× faster than standard shared WordPress.",
    price: { USD: "$6.78/mo", NGN: "₦4,599/mo", GBP: "£5.99/mo" },
    href: "/pricing?category=wordpress-hosting&billing=monthly",
    cta: "Launch WordPress",
    featured: true,
  },
  {
    tag: "NiRA Accredited · 30+ TLDs",
    title: "Domain Registration",
    description:
      ".ng, .com.ng, .ai, .dev, .co.uk and 27 more. WHOIS privacy, DNSSEC, instant activation.",
    price: { USD: "$3.42/yr", NGN: "₦6,300/yr", GBP: "£3.11/yr" },
    href: "/domains",
    cta: "Find your domain",
  },
  {
    tag: "LiteSpeed · CloudLinux · Plesk",
    title: "Web Hosting",
    description:
      "Dedicated CloudLinux environment. ImmunifyAV+ malware scanning. Not a shared-resource gamble.",
    price: { USD: "$3.99/mo", NGN: "₦5,499/mo", GBP: "£2.79/mo" },
    href: "/pricing?category=web-hosting&billing=monthly",
    cta: "Start hosting",
  },
  {
    tag: "CrossBox · No per-user fees",
    title: "Business Email",
    description:
      "5–100 addresses on one flat plan. Video calls, team chat, and shared storage built in.",
    price: { USD: "$2.33/mo", NGN: "₦2,899/mo", GBP: "£1.79/mo" },
    href: "/pricing?category=business-email&billing=monthly",
    cta: "Get email",
  },
  {
    tag: "8–96GB RAM · Unlimited Bandwidth",
    title: "Cloud VPS",
    description:
      "n8n, Docker, Wireguard, Nextcloud one-click deploy. Zero bandwidth throttling. AI-ready from VPS Starter.",
    price: { USD: "$12.42/mo", NGN: "₦1,000/mo", GBP: "£9.12/mo" },
    href: "/pricing?category=vps-hosting&billing=monthly",
    cta: "Deploy VPS",
  },
  {
    tag: "White-label · WHMCS · Private Nameservers",
    title: "Reseller Hosting",
    description:
      "Launch your own hosting brand. Full white-label, private nameservers, mobile billing app. Your infrastructure, your name.",
    price: { USD: "$5.39/mo", NGN: "₦7,499/mo", GBP: "£3.97/mo" },
    href: "/pricing?category=reseller-hosting&billing=monthly",
    cta: "Start reselling",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Choose your plan",
    description:
      "Pick the product and plan that fits. All plans include a 30-day money-back guarantee — no questions, no retention team.",
  },
  {
    number: "02",
    title: "We set everything up",
    description:
      "Your environment provisions automatically. Average activation: 2–5 minutes. For migrations, our team handles files, databases, DNS, and email — at no extra charge.",
  },
  {
    number: "03",
    title: "You go live",
    description:
      "Log in to Plesk, PanelAlpha, or your client area. Your site is ready. Our support team is available 24/7.",
  },
] as const;

export const pricingCategories = [
  {
    key: "hosting",
    label: "Web Hosting",
    plans: [
      {
        name: "Starter",
        pid: "261",
        description: "Your first website deserves a real server. Solid performance. Zero complexity.",
        monthly: { USD: "$3.99/mo", NGN: "₦5,499/mo", GBP: "£2.79/mo" },
        annual:  { USD: "$4.05/mo", NGN: "₦4,157/mo", GBP: "£3.00/mo" },
        renewal: "Renews at $3.99/mo after the first term.",
      },
      {
        name: "Premium",
        pid: "252",
        description:
          "The plan serious builders choose. Managed for performance with CloudLinux isolation and ImmunifyAV+.",
        monthly: { USD: "$18.20/mo", NGN: "₦13,999/mo", GBP: "£13.02/mo" },
        annual:  { USD: "$12.74/mo", NGN: "₦9,799/mo",  GBP: "£9.11/mo" },
        renewal: "Renews at $18.20/mo after the first term.",
        featured: true,
      },
    ],
  },
  {
    key: "wordpress",
    label: "WordPress",
    plans: [
      {
        name: "WP Starter",
        pid: "260",
        description: "AI website builder, Docker isolation, and a cleaner path to launch.",
        monthly: { USD: "$6.78/mo", NGN: "₦4,599/mo", GBP: "£5.99/mo" },
        annual:  { USD: "$6.44/mo", NGN: "₦4,369/mo", GBP: "£5.69/mo" },
        renewal: "Renews at $6.78/mo after the first term.",
      },
      {
        name: "WP Premium",
        pid: "249",
        description: "Five instances, staging, and room to scale without losing speed.",
        monthly: { USD: "$52.49/mo", NGN: "₦40,380/mo", GBP: "£37.55/mo" },
        annual:  { USD: "$36.75/mo", NGN: "₦28,271/mo", GBP: "£26.29/mo" },
        renewal: "Renews at $52.49/mo after the first term.",
        featured: true,
      },
    ],
  },
  {
    key: "vps",
    label: "Cloud VPS",
    plans: [
      {
        name: "VPS Starter",
        pid: "205",
        description: "Root access, unlimited bandwidth, and one-click apps in under a minute.",
        monthly: { USD: "$12.42/mo", NGN: "₦1,000/mo", GBP: "£9.12/mo" },
        annual:  { USD: "$11.18/mo", NGN: "₦15,243/mo", GBP: "£8.21/mo" },
        renewal: "Renews at $12.42/mo after the first term.",
      },
      {
        name: "VPS Premium",
        pid: "265",
        description: "48GB RAM, 12 vCPU, and the headroom for demanding automation and AI workloads.",
        monthly: { USD: "$43.61/mo", NGN: "₦59,474/mo", GBP: "£32.03/mo" },
        annual:  { USD: "$39.25/mo", NGN: "₦53,528/mo", GBP: "£28.83/mo" },
        renewal: "Renews at $43.61/mo after the first term.",
        featured: true,
      },
    ],
  },
  {
    key: "domains",
    label: "Domains",
    plans: [
      {
        name: ".com.ng",
        pid: "",
        description: "A practical first domain for businesses selling in Nigeria.",
        monthly: { USD: "$11.25/yr", NGN: "₦8,650/yr", GBP: "£8.04/yr" },
        annual:  { USD: "$11.25/yr", NGN: "₦8,650/yr", GBP: "£8.04/yr" },
        renewal: "Renews at the same annual rate shown.",
      },
      {
        name: ".ng",
        pid: "",
        description: "Direct NiRA registration for stronger local trust and recognition.",
        monthly: { USD: "$23.40/yr", NGN: "₦17,999/yr", GBP: "£16.74/yr" },
        annual:  { USD: "$23.40/yr", NGN: "₦17,999/yr", GBP: "£16.74/yr" },
        renewal: "Renews at the same annual rate shown.",
        featured: true,
      },
    ],
  },
] as const;

export const nigeriaPoints = [
  "Pay in naira via Paystack — no international card, no conversion fees, no payment friction.",
  "NiRA accredited registrar — direct .ng and .com.ng registration with no middleman layer.",
  "SCUML registered — compliant and protected under Nigerian law.",
  "Digital Identity Initiative — free first year online for qualifying founders, students, and freelancers.",
  "Local support awareness — our team understands Paystack, Nigerian business hours, and local domain requirements.",
] as const;

export const trustBarItems = [
  { label: "Free domain included", detail: "with all hosting plans" },
  { label: "SSL security built in", detail: "automatic HTTPS on every site" },
  { label: "Live in under 10 minutes", detail: "no developer needed" },
  { label: "Nigeria · UK · Global", detail: "built for both markets" },
  { label: "NiRA accredited registrar", detail: "official .ng registry partner" },
  { label: "30-day money-back guarantee", detail: "no questions, no retention team" },
] as const;

export const valueCards = [
  {
    key: "who",
    headline: "Built for Nigeria. Powered from London.",
    body: "The only UK-registered hosting provider with NiRA accreditation, Naira billing via Paystack, and .ng domain expertise. No conversion fees. No workarounds.",
    featured: false,
  },
  {
    key: "mission",
    headline: "We handle the tech. You run your business.",
    body: "Servers, domains, SSL, and email — all managed by us. Nigerian and UK businesses deserve to focus on what they're actually good at, not infrastructure.",
    cta: { label: "Get started free", href: "/pricing?category=web-hosting&billing=annual" },
    featured: true,
  },
  {
    key: "speed",
    headline: "10 minutes. From signup to live website.",
    body: "No developer. No waiting. Pick a template, add your details, publish — before your coffee gets cold.",
    featured: false,
  },
  {
    key: "free",
    headline: "₦0. Your first year online. On us.",
    body: "Free domain, hosting, and business email for qualifying Nigerian founders, students, and freelancers through the Digital Identity Initiative. No credit card required.",
    cta: { label: "Apply free →", href: "/digital-identity" },
    featured: false,
  },
  {
    key: "community",
    headline: "Infrastructure for builders. Community for growth.",
    body: "Monthly events on AI, identity, and internet infrastructure — open to all builders. SDG 4, 8, and 10 aligned.",
    cta: { label: "View upcoming events →", href: "/community" },
    featured: false,
  },
] as const;

export const newSteps = [
  {
    number: "01",
    title: "Enter your business name",
    description:
      "Search for your domain across .ng, .com, .co.uk, and 30+ extensions. We check availability instantly and suggest the best fit for your brand.",
    time: "under 1 minute",
  },
  {
    number: "02",
    title: "Choose a website template",
    description:
      "Pick from templates built for your industry — restaurant, services, retail, portfolio. Let AI build the rest for you with customisable blocks and text. No design skills. No code. Click, customise, done.",
    time: "2–3 minutes",
  },
  {
    number: "03",
    title: "Add your details and go live",
    description:
      "Your name, products, story. Add your social media links or booking link. Hit publish — your business is on the internet.",
    time: "10 minutes total",
  },
] as const;

export const differentiators = [
  {
    id: "regions",
    headline: "9 regions. 99.9% uptime SLA.",
    body: "Infrastructure across Europe, the US, Asia, Africa, and Oceania means your site loads close to every visitor — one platform, nine regions, zero switching.",
    visualKey: "regions",
    visualLabel: "Global coverage visual with a globe, nine region pins, and a 99.9 percent uptime status chip.",
  },
  {
    id: "free-year",
    headline: "Free for 1 full year.",
    body: "Qualifying founders, students, freelancers, and creators get one domain, shared hosting, and business email free in year one; in year two, you simply renew on the normal public rate for the plan you picked.",
    visualKey: "free-year",
    visualLabel: "Free first year visual with a browser window, free ribbons for domain hosting and email, a 12 month calendar, and a struck through card.",
  },
  {
    id: "nira",
    headline: "NiRA-accredited registrar.",
    body: "Direct .ng, .com.ng, and .gov.ng registry access for faster activation, no third-party layer, and full WHOIS privacy by default.",
    visualKey: "nira",
    visualLabel: "NiRA accreditation visual with yourbrand.ng in an address bar, domain tags, a NiRA seal, and a privacy shield.",
  },
  {
    id: "defense",
    headline: "Enterprise-grade DDoS & bot defense.",
    body: "Cloudflare-powered protection sits in front of every site, filtering malicious bots and absorbing DDoS attacks before they ever reach your server — so real customers get through and bad traffic doesn't.",
    visualKey: "defense",
    visualLabel: "Security visual with a central shield, blocked bot traffic, a Cloudflare chip, and a live threats blocked counter.",
  },
  {
    id: "backups",
    headline: "Daily backups. One-click restore.",
    body: "Your entire site is backed up automatically every day and kept for 30 days, so a bad deploy, a hack, or an accidental delete is a single click away from being undone.",
    visualKey: "backups",
    visualLabel: "Backup visual with layered restore points, a restore button, and a 30 day history chip.",
  },
  {
    id: "monitoring",
    headline: "Always-on monitoring, real humans on call.",
    body: "Automated systems watch every server every second, but a 24/7 engineering team is paged the moment anything drifts — most issues are resolved before you'd even notice them.",
    visualKey: "monitoring",
    visualLabel: "Monitoring visual with an uptime dashboard, a support avatar, a 24 slash 7 chip, and an issue resolved toast.",
  },
  {
    id: "support",
    headline: "Expert support that actually answers.",
    body: "Reach a senior engineer by chat or ticket in minutes, not days — every conversation is with someone who runs the infrastructure, not a script reading from a wiki.",
    visualKey: "support",
    visualLabel: "Support visual with customer and engineer chat bubbles, a verified avatar, and a median reply chip.",
  },
] as const;

export const testimonials = [
  {
    name: "Chidimma Okafor",
    role: "Founder",
    business: "Mama Chidi's Kitchen",
    category: "Food & Catering, Lagos",
    categoryKey: "food",
    story:
      "A home caterer who had been taking orders via WhatsApp alone. Now has a full menu online, accepts bookings, and reaches new customers daily.",
    quote:
      "I was scared of the tech. I had my website running before I finished my morning tea.",
    time: "Launched in 8 minutes",
  },
  {
    name: "Bridget",
    role: "Designer & Founder",
    business: "The BB Bespokes",
    category: "Fashion & Retail, London",
    categoryKey: "fashion",
    story:
      "A fabric designer selling textiles from her studio. She went from Instagram DMs to a WooCommerce storefront that ships across the UK and beyond.",
    quote:
      "My international customers found me through Google. I didn't think that was possible for someone like me.",
    time: "Launched in 6 minutes",
  },
  {
    name: "Emeka Okonkwo",
    role: "Founder",
    business: "Emeka Tax Advisory",
    category: "Professional Services, Abuja",
    categoryKey: "services",
    story:
      "A one-man accounting firm that needed credibility online. The website helped him land two corporate clients in his first month.",
    quote: "It made me look like a real company. Because I am one.",
    time: "Launched in 11 minutes",
  },
] as const;

export const quoteTestimonials = [
  {
    quote:
      "Migrated from Bluehost, load time dropped from four seconds to under 800ms. The team handled the move without us chasing tickets.",
    name: "Adebola O.",
    role: "E-commerce founder",
    location: "Lagos",
  },
  {
    quote:
      "We needed a domain, email, and a cleaner front door for UK clients. OneNet made the business look more established in the first week.",
    name: "Sarah M.",
    role: "Consultant",
    location: "London",
  },
  {
    quote:
      "The .ng registration was fast, billing in naira was straightforward, and support answered in language that made operational sense.",
    name: "Emeka T.",
    role: "Business owner",
    location: "Abuja",
  },
  {
    quote:
      "We started with shared hosting, added business email, then moved to VPS. It felt like one platform, not three stitched together.",
    name: "Chisom A.",
    role: "Agency founder",
    location: "Port Harcourt",
  },
] as const;
