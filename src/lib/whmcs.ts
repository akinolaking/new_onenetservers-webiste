import type { Currency } from "@/lib/site-data";

const CURRENCY_TO_WHMCS_ID: Record<Currency, string> = {
  NGN: "1",
  USD: "4",
  GBP: "18",
};

const DEFAULT_WHMCS_BASE = process.env.NEXT_PUBLIC_WHMCS_BASE_URL?.replace(/\/+$/, "") ?? "";
const KNOWN_TLDS = [
  ".com.ng",
  ".net.ng",
  ".org.ng",
  ".name.ng",
  ".co.uk",
  ".org.uk",
  ".com",
  ".ng",
  ".uk",
  ".shop",
  ".xyz",
  ".online",
  ".dev",
  ".ai",
  ".tech",
  ".io",
];

export function whmcsCurrencyId(currency: Currency): string {
  return CURRENCY_TO_WHMCS_ID[currency] ?? CURRENCY_TO_WHMCS_ID.USD;
}

export function buildWhmcsUrl(path: string, params?: Record<string, string | null | undefined>): string {
  const query = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value != null && value !== "") {
      query.set(key, value);
    }
  });

  const prefix = path.startsWith("/") ? path : `/${path}`;
  const url = `${DEFAULT_WHMCS_BASE}${prefix}`;
  const suffix = query.toString();

  return suffix ? `${url}?${suffix}` : url;
}

export function buildCartAddUrl(pid: string, billing: "monthly" | "annual", currency: Currency): string {
  return buildWhmcsUrl("/cart.php", {
    a: "add",
    pid,
    billingcycle: billing === "annual" ? "annually" : "monthly",
    currency: whmcsCurrencyId(currency),
  });
}

function parseDomainForWhmcs(domain: string): { sld: string; tld: string } | null {
  const normalized = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "");
  const clean = normalized.replace(/[^a-z0-9.-]/g, "").replace(/\.+/g, ".");
  const matchedTld = KNOWN_TLDS
    .sort((a, b) => b.length - a.length)
    .find((tld) => clean.endsWith(tld) && clean.length > tld.length);

  if (matchedTld) {
    return {
      sld: clean.slice(0, -matchedTld.length).replace(/\.$/, ""),
      tld: matchedTld,
    };
  }

  const lastDot = clean.lastIndexOf(".");
  if (lastDot > 0 && lastDot < clean.length - 1) {
    return {
      sld: clean.slice(0, lastDot),
      tld: clean.slice(lastDot),
    };
  }

  return clean ? { sld: clean, tld: ".com" } : null;
}

export function buildDomainRegisterUrl(domain: string, currency: Currency): string {
  const parsed = parseDomainForWhmcs(domain);

  return buildWhmcsUrl("/cart.php", {
    a: "add",
    domain: "register",
    sld: parsed?.sld,
    tld: parsed?.tld,
    currency: whmcsCurrencyId(currency),
  });
}

export function buildDomainTransferUrl(domain: string, currency: Currency): string {
  const parsed = parseDomainForWhmcs(domain);

  return buildWhmcsUrl("/cart.php", {
    a: "add",
    domain: "transfer",
    sld: parsed?.sld,
    tld: parsed?.tld,
    currency: whmcsCurrencyId(currency),
  });
}
