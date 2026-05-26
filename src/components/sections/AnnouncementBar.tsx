"use client";

import Link from "next/link";
import { useState } from "react";
import { useBilling } from "@/lib/billing-context";
import { useCurrency } from "@/lib/currency-context";
import { buildCartAddUrl } from "@/lib/whmcs";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const { billing } = useBilling();
  const { currency } = useCurrency();

  if (dismissed) {
    return null;
  }

  return (
    <aside className="announcement-bar" aria-label="Announcement">
      <div className="shell announcement-bar__inner">
        <p>30-day money-back guarantee on all plans · Free migration included · Cancel any time</p>
        <div className="announcement-bar__actions">
          <Link href={`/pricing?category=web-hosting&billing=${billing}`}>Get started free</Link>
          <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss announcement">
            Close
          </button>
        </div>
      </div>
    </aside>
  );
}
