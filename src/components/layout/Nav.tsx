"use client";

/**
 * Nav — OneNet Servers
 *
 * TypeUI token layer (three-layer: primitive → semantic → component):
 *   Primitive  → --blue: #4343F0 | --ink: #0F0F1A | --line: #E4E4F0
 *   Semantic   → --color-primary: var(--blue) | --color-surface: var(--bg)
 *   Component  → --nav-bg: var(--glass-bg) | --nav-border: var(--line)
 *                --nav-h: 72px | --nav-item-radius: var(--r1)
 *
 * Animate UI:
 *   - Sheet (animate-ui/primitives/radix/sheet)        → mobile drawer, spring
 *   - Accordion (animate-ui/primitives/radix/accordion)→ mobile nav groups
 *   - Highlight (animate-ui/primitives/effects/highlight) → desktop nav hover pill
 *   - Fade / Fades (animate-ui/primitives/effects/fade) → dropdown items stagger
 *   - motion + AnimatePresence (motion/react)           → dropdown panels, chevrons
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Globe,
  ChevronDown,
  X,
  ShoppingCart,
  LogIn,
  ArrowRight,
  Phone,
  MessageCircle,
  Server,
  Globe2,
  Mail,
  Shield,
  Building2,
  Cpu,
  Users,
  Scale,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetPortal,
  SheetTrigger,
} from "@/components/animate-ui/primitives/radix/sheet";
import { AuthModal } from "@/components/shared/AuthModal";

import {
  currencies,
  navGroups,
  quickActions,
  type Currency,
  type NavGroup,
} from "@/lib/site-data";
import { useBilling } from "@/lib/billing-context";
import { useCurrency } from "@/lib/currency-context";
import { buildCartAddUrl, buildWhmcsUrl } from "@/lib/whmcs";
import { openBrevoChat } from "@/lib/live-chat";
import { cn } from "@/lib/utils";

/* ─── group icon map ────────────────────────────────────────────── */
const groupIcons: Record<string, React.ReactNode> = {
  "Web Hosting":           <Server className="h-4 w-4" />,
  "WordPress Hosting":     <Globe className="h-4 w-4" />,
  "Reseller Hosting":      <Users className="h-4 w-4" />,
  "Cloud VPS":             <Cpu className="h-4 w-4" />,
  "Garium Private AI":     <Cpu className="h-4 w-4" />,
  "Register a Domain":     <Globe2 className="h-4 w-4" />,
  "Transfer a Domain":     <Globe2 className="h-4 w-4" />,
  ".NG Domains":           <Globe2 className="h-4 w-4" />,
  "Business Email":        <Mail className="h-4 w-4" />,
  "SSL Certificates":      <Shield className="h-4 w-4" />,
  "OneGuard Security":     <Shield className="h-4 w-4" />,
  "About Us":              <Building2 className="h-4 w-4" />,
  "Contact Us":            <Phone className="h-4 w-4" />,
  "Future of Productivity":<Users className="h-4 w-4" />,
  "Digital Identity Initiative": <Globe className="h-4 w-4" />,
  "Legal":                       <Scale className="h-4 w-4" />,
};

/* ─── flag SVGs for currency ─────────────────────────────────────── */
const CurrencyFlag = ({ code }: { code: Currency }) => {
  if (code === "NGN") return (
    <svg width="18" height="13" viewBox="0 0 20 14" aria-label="Nigeria" role="img">
      <rect width="6.67" height="14" fill="#008751"/>
      <rect x="6.67" width="6.66" height="14" fill="#fff"/>
      <rect x="13.33" width="6.67" height="14" fill="#008751"/>
    </svg>
  );
  if (code === "GBP") return (
    <svg width="18" height="13" viewBox="0 0 20 14" aria-label="United Kingdom" role="img">
      <rect width="20" height="14" fill="#012169"/>
      <path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="3"/>
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4"/>
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.5"/>
      <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="2"/>
    </svg>
  );
  return (
    <svg width="18" height="13" viewBox="0 0 20 14" aria-label="United States" role="img">
      <rect width="20" height="14" fill="#B22234"/>
      <path d="M0 1.08h20M0 3.23h20M0 5.38h20M0 7.54h20M0 9.69h20M0 11.85h20" stroke="#fff" strokeWidth="1.08"/>
      <rect width="8" height="7.54" fill="#3C3B6E"/>
    </svg>
  );
};

