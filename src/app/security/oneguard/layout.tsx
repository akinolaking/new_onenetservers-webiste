import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { coreSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = coreSeo.oneguard;

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Security", path: "/pricing?category=security" }, { name: "OneGuard Security", path: "/security/oneguard" }]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
