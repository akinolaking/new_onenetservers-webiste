import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { coreSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = coreSeo.domainsNg;

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Domains", path: "/domains" }, { name: ".NG Domains", path: "/domains/ng" }]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
