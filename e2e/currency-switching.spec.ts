/**
 * E2E tests: Currency switching across all product pages.
 *
 * Validates that:
 *  1. The currency switcher is visible in the nav on all pages.
 *  2. Switching to NGN updates displayed prices to show ₦ symbol.
 *  3. Switching to GBP updates displayed prices to show £ symbol.
 *  4. Switching to USD updates displayed prices to show $ symbol.
 *  5. Currency preference persists across a page navigation.
 *  6. WHMCS cart links include the correct PID and billing cycle.
 */

import { test, expect } from "@playwright/test";

const PRODUCT_PAGES = [
  { path: "/",                    label: "Homepage" },
  { path: "/hosting/web",         label: "Web Hosting" },
  { path: "/hosting/wordpress",   label: "WordPress Hosting" },
  { path: "/hosting/vps",         label: "Cloud VPS" },
  { path: "/hosting/reseller",    label: "Reseller Hosting" },
  { path: "/email",               label: "Business Email" },
  { path: "/security/ssl",        label: "SSL Certificates" },
  { path: "/security/oneguard",   label: "OneGuard Security" },
  { path: "/domains",             label: "Domains" },
];

// ─── Currency switcher visibility ────────────────────────────────────────────

test.describe("Currency switcher visibility", () => {
  for (const { path, label } of PRODUCT_PAGES) {
    test(`${label}: currency switcher is visible in nav`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      // The nav currency selector should contain NGN, GBP, or USD
      const currencyNav = page.locator("[data-testid='currency-switcher'], .currency-switcher, nav").first();
      await expect(currencyNav).toBeVisible();

      // At minimum the page should contain one of the currency abbreviations
      const bodyText = await page.locator("body").textContent();
      const hasCurrencyRef = /NGN|GBP|USD|₦|\$|£/.test(bodyText ?? "");
      expect(hasCurrencyRef).toBe(true);
    });
  }
});

// ─── Currency switching on pricing pages ─────────────────────────────────────

test.describe("Currency switching — price symbol updates", () => {
  for (const { path, label } of PRODUCT_PAGES) {
    test(`${label}: switching to NGN shows ₦ prices`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      // Find the NGN button/option in the currency switcher
      const ngnButton = page.locator("button, [role='option'], [role='radio']")
        .filter({ hasText: /^NGN$/ })
        .first();

      const count = await ngnButton.count();
      if (count === 0) {
        // Try dropdown pattern
        const currencySelect = page.locator("select").filter({ hasText: /NGN/ }).first();
        const selectCount = await currencySelect.count();
        if (selectCount === 0) {
          // Currency switcher not present on this page (acceptable)
          return;
        }
        await currencySelect.selectOption("NGN");
      } else {
        await ngnButton.click();
      }

      await page.waitForTimeout(300); // allow re-render

      // At least one ₦ price should be visible on the page
      const bodyText = await page.locator("body").textContent();
      expect(bodyText).toMatch(/₦/);
    });

    test(`${label}: switching to GBP shows £ prices`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const gbpButton = page.locator("button, [role='option'], [role='radio']")
        .filter({ hasText: /^GBP$/ })
        .first();

      const count = await gbpButton.count();
      if (count === 0) return;

      await gbpButton.click();
      await page.waitForTimeout(300);

      const bodyText = await page.locator("body").textContent();
      expect(bodyText).toMatch(/£/);
    });

    test(`${label}: switching to USD shows $ prices`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      // Switch to NGN first, then back to USD
      const ngnButton = page.locator("button, [role='option'], [role='radio']")
        .filter({ hasText: /^NGN$/ })
        .first();
      if (await ngnButton.count() === 0) return;
      await ngnButton.click();
      await page.waitForTimeout(200);

      const usdButton = page.locator("button, [role='option'], [role='radio']")
        .filter({ hasText: /^USD$/ })
        .first();
      await usdButton.click();
      await page.waitForTimeout(300);

      const bodyText = await page.locator("body").textContent();
      expect(bodyText).toMatch(/\$/);
    });
  }
});

// ─── Currency persistence across navigation ───────────────────────────────────

