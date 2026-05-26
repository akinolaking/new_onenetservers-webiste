"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type BillingCycle = "monthly" | "annual";

type BillingContextValue = {
  billing: BillingCycle;
  setBilling: (billing: BillingCycle) => void;
};

const BillingContext = createContext<BillingContextValue | null>(null);
const STORAGE_KEY = "onenet_billing_cycle";

function getInitialBilling(): BillingCycle {
  if (typeof window === "undefined") return "annual";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "monthly" || saved === "annual" ? saved : "annual";
}

export function BillingProvider({ children }: { children: ReactNode }) {
  const [billing, setBillingState] = useState<BillingCycle>("annual");

  useEffect(() => {
    setBillingState(getInitialBilling());
  }, []);

  function setBilling(next: BillingCycle) {
    setBillingState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
    }
  }

  return (
    <BillingContext.Provider value={{ billing, setBilling }}>
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error("useBilling must be used within BillingProvider");
  }
  return context;
}
