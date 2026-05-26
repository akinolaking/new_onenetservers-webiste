"use client";

import { useCurrency } from "@/lib/currency-context";

type PriceProps = {
  /** Baseline USD price */
  usd: number;
  /** Override GBP — if omitted, converted from USD via exchange rate */
  gbp?: number;
  /** Override NGN — if omitted, converted from USD via exchange rate */
  ngn?: number;
  /** Number of decimal places for USD/GBP (default 2). NGN always 0. */
  decimals?: number;
  /** Suffix appended after the formatted amount, e.g. "/mo" */
  suffix?: string;
};

/**
 * Price — renders a single price string in the user's active currency.
 * Reads from CurrencyContext; no props for currency selection.
 *
 * @example
 * <Price usd={3.99} suffix="/mo" />
 * <Price usd={23.40} ngn={43000} gbp={21.79} suffix="/yr" />
 */
export function Price({ usd, gbp, ngn, decimals = 2, suffix }: PriceProps) {
  const { currency, format } = useCurrency();

  let display: string;

  if (currency === "NGN" && ngn !== undefined) {
    display = `₦${Math.round(ngn).toLocaleString("en-NG")}`;
  } else if (currency === "GBP" && gbp !== undefined) {
    display = `£${gbp.toFixed(decimals)}`;
  } else if (currency === "NGN") {
    display = format(usd, 0);
  } else {
    display = format(usd, decimals);
  }

  if (suffix) {
    return (
      <>
        {display}
        <span className="price-suffix">{suffix}</span>
      </>
    );
  }

  return <>{display}</>;
}