/* ─── Desktop dropdown panel ────────────────────────────────────────
 *  - Click button to open / close
 *  - Hover away from the whole container (button + panel) to close
 *  - Chevron flips when open
 * ─────────────────────────────────────────────────────────────────── */
function DesktopDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const isWide = group.title === "Hosting";

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="nav-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        {...(open ? { "data-open": "" } : {})}
      >
        {group.title}
        <span
          className="inline-flex"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <ChevronDown className="h-3 w-3" />
        </span>
      </button>

      {open && (
        <>
          {/* Invisible bridge — fills the 8px gap so onMouseLeave doesn't fire mid-transit */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              height: "8px",
              zIndex: 199,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: isWide ? "50%" : 0,
              transform: isWide ? "translateX(-50%)" : undefined,
              zIndex: 200,
            }}
            className="nav-dropdown-panel"
          >
          <div className={cn("nav-dropdown-grid", isWide && "nav-dropdown-grid--wide")}>
            {group.items.map((item) =>
              item.disabled ? (
                <span key={item.label} className="nav-dropdown-item nav-dropdown-item--disabled">
                  <span className="nav-dropdown-icon" aria-hidden="true">
                    {groupIcons[item.label] ?? <Globe className="h-4 w-4" />}
                  </span>
                  <span className="nav-dropdown-copy">
                    <strong>{item.label}</strong>
                    {item.description && <em>{item.description}</em>}
                  </span>
                </span>
              ) : (
                <Link key={item.label} href={item.href} className="nav-dropdown-item" onClick={() => setOpen(false)}>
                  <span className="nav-dropdown-icon" aria-hidden="true">
                    {groupIcons[item.label] ?? <Globe className="h-4 w-4" />}
                  </span>
                  <span className="nav-dropdown-copy">
                    <strong>{item.label}</strong>
                    {item.description && <em>{item.description}</em>}
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
}

/* ─── Currency dropdown — uses shadcn DropdownMenu (Base UI) for correct portal + positioning ── */
function CurrencyPicker({
  active,
  onChange,
}: {
  active: Currency;
  onChange: (c: Currency) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="currency-trigger"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <CurrencyFlag code={active} />
          <span>{active}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="inline-flex"
          >
            <ChevronDown className="h-3 w-3" />
          </motion.span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={10} className="currency-menu w-52">
        {currencies.map((c) => (
          <button
            key={c}
            type="button"
            className={cn("currency-option", active === c && "currency-option--active")}
            onClick={() => { onChange(c); setOpen(false); }}
          >
            <CurrencyFlag code={c} />
            <span>{c === "NGN" ? "Nigerian Naira" : c === "GBP" ? "British Pound" : "US Dollar"}</span>
            <span className="currency-code">{c}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ─── Mobile accordion group ────────────────────────────────────── */
function MobileNavGroup({
  group,
  onLinkClick,
}: {
  group: NavGroup;
  onLinkClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("mobile-accordion-item", open && "mobile-accordion-item--open")}>
      <button
        type="button"
        className="mobile-accordion-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{group.title}</span>
        <ChevronDown className="mobile-chevron h-4 w-4" />
      </button>
      <div className="mobile-accordion-content">
        <div className="mobile-links">
          {group.items.map((item) =>
            item.disabled ? (
              <span key={item.label} className="mobile-link mobile-link--disabled">
                <span className="mobile-link-icon" aria-hidden="true">
                  {groupIcons[item.label] ?? <Globe className="h-3.5 w-3.5" />}
                </span>
                <span>
                  <strong>{item.label}</strong>
                  {item.description && <em>{item.description}</em>}
                </span>
              </span>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="mobile-link"
                onClick={onLinkClick}
              >
                <span className="mobile-link-icon" aria-hidden="true">
                  {groupIcons[item.label] ?? <Globe className="h-3.5 w-3.5" />}
                </span>
                <span>
                  <strong>{item.label}</strong>
                  {item.description && <em>{item.description}</em>}
                </span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Nav ───────────────────────────────────────────────────── */
/* Pages without a hero — nav should always appear solid */
const SOLID_NAV_PATHS = ["/legal", "/about", "/contact", "/community", "/digital-identity", "/domains", "/hosting", "/wordpress-hosting"];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authResolved, setAuthResolved] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { billing } = useBilling();
  const { currency: activeCurrency, setCurrency: setActiveCurrency } = useCurrency();
  const dashboardHref = buildWhmcsUrl("/clientarea.php");
  const myAccountHref = buildWhmcsUrl("/clientarea.php", { action: "details" });
  const isStandalonePreview = typeof window !== "undefined" && ["127.0.0.1", "localhost"].includes(window.location.hostname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const forceSolid = SOLID_NAV_PATHS.some((p) => pathname?.startsWith(p));

  function getGuestPrimaryCta() {
    if (pathname === "/") {
      return { label: "Get started free", href: `/pricing?category=web-hosting&billing=${billing}` };
    }
    if (pathname?.startsWith('/hosting/vps')) {
      return { label: 'Deploy your VPS', href: `/pricing?category=vps-hosting&billing=${billing}` };
    }
    if (pathname === '/wordpress-hosting' || pathname?.startsWith('/hosting/wordpress')) {
      return { label: 'Get WordPress hosting', href: `/pricing?category=wordpress-hosting&billing=${billing}` };
    }
    if (pathname?.startsWith('/hosting/web')) {
      return { label: 'Get started free', href: `/pricing?category=web-hosting&billing=${billing}` };
    }
    return { label: 'Get started free', href: `/pricing?category=web-hosting&billing=${billing}` };
  }

  const guestPrimaryCta = getGuestPrimaryCta();

  function syncAuthState(loggedIn: boolean) {
    setIsAuthenticated(loggedIn);
  }

  useEffect(() => { setHasMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let alive = true;

    async function detectAccountState() {
      if (isStandalonePreview) {
        syncAuthState(false);
        setAuthResolved(true);
        return;
      }

      try {
        const response = await fetch(buildWhmcsUrl("/clientarea.php"), {
          credentials: "include",
          redirect: "follow",
          cache: "no-store",
        });
        const finalUrl = new URL(response.url, window.location.origin);
        const html = await response.text();
        const looksLoggedOut =
          /\/login(?:\.php)?$/i.test(finalUrl.pathname) ||
          /form[^>]+action="\/login"/i.test(html) ||
          /name="username"/i.test(html);
        const looksLoggedIn =
          /Hello,\s*[^<]+/i.test(html) ||
          /Logout/i.test(html) ||
          /Client Area/i.test(html);
        const loggedIn =
          looksLoggedIn && !looksLoggedOut;

        if (!alive) return;
        syncAuthState(loggedIn);
        setAuthResolved(true);
      } catch {
        if (!alive) return;
        syncAuthState(false);
        setAuthResolved(true);
      }
    }

    void detectAccountState();
    return () => {
      alive = false;
    };
  }, [isStandalonePreview]);

  useEffect(() => {
    let alive = true;

    const parseCount = (value: string | null | undefined) => {
      if (!value) return 0;
      const match = value.replace(/\s+/g, ' ').match(/(\d+)/);
      return match ? Number.parseInt(match[1], 10) || 0 : 0;
    };

    async function syncCartCount() {
      if (isStandalonePreview) {
        if (alive) setCartCount(0);
        return;
      }

      try {
        const response = await fetch(buildWhmcsUrl('/cart.php', { a: 'view', __cart: String(Date.now()) }), {
          credentials: 'include',
          cache: 'no-store',
        });
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const selectors = [
          '.onenet-cart-count',
          '#cartItemCount',
          '.cart-view-area-client-area .badge',
          '.cart-view-area-client-area .badge-primary',
          '.cart-view-area-client-area .blink-iteam-icon',
          '.on-added-badge',
          '.view-cart-items-count',
        ];

        let nextCount = 0;
        for (const selector of selectors) {
          const parsed = parseCount(doc.querySelector(selector)?.textContent);
          if (parsed > 0) {
            nextCount = parsed;
            break;
          }
        }
        if (!nextCount) {
          const lineItemSelectors = [
            '#order-standard_cart .view-cart-items > .item',
            '#order-standard_cart .view-cart-items .item',
            '#order-standard_cart .on-review-items > .item',
            '#order-standard_cart .view-cart-items-header + .view-cart-items > .item',
            '#order-standard_cart .view-cart-items .item-title',
            '#order-standard_cart .view-cart-items .product-title',
            '#order-standard_cart .on-review-products > *[data-domain], #order-standard_cart .on-review-products > *[data-pid]',
          ];
          for (const selector of lineItemSelectors) {
            const count = doc.querySelectorAll(selector).length;
            if (count > 0) {
              nextCount = count;
              break;
            }
          }
        }

        if (alive) {
          setCartCount(nextCount);
        }
      } catch {
        if (alive) {
          setCartCount(0);
        }
      }
    }

    const rerun = () => {
      void syncCartCount();
    };

    void syncCartCount();
    window.addEventListener('focus', rerun);
    window.addEventListener('pageshow', rerun);
    document.addEventListener('visibilitychange', rerun);

    return () => {
      alive = false;
      window.removeEventListener('focus', rerun);
      window.removeEventListener('pageshow', rerun);
      document.removeEventListener('visibilitychange', rerun);
    };
  }, [activeCurrency, billing, pathname, isStandalonePreview]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      <header className={cn("site-nav", (isScrolled || forceSolid) && "site-nav--scrolled")}>
        <div className="shell nav-shell">

          {/* ── Brand ── */}
          <Link href="/" className="nav-brand" aria-label="OneNet Servers home">
            <Image
              src="/assets/logo-mark.svg"
              alt="OneNet Servers"
              width={32}
              height={32}
              priority
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="nav-desktop" aria-label="Primary">
            {hasMounted && (
              <div className="nav-menu-list">
                {navGroups.map((group) => (
                  <DesktopDropdown key={group.title} group={group} />
                ))}
              </div>
            )}
          </nav>

          {/* ── Actions ── */}
          <div className="nav-actions">
            {hasMounted && (
              <CurrencyPicker active={activeCurrency} onChange={setActiveCurrency} />
            )}

            {/* Cart */}
            <a href={buildWhmcsUrl("/cart.php", { a: "view" })} className="nav-cart" aria-label="View cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 ? (
                <span className="nav-cart-count">{cartCount > 99 ? "99+" : cartCount}</span>
              ) : null}
            </a>

            <button type="button" className="nav-chat" aria-label="Open live chat" onClick={openBrevoChat}>
              <MessageCircle className="h-5 w-5" />
            </button>

            <div className="nav-auth-switch">
              {authResolved && isAuthenticated ? (
                <a href={myAccountHref} className="nav-secondary-link">
                  <LogIn className="h-3.5 w-3.5" />
                  My account
                </a>
              ) : (
                <button
                  type="button"
                  className="nav-secondary-link"
                  onClick={() => setAuthOpen(true)}
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Log in
                </button>
              )}
            </div>

            {/* Get started */}
            {authResolved && isAuthenticated ? (
              <a href={dashboardHref} className="nav-primary-link">
                Dashboard
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                href={guestPrimaryCta.href}
                className="nav-primary-link"
              >
                {guestPrimaryCta.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>

          {/* ── Mobile actions + Sheet drawer ── */}
          {hasMounted ? (
            <div className="nav-mobile-controls">
              <a href={buildWhmcsUrl("/cart.php", { a: "view" })} className="nav-cart nav-cart--mobile" aria-label="View cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 ? (
                  <span className="nav-cart-count">{cartCount > 99 ? "99+" : cartCount}</span>
                ) : null}
              </a>

              <button type="button" className="nav-chat nav-chat--mobile" aria-label="Open live chat" onClick={openBrevoChat}>
                <MessageCircle className="h-5 w-5" />
              </button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  className={cn("nav-toggle", mobileOpen && "nav-toggle--open")}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileOpen ? (
                      <motion.span
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0,   opacity: 1 }}
                        exit={{   rotate: 90,  opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center justify-center"
                      >
                        <X className="h-5 w-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="open"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0,  opacity: 1 }}
                        exit={{   rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-col gap-[5px] items-center justify-center"
                      >
                        <span className="nav-bar" />
                        <span className="nav-bar" />
                        <span className="nav-bar" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </SheetTrigger>

                <SheetPortal>
                <SheetOverlay className="mobile-overlay" />
                <SheetContent
                  side="right"
                  className="mobile-sheet"
                  transition={{ type: "spring", stiffness: 200, damping: 26 }}
                >
                  {/* Sheet header */}
                  <div className="mobile-sheet-head">
                    <Link
                      href="/"
                      className="nav-brand"
                      aria-label="OneNet Servers home"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Image
                        src="/assets/logo-mark.svg"
                        alt="OneNet Servers"
                        width={28}
                        height={28}
                      />
                    </Link>
                    <button
                      type="button"
                      className="mobile-close"
                      aria-label="Close menu"
                      onClick={() => setMobileOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Quick actions */}
                  <div className="mobile-quick-actions">
                    {quickActions.map((action) => {
                      const isExternal = action.href.startsWith("http");
                      return (
                        <a
                          key={action.label}
                          href={action.href}
                          className="mobile-quick-action"
                          {...(isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {action.label.includes("Call") ? (
                            <Phone className="h-4 w-4" />
                          ) : (
                            <MessageCircle className="h-4 w-4" />
                          )}
                          <span>{action.label}</span>
                        </a>
                      );
                    })}
                  </div>

                  {/* Nav groups */}
                  <div className="mobile-nav-body">
                    <div className="mobile-accordion">
                      {navGroups.map((group) => (
                        <MobileNavGroup
                          key={group.title}
                          group={group}
                          onLinkClick={() => setMobileOpen(false)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Mobile currency */}
                  <div className="mobile-currency">
                    <p className="mobile-currency-label">Currency</p>
                    <div className="mobile-currency-grid">
                      {currencies.map((c) => (
                        <button
                          key={c}
                          type="button"
                          className={cn("currency-pill", activeCurrency === c && "currency-pill--active")}
                          onClick={() => setActiveCurrency(c)}
                        >
                          <CurrencyFlag code={c} />
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile CTA actions */}
                  <div className="mobile-actions">
                    <div className="nav-auth-switch nav-auth-switch--mobile">
                      {authResolved && isAuthenticated ? (
                        <a
                          href={myAccountHref}
                          className="nav-secondary-link w-full justify-center"
                          onClick={() => setMobileOpen(false)}
                        >
                          My account
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="nav-secondary-link w-full justify-center"
                          onClick={() => { setMobileOpen(false); setAuthOpen(true); }}
                        >
                          Log in
                        </button>
                      )}
                    </div>
                    {authResolved && isAuthenticated ? (
                      <a
                        href={dashboardHref}
                        className="nav-primary-link w-full justify-center"
                        onClick={() => setMobileOpen(false)}
                      >
                        Dashboard
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={guestPrimaryCta.href}
                        className="nav-primary-link w-full justify-center"
                        onClick={() => setMobileOpen(false)}
                      >
                        {guestPrimaryCta.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </SheetPortal>
            </Sheet>
            </div>
          ) : (
            <div className="nav-mobile-controls">
              <span className="nav-mobile-placeholder" aria-hidden="true" />
              <span className="nav-mobile-placeholder" aria-hidden="true" />
              <button type="button" className="nav-toggle" aria-label="Open menu">
                <span className="nav-bar" />
                <span className="nav-bar" />
                <span className="nav-bar" />
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
