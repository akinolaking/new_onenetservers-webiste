"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Currency } from "@/lib/site-data";

/* ── Exchange rates (USD baseline, derived from WHMCS live currency table) ── */
export const RATES: Record<Currency, number> = {
  USD: 1,
  NGN: 769.230769,   // WHMCS tblcurrencies: NGN base, USD rate 0.0013
  GBP: 0.715384615,  // derived from WHMCS tblcurrencies: 0.00093 / 0.0013
};

export const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  NGN: "₦",
  GBP: "£",
};

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (usd: number, decimals?: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

const STORAGE_KEY = "onenet_currency";
const SUPPORTED_CURRENCIES: Currency[] = ["USD", "NGN", "GBP"];

function isCurrency(value: string | null | undefined): value is Currency {
  return SUPPORTED_CURRENCIES.includes(value as Currency);
}

function readCookieCurrency(): Currency | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${STORAGE_KEY}=`));
  if (!match) return null;
  const value = decodeURIComponent(match.slice(STORAGE_KEY.length + 1)).toUpperCase();
  return isCurrency(value) ? value : null;
}

function writeCurrencyPreference(currency: Currency) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, currency);
    } catch {
      /* ignore — storage may be unavailable in private mode */
    }
  }

  if (typeof document !== "undefined") {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(currency)}; path=/; max-age=${maxAge}; samesite=lax`;
  }
}

function getInitialCurrency(): Currency {
  /* Server-side: fall back to USD */
  if (typeof window === "undefined") return "USD";
  /* WHMCS writes this cookie, so it is the cross-platform source of truth. */
  const cookieCurrency = readCookieCurrency();
  if (cookieCurrency) return cookieCurrency;
  /* Older main-site sessions may only have localStorage. Promote it to the shared cookie. */
  const saved = localStorage.getItem(STORAGE_KEY);
  if (isCurrency(saved)) return saved;
  /* Auto-detect from browser locale */
  const lang = navigator.language ?? "";
  if (
    lang.startsWith("en-NG") ||
    lang.startsWith("ha") ||
    lang.startsWith("yo") ||
    lang.startsWith("ig")
  ) {
    return "NGN";
  }
  if (lang.startsWith("en-GB")) return "GBP";
  return "USD";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  /* Hydrate from WHMCS cookie / saved preference / locale on mount (client-only). */
  useEffect(() => {
    const initialCurrency = getInitialCurrency();
    setCurrencyState(initialCurrency);
    writeCurrencyPreference(initialCurrency);
  }, []);

  function setCurrency(c: Currency) {
    setCurrencyState(c);
    writeCurrencyPreference(c);
  }

  function format(usd: number, decimals = 2): string {
    const value = usd * RATES[currency];
    const sym = SYMBOLS[currency];
    if (currency === "NGN") {
      /* NGN: no decimals, comma-separated thousands */
      return `${sym}${Math.round(value).toLocaleString("en-NG")}`;
    }
    return `${sym}${value.toFixed(decimals)}`;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
