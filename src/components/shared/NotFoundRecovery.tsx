"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

const options = [
  { value: "domains", label: "Find a domain" },
  { value: "transfer", label: "Transfer a domain" },
  { value: "hosting", label: "Buy hosting" },
  { value: "wordpress", label: "Launch WordPress" },
  { value: "vps", label: "Deploy VPS" },
  { value: "support", label: "Contact support" },
];

export function NotFoundRecovery() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [intent, setIntent] = useState("support");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/404-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        intent,
        note,
        missingUrl: pathname,
      }),
    });

    const json = await response.json().catch(() => null);
    setLoading(false);

    if (!response.ok || !json?.redirectTo) {
      setError("We could not save your request right now. Use the quick links below.");
      return;
    }

    window.location.href = json.redirectTo;
  }

  return (
    <section
      style={{
        border: "1px solid var(--line)",
        borderRadius: 24,
        background: "#fff",
        padding: "24px",
        boxShadow: "0 16px 40px rgba(17, 24, 39, 0.06)",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>
          Recovery form
        </div>
        <h2 style={{ margin: "8px 0 10px", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>Tell us what you were trying to do.</h2>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          We&apos;ll capture the broken path, then send you to the right product or support route.
        </p>
      </div>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{ padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 14 }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          style={{ padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 14 }}
        />
        <select
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          style={{ padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 14 }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note"
          rows={4}
          style={{ padding: "14px 16px", border: "1px solid var(--line)", borderRadius: 14, resize: "vertical" }}
        />

        <div
          style={{
            fontSize: 13,
            color: "var(--muted)",
            background: "var(--blue-xl)",
            border: "1px solid rgba(67,67,240,0.16)",
            borderRadius: 14,
            padding: "12px 14px",
            wordBreak: "break-word",
          }}
        >
          Missing page: <strong>{pathname}</strong>
        </div>

        {error ? <p style={{ margin: 0, color: "#b91c1c" }}>{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          style={{
            border: 0,
            borderRadius: 999,
            padding: "14px 20px",
            background: "linear-gradient(135deg, #4343f0, #5f5fff)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          {loading ? "Routing you…" : "Continue to the right page"}
        </button>
      </form>
    </section>
  );
}
