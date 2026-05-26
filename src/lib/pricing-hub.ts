export const pricingCategoryKeys = [
  "wordpress-hosting",
  "web-hosting",
  "reseller-hosting",
  "domains",
  "vps-hosting",
  "business-email",
  "security",
] as const;

export type PricingHubCategory = (typeof pricingCategoryKeys)[number];
export type PricingHubBilling = "monthly" | "annual";
export type PricingHubDomainMode = "register" | "transfer";

export function buildPricingHubUrl(params: {
  category?: PricingHubCategory;
  billing?: PricingHubBilling;
  focus?: string;
  mode?: PricingHubDomainMode;
  tld?: string;
} = {}) {
  const search = new URLSearchParams();

  if (params.category) search.set("category", params.category);
  if (params.billing) search.set("billing", params.billing);
  if (params.focus) search.set("focus", params.focus);
  if (params.mode) search.set("mode", params.mode);
  if (params.tld) search.set("tld", params.tld);

  const query = search.toString();
  return query ? `/pricing?${query}` : "/pricing";
}
