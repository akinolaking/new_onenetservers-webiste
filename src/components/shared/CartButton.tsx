"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type CartButtonProps = {
  href: string;
  label: string;
  className?: string;
  variant?: "primary" | "ghost";
};

/**
 * CartButton — wraps any WHMCS cart link with a brief "Adding..." UX state.
 * Cosmetic only: disables the button for 800ms then navigates.
 */
export function CartButton({
  href,
  label,
  className,
  variant = "primary",
}: CartButtonProps) {
  const [adding, setAdding] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (adding) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      setAdding(true);

      timerRef.current = setTimeout(() => {
        setAdding(false);
        window.location.href = href;
      }, 800);
    },
    [adding, href]
  );

  const baseClass =
    variant === "primary" ? "cart-btn cart-btn--primary" : "cart-btn cart-btn--ghost";

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-busy={adding}
      aria-disabled={adding}
      className={cn(baseClass, adding && "cart-btn--adding", className)}
    >
      {adding ? (
        <>
          <span className="cart-btn__spinner" aria-hidden="true" />
          Adding&hellip;
        </>
      ) : (
        label
      )}
    </a>
  );
}
