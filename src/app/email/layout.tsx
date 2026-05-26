import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { coreSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = coreSeo.email;

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Business Email", path: "/email" }]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
