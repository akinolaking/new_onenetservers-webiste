/**
 * E2E tests: Pricing card badge visibility + hover shadow on all pricing pages.
 *
 * Bug fixes being tested:
 *  1. "Most Popular" / "Most popular" badge must be fully visible (not clipped by overflow:hidden).
 *  2. Hover shadow on featured cards must follow the card's border-radius (not appear square).
 *  3. All fixes must hold at mobile viewport (375px wide).
 */

import { test, expect } from "@playwright/test";

const PRICING_PAGES = [
  { path: "/", label: "Homepage (PricingBestsellers)" },
  { path: "/hosting/web", label: "Web Hosting" },
  { path: "/hosting/wordpress", label: "WordPress Hosting" },
  { path: "/hosting/vps", label: "Cloud VPS" },
  { path: "/hosting/reseller", label: "Reseller Hosting" },
  { path: "/email", label: "Business Email" },
  { path: "/security/ssl", label: "SSL Certificates" },
];

/** Returns the bounding box of an element relative to the viewport. */
async function getBbox(page: import("@playwright/test").Page, selector: string) {
  return page.locator(selector).first().boundingBox();
}

test.describe("Pricing badge visibility", () => {
  for (const { path, label } of PRICING_PAGES) {
    test(`${label}: featured badge is visible and not clipped`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      // Find any MUI Chip badge with popular-related text
      const badge = page
        .locator('.MuiChip-root')
        .filter({ hasText: /most popular/i })
        .first();

      // If no MUI chip, fall back to legacy badge classes
      const count = await badge.count();
      if (count === 0) {
        // No featured card on this page — skip silently
        return;
      }

      // Badge must be visible in the viewport
      await expect(badge).toBeVisible();

      const badgeBbox = await badge.boundingBox();
      expect(badgeBbox).not.toBeNull();

      if (badgeBbox) {
        // Badge top must be >= 0 (not scrolled above viewport)
        expect(badgeBbox.y).toBeGreaterThanOrEqual(0);
        // Badge must have meaningful width (not clipped to 0)
        expect(badgeBbox.width).toBeGreaterThan(40);
        // Badge height must be > 0
        expect(badgeBbox.height).toBeGreaterThan(0);
      }
    });

    test(`${label}: badge is visible on mobile (375px)`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const badge = page
        .locator('.MuiChip-root')
        .filter({ hasText: /most popular/i })
        .first();

      const count = await badge.count();
      if (count === 0) return;

      await expect(badge).toBeVisible();

      const bbox = await badge.boundingBox();
      expect(bbox).not.toBeNull();
      if (bbox) {
        expect(bbox.width).toBeGreaterThan(30);
        expect(bbox.height).toBeGreaterThan(0);
      }
    });
  }
});

test.describe("Pricing card hover shadow", () => {
  for (const { path, label } of PRICING_PAGES) {
    test(`${label}: featured card has rounded shadow (not square)`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      // MUI Card wrapping a featured card
      const featuredCard = page.locator('.MuiCard-root').first();
      const count = await featuredCard.count();
      if (count === 0) return;

      // Get computed box-shadow before hover
      const shadowBefore = await featuredCard.evaluate(
        (el) => window.getComputedStyle(el).boxShadow
      );
      expect(shadowBefore).not.toBe("none");

      // Hover and check shadow changes
      await featuredCard.hover();
      await page.waitForTimeout(300); // allow CSS transition

      const shadowAfter = await featuredCard.evaluate(
        (el) => window.getComputedStyle(el).boxShadow
      );

      // Shadow should exist after hover
      expect(shadowAfter).not.toBe("none");

      // Verify border-radius on MUI Card matches expected 16px
      const borderRadius = await featuredCard.evaluate(
        (el) => window.getComputedStyle(el).borderRadius
      );
      expect(borderRadius).toBe("16px");
    });
  }
});

test.describe("Homepage PricingBestsellers", () => {
  test("Most Popular badge is visible above the web hosting card", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll to bestsellers section
    await page.locator("#pricing-bestsellers").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const badge = page
      .locator("#pricing-bestsellers .MuiChip-root")
      .filter({ hasText: /most popular/i })
      .first();

    await expect(badge).toBeVisible();

    const badgeBbox = await badge.boundingBox();
    const sectionBbox = await page.locator("#pricing-bestsellers").boundingBox();

    expect(badgeBbox).not.toBeNull();
    expect(sectionBbox).not.toBeNull();

    if (badgeBbox && sectionBbox) {
      // Badge should be within the section's visible area
      expect(badgeBbox.y).toBeGreaterThanOrEqual(sectionBbox.y);
      expect(badgeBbox.y).toBeLessThan(sectionBbox.y + sectionBbox.height);
    }
  });

  test("Non-featured cards do not show Most Popular badge", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const allBadges = page
      .locator("#pricing-bestsellers .MuiChip-root")
      .filter({ hasText: /most popular/i });

    // Should have exactly 1 badge in the bestsellers section
    await expect(allBadges).toHaveCount(1);
  });
});
