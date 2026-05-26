import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { coreSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = coreSeo.ssl;

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Security", path: "/pricing?category=security" }, { name: "SSL Certificates", path: "/security/ssl" }]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
