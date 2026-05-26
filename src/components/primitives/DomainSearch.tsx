"use client";

import { FormEvent, useMemo, useState } from "react";
import { useCurrency } from "@/lib/currency-context";
import { buildDomainRegisterUrl, buildDomainTransferUrl } from "@/lib/whmcs";

function normaliseDomain(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-.]/g, "");
}

export function DomainSearch({ mode = "register" }: { mode?: "register" | "transfer" }) {
  const [query, setQuery] = useState("");
  const { currency } = useCurrency();
  const canSubmit = useMemo(() => normaliseDomain(query).length > 2, [query]);

  function buildActionUrl(domain: string) {
    return mode === "transfer"
      ? buildDomainTransferUrl(domain, currency)
      : buildDomainRegisterUrl(domain, currency);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const domain = normaliseDomain(query);
    if (domain.length <= 2) return;

    window.location.assign(buildActionUrl(domain));
  }

  return (
    <div className="domain-search-wrap">
      <form
        className="domain-search-form"
        onSubmit={onSubmit}
        role="search"
        aria-label="Domain search"
      >
        <label className="sr-only" htmlFor="domain-search-input">
          Enter a business name or domain to search
        </label>
        <div className="domain-search-field">
          <input
            id="domain-search-input"
            className="domain-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your business name or domain…"
            inputMode="url"
            enterKeyHint="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <button
            type="submit"
            className="domain-search-submit"
            disabled={!canSubmit}
          >
            Search domains
          </button>
        </div>
      </form>
    </div>
  );
}