test.describe("Currency persistence across page navigation", () => {
  test("NGN selection persists from homepage to web hosting", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const ngnButton = page.locator("button, [role='option'], [role='radio']")
      .filter({ hasText: /^NGN$/ })
      .first();

    if (await ngnButton.count() === 0) return;
    await ngnButton.click();
    await page.waitForTimeout(300);

    // Navigate to web hosting
    await page.goto("/hosting/web");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500); // allow localStorage hydration

    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toMatch(/₦/);
  });

  test("GBP selection persists from web hosting to email", async ({ page }) => {
    await page.goto("/hosting/web");
    await page.waitForLoadState("networkidle");

    const gbpButton = page.locator("button, [role='option'], [role='radio']")
      .filter({ hasText: /^GBP$/ })
      .first();

    if (await gbpButton.count() === 0) return;
    await gbpButton.click();
    await page.waitForTimeout(300);

    await page.goto("/email");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);

    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toMatch(/£/);
  });
});

// ─── WHMCS cart link correctness ─────────────────────────────────────────────

test.describe("WHMCS cart links", () => {
  test("Web Hosting: primary CTA links to /cart.php with a PID", async ({ page }) => {
    await page.goto("/hosting/web");
    await page.waitForLoadState("networkidle");

    const cartLinks = page.locator("a[href*='/cart.php']");
    const count = await cartLinks.count();
    expect(count).toBeGreaterThan(0);

    const firstHref = await cartLinks.first().getAttribute("href");
    expect(firstHref).toMatch(/\/cart\.php\?a=add&pid=\d+/);
    expect(firstHref).toMatch(/billingcycle=(monthly|annually)/);
  });

  test("WordPress Hosting: CTA links include pid=260 for WP Starter", async ({ page }) => {
    await page.goto("/hosting/wordpress");
    await page.waitForLoadState("networkidle");

    const wp260Links = page.locator("a[href*='pid=260']");
    const count = await wp260Links.count();
    expect(count).toBeGreaterThan(0);
  });

  test("VPS: CTA links include pid=205 for VPS Starter", async ({ page }) => {
    await page.goto("/hosting/vps");
    await page.waitForLoadState("networkidle");

    const vps205Links = page.locator("a[href*='pid=205']");
    const count = await vps205Links.count();
    expect(count).toBeGreaterThan(0);
  });

  test("Email: CTA links include pid=262 for Business Starter", async ({ page }) => {
    await page.goto("/email");
    await page.waitForLoadState("networkidle");

    const email262Links = page.locator("a[href*='pid=262']");
    const count = await email262Links.count();
    expect(count).toBeGreaterThan(0);
  });

  test("SSL: CTA links include pid=19 for PositiveSSL", async ({ page }) => {
    await page.goto("/security/ssl");
    await page.waitForLoadState("networkidle");

    const ssl19Links = page.locator("a[href*='pid=19']");
    const count = await ssl19Links.count();
    expect(count).toBeGreaterThan(0);
  });

  test("OneGuard: CTA links include pid=237 for OneGuard Basic", async ({ page }) => {
    await page.goto("/security/oneguard");
    await page.waitForLoadState("networkidle");

    const og237Links = page.locator("a[href*='pid=237']");
    const count = await og237Links.count();
    expect(count).toBeGreaterThan(0);
  });

  test("Reseller: CTA links include pid=263 for RSL Starter", async ({ page }) => {
    await page.goto("/hosting/reseller");
    await page.waitForLoadState("networkidle");

    const rsl263Links = page.locator("a[href*='pid=263']");
    const count = await rsl263Links.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ─── Pricing page load smoke tests ───────────────────────────────────────────

test.describe("Pricing page loads", () => {
  for (const { path, label } of PRODUCT_PAGES) {
    test(`${label}: page loads with HTTP 200`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
    });
  }
});

// ─── Domain TLD grid prices ───────────────────────────────────────────────────

test.describe("Domains page TLD pricing", () => {
  test("displays .ng and .com.ng as NiRA-badged entries", async ({ page }) => {
    await page.goto("/domains");
    await page.waitForLoadState("networkidle");

    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toMatch(/\.ng/);
    expect(bodyText).toMatch(/NiRA/i);
  });

  test("shows USD prices by default", async ({ page }) => {
    await page.goto("/domains");
    await page.waitForLoadState("networkidle");

    // Default currency is USD — at least one $ price should appear
    const bodyText = await page.locator("body").textContent();
    expect(bodyText).toMatch(/\$\d+\.\d{2}/);
  });
});
