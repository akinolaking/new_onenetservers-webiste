import Link from "next/link";

import { NotFoundRecovery } from "@/components/shared/NotFoundRecovery";

export default function NotFound() {
  return (
    <main className="page-shell">
      <section style={{ padding: "72px 0" }}>
        <div className="shell" style={{ display: "grid", gap: 28 }}>
          <div
            style={{
              borderRadius: 32,
              padding: "32px",
              background: "linear-gradient(180deg, rgba(67,67,240,0.08), rgba(67,67,240,0.02))",
              border: "1px solid rgba(67,67,240,0.12)",
            }}
          >
            <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted)" }}>
              Error 404
            </div>
            <h1 style={{ margin: "10px 0 12px", fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.05 }}>
              That page has moved or no longer exists.
            </h1>
            <p style={{ maxWidth: 720, margin: 0, color: "var(--muted)", fontSize: "1.05rem" }}>
              We&apos;ve kept the recovery path simple: search domains, return to hosting, open support,
              or tell us what you were looking for and we&apos;ll route you to the closest live WHMCS or
              product page.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
              <Link href="/domains" style={{ padding: "12px 18px", borderRadius: 999, background: "#4343f0", color: "#fff", textDecoration: "none", fontWeight: 700 }}>
                Register a domain
              </Link>
              <Link href="/hosting/web" style={{ padding: "12px 18px", borderRadius: 999, border: "1px solid var(--line)", textDecoration: "none", fontWeight: 700 }}>
                View hosting plans
              </Link>
              <Link href="/contact.php" style={{ padding: "12px 18px", borderRadius: 999, border: "1px solid var(--line)", textDecoration: "none", fontWeight: 700 }}>
                Contact support
              </Link>
            </div>
          </div>

          <NotFoundRecovery />
        </div>
      </section>
    </main>
  );
}
