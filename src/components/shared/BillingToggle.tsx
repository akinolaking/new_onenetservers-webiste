"use client";

type BillingMode = "monthly" | "annual";

type BillingToggleProps = {
  billing: BillingMode;
  onChange: (billing: BillingMode) => void;
  savingsText?: string;
};

export function BillingToggle({
  billing,
  onChange,
  savingsText,
}: BillingToggleProps) {
  return (
    <div className="billing-toggle">
      <div className="billing-tabs" aria-label="Billing frequency">
        <button
          type="button"
          className={billing === "monthly" ? "is-active" : ""}
          aria-pressed={billing === "monthly"}
          onClick={() => onChange("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          className={billing === "annual" ? "is-active" : ""}
          aria-pressed={billing === "annual"}
          onClick={() => onChange("annual")}
        >
          Annual
        </button>
      </div>
      {savingsText ? <span className="wh-savings-badge">{savingsText}</span> : null}
    </div>
  );
}
