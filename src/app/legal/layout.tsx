import { LegalSidebar } from "@/components/layout/LegalSidebar";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="legal-shell">
      <LegalSidebar />
      <main className="legal-content" id="main-content">
        {children}
      </main>
    </div>
  );
}
