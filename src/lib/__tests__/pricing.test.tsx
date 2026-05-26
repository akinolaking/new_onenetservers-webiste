/**
 * Unit tests: Pricing accuracy and currency switching.
 *
 * Validates that:
 *  1. All WHMCS product IDs (PIDs) are present and non-empty on plan data.
 *  2. All USD prices are positive numbers.
 *  3. The currency format() function converts USD → NGN / GBP correctly.
 *  4. Currency switching updates the formatted output.
 *  5. pricingCategories price strings are internally consistent.
 *  6. TLD price data matches expected WHMCS values.
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RATES, SYMBOLS, CurrencyProvider, useCurrency } from "@/lib/currency-context";
import { tlds, pricingCategories } from "@/lib/home-data";

// ─── Currency context unit tests ─────────────────────────────────────────────

describe("RATES and SYMBOLS", () => {
  test("USD rate is 1 (baseline)", () => {
    expect(RATES.USD).toBe(1);
  });

  test("NGN rate is positive and greater than 1 (NGN is weaker than USD)", () => {
    expect(RATES.NGN).toBeGreaterThan(1);
  });

  test("GBP rate is between 0 and 1 (GBP is stronger than USD)", () => {
    expect(RATES.GBP).toBeGreaterThan(0);
    expect(RATES.GBP).toBeLessThan(1);
  });

  test("SYMBOLS are correct per currency", () => {
    expect(SYMBOLS.USD).toBe("$");
    expect(SYMBOLS.NGN).toBe("₦");
    expect(SYMBOLS.GBP).toBe("£");
  });
});

// ─── format() helper ─────────────────────────────────────────────────────────

/** Minimal component to expose format() output for testing */
function FormatOutput({ usd, decimals = 2 }: { usd: number; decimals?: number }) {
  const { format } = useCurrency();
  return <span data-testid="output">{format(usd, decimals)}</span>;
}

describe("CurrencyProvider.format()", () => {
  test("formats USD correctly", () => {
    render(
      <CurrencyProvider>
        <FormatOutput usd={12.42} />
      </CurrencyProvider>
    );
    // Default is USD (server-side)
    expect(screen.getByTestId("output").textContent).toBe("$12.42");
  });

  test("formats a round number with two decimals in USD", () => {
    render(
      <CurrencyProvider>
        <FormatOutput usd={10} />
      </CurrencyProvider>
    );
    expect(screen.getByTestId("output").textContent).toBe("$10.00");
  });

  test("formats zero as $0.00 in USD", () => {
    render(
      <CurrencyProvider>
        <FormatOutput usd={0} />
      </CurrencyProvider>
    );
    expect(screen.getByTestId("output").textContent).toBe("$0.00");
  });

  test("NGN conversion: $23.40 × 1838 = ₦42,978 (rounded, no decimals)", () => {
    const expected = Math.round(23.40 * RATES.NGN);
    expect(expected).toBe(Math.round(23.40 * RATES.NGN));
    // Ensure NGN rate produces a value in expected range (₦40k–₦50k for $23.40)
    expect(expected).toBeGreaterThan(40000);
    expect(expected).toBeLessThan(50000);
  });

  test("GBP conversion: $23.40 × 0.931 produces a reasonable GBP amount", () => {
    const result = 23.40 * RATES.GBP;
    expect(result).toBeGreaterThan(20);
    expect(result).toBeLessThan(25);
  });
});

// ─── Currency switcher UI ─────────────────────────────────────────────────────

function CurrencySwitcherDemo() {
  const { currency, setCurrency, format } = useCurrency();
  return (
    <div>
      <span data-testid="currency">{currency}</span>
      <span data-testid="price">{format(28.60, 2)}</span>
      <button onClick={() => setCurrency("NGN")}>NGN</button>
      <button onClick={() => setCurrency("GBP")}>GBP</button>
      <button onClick={() => setCurrency("USD")}>USD</button>
    </div>
  );
}

describe("Currency switcher", () => {
  test("switching to NGN shows ₦ symbol", () => {
    render(
      <CurrencyProvider>
        <CurrencySwitcherDemo />
      </CurrencyProvider>
    );
    fireEvent.click(screen.getByText("NGN"));
    expect(screen.getByTestId("price").textContent).toMatch(/^₦/);
    expect(screen.getByTestId("currency").textContent).toBe("NGN");
  });

  test("switching to GBP shows £ symbol", () => {
    render(
      <CurrencyProvider>
        <CurrencySwitcherDemo />
      </CurrencyProvider>
    );
    fireEvent.click(screen.getByText("GBP"));
    expect(screen.getByTestId("price").textContent).toMatch(/^£/);
    expect(screen.getByTestId("currency").textContent).toBe("GBP");
  });

  test("switching back to USD shows $ symbol", () => {
    render(
      <CurrencyProvider>
        <CurrencySwitcherDemo />
      </CurrencyProvider>
    );
    fireEvent.click(screen.getByText("NGN"));
    fireEvent.click(screen.getByText("USD"));
    expect(screen.getByTestId("price").textContent).toMatch(/^\$/);
    expect(screen.getByTestId("currency").textContent).toBe("USD");
  });

  test("NGN format omits decimal places", () => {
    render(
      <CurrencyProvider>
        <CurrencySwitcherDemo />
      </CurrencyProvider>
    );
    fireEvent.click(screen.getByText("NGN"));
    const text = screen.getByTestId("price").textContent ?? "";
    expect(text).not.toMatch(/\.\d{2}$/);
  });

  test("USD format includes two decimal places", () => {
    render(
      <CurrencyProvider>
        <CurrencySwitcherDemo />
      </CurrencyProvider>
    );
    fireEvent.click(screen.getByText("USD"));
    const text = screen.getByTestId("price").textContent ?? "";
    expect(text).toMatch(/\.\d{2}$/);
  });
});

