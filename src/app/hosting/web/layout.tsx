import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { coreSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = coreSeo.webHosting;

const breadcrumbs = breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Hosting", path: "/pricing?category=web-hosting" }, { name: "Web Hosting", path: "/hosting/web" }]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      {children}
    </>
  );
}
