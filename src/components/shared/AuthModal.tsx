"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useCurrency } from "@/lib/currency-context";
import { buildWhmcsUrl, whmcsCurrencyId } from "@/lib/whmcs";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────── */
type Tab = "login" | "signup";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

async function fetchWhmcsCsrf(path: string): Promise<string | null> {
  try {
    const cacheBustedPath = `${path}${path.includes("?") ? "&" : "?"}__auth=${Date.now()}`;
    const response = await fetch(cacheBustedPath, {
      credentials: "include",
      cache: "no-store",
    });
    const html = await response.text();
    const inlineToken =
      html.match(/var\s+csrfToken\s*=\s*'([^']+)'/)?.[1] ??
      html.match(/name="token"\s+value="([^"]+)"/)?.[1] ??
      null;
    return inlineToken;
  } catch {
    return null;
  }
}

function buildAuthBypassUrl(path: string, params?: Record<string, string>) {
  const query = new URLSearchParams({
    __auth: String(Date.now()),
    ...(params ?? {}),
  });

  return `${path}?${query.toString()}`;
}

function submitWhmcsForm(action: string, fields: Record<string, string>) {
  const form = document.createElement("form");
  form.method = "post";
  form.action = action;
  form.style.display = "none";

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

/* ── Helpers ─────────────────────────────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/* ── Spinner ─────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <span className="auth-spinner" aria-hidden="true">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10" />
      </svg>
    </span>
  );
}

/* ── Login Form ──────────────────────────────────────────────────── */
function LoginForm() {
  const { currency } = useCurrency();
  const emailId = useId();
  const passId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs: { email?: string; password?: string } = {};
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errs.email = "Email address is required.";
    } else if (!EMAIL_RE.test(trimmedEmail)) {
      errs.email = "Enter a valid email address.";
    }
    if (!password) {
      errs.password = "Password is required.";
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    void (async () => {
      const token = await fetchWhmcsCsrf("/login");
      if (!token) {
        window.location.href = buildAuthBypassUrl("/login", {
          email: escapeHtml(email.trim()),
        });
        return;
      }
      submitWhmcsForm("/login", {
        token,
        username: email.trim(),
        password,
      });
    })();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className={cn("auth-field", errors.email && "auth-field--error")}>
        <label htmlFor={emailId}>Email address</label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="you@example.com"
          aria-describedby={errors.email ? `${emailId}-err` : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span id={`${emailId}-err`} className="auth-field__error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={cn("auth-field", errors.password && "auth-field--error")}>
        <div className="auth-field__label-row">
          <label htmlFor={passId}>Password</label>
          <a href={buildWhmcsUrl("/password/reset", { currency: whmcsCurrencyId(currency) })} className="auth-forgot">
            Forgot password?
          </a>
        </div>
        <input
          id={passId}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder="Your password"
          aria-describedby={errors.password ? `${passId}-err` : undefined}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <span id={`${passId}-err`} className="auth-field__error" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      <button type="submit" className="auth-submit" disabled={submitting}>
        {submitting ? <Spinner /> : null}
        {submitting ? "Signing in\u2026" : "Log in"}
      </button>
    </form>
  );
}

/* ── Sign-Up Form ────────────────────────────────────────────────── */
function SignupForm() {
  const { currency } = useCurrency();
  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const confirmId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "Full name is required.";
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errs.email = "Email address is required.";
    } else if (!EMAIL_RE.test(trimmedEmail)) {
      errs.email = "Enter a valid email address.";
    }
    if (!password) {
      errs.password = "Password is required.";
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters.";
    }
    if (!confirm) {
      errs.confirm = "Please confirm your password.";
    } else if (confirm !== password) {
      errs.confirm = "Passwords do not match.";
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const params = new URLSearchParams({
      firstname: escapeHtml(name.trim().split(" ")[0] ?? ""),
      lastname: escapeHtml(name.trim().split(" ").slice(1).join(" ")),
      email: escapeHtml(email.trim()),
      currency: whmcsCurrencyId(currency),
    });
    setTimeout(() => {
      window.location.href = `${buildWhmcsUrl("/register.php")}?${params.toString()}`;
    }, 600);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <div className={cn("auth-field", errors.name && "auth-field--error")}>
        <label htmlFor={nameId}>Full name</label>
        <input
          id={nameId}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="Your full name"
          aria-describedby={errors.name ? `${nameId}-err` : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span id={`${nameId}-err`} className="auth-field__error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={cn("auth-field", errors.email && "auth-field--error")}>
        <label htmlFor={emailId}>Email address</label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="you@example.com"
          aria-describedby={errors.email ? `${emailId}-err` : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span id={`${emailId}-err`} className="auth-field__error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={cn("auth-field", errors.password && "auth-field--error")}>
        <label htmlFor={passId}>Password</label>
        <input
          id={passId}
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder="At least 8 characters"
          aria-describedby={errors.password ? `${passId}-err` : undefined}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <span id={`${passId}-err`} className="auth-field__error" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      <div className={cn("auth-field", errors.confirm && "auth-field--error")}>
        <label htmlFor={confirmId}>Confirm password</label>
        <input
          id={confirmId}
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setErrors((prev) => ({ ...prev, confirm: undefined }));
          }}
          placeholder="Repeat your password"
          aria-describedby={errors.confirm ? `${confirmId}-err` : undefined}
          aria-invalid={!!errors.confirm}
        />
        {errors.confirm && (
          <span id={`${confirmId}-err`} className="auth-field__error" role="alert">
            {errors.confirm}
          </span>
        )}
      </div>

      <button type="submit" className="auth-submit" disabled={submitting}>
        {submitting ? <Spinner /> : null}
        {submitting ? "Creating account\u2026" : "Create account"}
      </button>
    </form>
  );
}

/* ── AuthModal ───────────────────────────────────────────────────── */
export function AuthModal({ open, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>("login");
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on outside click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          key="auth-overlay"
          className="auth-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label={tab === "login" ? "Log in to your account" : "Create an account"}
        >
          <motion.div
            ref={cardRef}
            className="auth-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            {/* Close button */}
            <button
              type="button"
              className="auth-close"
              aria-label="Close"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>

            {/* Brand */}
            <div className="auth-brand">
              <strong>OneNet Servers</strong>
            </div>

            {/* Tabs */}
            <div className="auth-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={tab === "login"}
                className={cn("auth-tab", tab === "login" && "auth-tab--active")}
                onClick={() => setTab("login")}
              >
                Log in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "signup"}
                className={cn("auth-tab", tab === "signup" && "auth-tab--active")}
                onClick={() => setTab("signup")}
              >
                Sign up
              </button>
            </div>

            {/* Form content */}
            <div role="tabpanel">
              <AnimatePresence mode="wait" initial={false}>
                {tab === "login" ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <LoginForm />
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <SignupForm />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer switcher */}
            <p className="auth-footer-switch">
              {tab === "login" ? (
                <>
                  No account?{" "}
                  <button
                    type="button"
                    className="auth-switch-btn"
                    onClick={() => setTab("signup")}
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="auth-switch-btn"
                    onClick={() => setTab("login")}
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