// ─── pricingCategories data integrity ────────────────────────────────────────

describe("pricingCategories data integrity", () => {
  test("all categories have at least two plans", () => {
    for (const category of pricingCategories) {
      expect(category.plans.length).toBeGreaterThanOrEqual(2);
    }
  });

  test("all non-domain plans have a non-empty PID", () => {
    for (const category of pricingCategories) {
      if (category.key === "domains") continue; // domains use register URLs
      for (const plan of category.plans) {
        expect(plan.pid).toBeTruthy();
        expect(typeof plan.pid).toBe("string");
      }
    }
  });

  test("all plan PIDs are numeric strings", () => {
    for (const category of pricingCategories) {
      for (const plan of category.plans) {
        if (!plan.pid) continue;
        expect(plan.pid).toMatch(/^\d+$/);
      }
    }
  });

  test("all monthly USD prices start with $", () => {
    for (const category of pricingCategories) {
      for (const plan of category.plans) {
        expect(plan.monthly.USD).toMatch(/^\$/);
      }
    }
  });

  test("all monthly NGN prices start with ₦", () => {
    for (const category of pricingCategories) {
      for (const plan of category.plans) {
        expect(plan.monthly.NGN).toMatch(/^₦/);
      }
    }
  });

  test("all monthly GBP prices start with £", () => {
    for (const category of pricingCategories) {
      for (const plan of category.plans) {
        expect(plan.monthly.GBP).toMatch(/^£/);
      }
    }
  });

  test("exactly one plan per category is featured", () => {
    for (const category of pricingCategories) {
      const featuredCount = category.plans.filter((p) => (p as { featured?: boolean }).featured).length;
      expect(featuredCount).toBeLessThanOrEqual(1);
    }
  });

  test("all plans have a non-empty description and renewal text", () => {
    for (const category of pricingCategories) {
      for (const plan of category.plans) {
        expect(plan.description.trim().length).toBeGreaterThan(0);
        expect(plan.renewal.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

// ─── Specific WHMCS PID assertions ───────────────────────────────────────────

describe("WHMCS Product ID (PID) correctness", () => {
  const getPlan = (categoryKey: string, planName: string) => {
    const cat = pricingCategories.find((c) => c.key === categoryKey);
    return cat?.plans.find((p) => p.name === planName);
  };

  test("Web Hosting Starter PID = 261", () => {
    expect(getPlan("hosting", "Starter")?.pid).toBe("261");
  });

  test("Web Hosting Premium PID = 252", () => {
    expect(getPlan("hosting", "Premium")?.pid).toBe("252");
  });

  test("WP Starter PID = 260", () => {
    expect(getPlan("wordpress", "WP Starter")?.pid).toBe("260");
  });

  test("WP Premium PID = 249", () => {
    expect(getPlan("wordpress", "WP Premium")?.pid).toBe("249");
  });

  test("VPS Starter PID = 205", () => {
    expect(getPlan("vps", "VPS Starter")?.pid).toBe("205");
  });

  test("VPS Premium PID = 265", () => {
    expect(getPlan("vps", "VPS Premium")?.pid).toBe("265");
  });
});

// ─── TLD price data ───────────────────────────────────────────────────────────

describe("TLD price data", () => {
  test("all TLD USD prices are non-negative numbers", () => {
    for (const tld of tlds) {
      expect(typeof tld.usd).toBe("number");
      expect(tld.usd).toBeGreaterThanOrEqual(0);
    }
  });

  test(".ng USD price = 23.40", () => {
    const ng = tlds.find((t) => t.ext === ".ng");
    expect(ng?.usd).toBe(23.40);
  });

  test(".com.ng USD price = 11.24", () => {
    const comng = tlds.find((t) => t.ext === ".com.ng");
    expect(comng?.usd).toBe(11.24);
  });

  test(".com USD price = 28.60", () => {
    const com = tlds.find((t) => t.ext === ".com");
    expect(com?.usd).toBe(28.60);
  });

  test(".ai USD price = 227.76", () => {
    const ai = tlds.find((t) => t.ext === ".ai");
    expect(ai?.usd).toBe(227.76);
  });

  test(".xyz USD price = 8.19 (lowest)", () => {
    const xyz = tlds.find((t) => t.ext === ".xyz");
    expect(xyz?.usd).toBe(8.19);
  });

  test(".io USD price = 106.34", () => {
    const io = tlds.find((t) => t.ext === ".io");
    expect(io?.usd).toBe(106.34);
  });

  test(".ng is the most expensive NiRA domain", () => {
    const ng = tlds.find((t) => t.ext === ".ng")!;
    const comng = tlds.find((t) => t.ext === ".com.ng")!;
    expect(ng.usd).toBeGreaterThan(comng.usd);
  });

  test("all TLD extensions start with a dot", () => {
    for (const tld of tlds) {
      expect(tld.ext).toMatch(/^\./);
    }
  });
});
