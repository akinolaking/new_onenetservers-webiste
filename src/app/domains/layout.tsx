import type { Metadata } from "next";
import { coreSeo } from "@/lib/seo-metadata";

export const metadata: Metadata = coreSeo.domains;

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
