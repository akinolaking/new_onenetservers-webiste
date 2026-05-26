export function ensureBrevoConversations() {
  if (typeof window === "undefined") return;

  const brevoWindow = window as typeof window & {
    BrevoConversationsID?: string;
    BrevoConversations?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  };

  brevoWindow.BrevoConversationsID = "688da305eed8b6ad99059fc6";
  if (typeof brevoWindow.BrevoConversations !== "function") {
    const queueFn = ((...args: unknown[]) => {
      (queueFn.q = queueFn.q || []).push(args);
    }) as ((...args: unknown[]) => void) & { q?: unknown[][] };
    brevoWindow.BrevoConversations = queueFn;
  }

  if (!document.querySelector("script[data-brevo-conversations]")) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://conversations-widget.brevo.com/brevo-conversations.js";
    script.dataset.brevoConversations = "true";
    document.head.appendChild(script);
  }
}

export function openBrevoChat() {
  if (typeof window === "undefined") return;
  ensureBrevoConversations();

  const brevoWindow = window as typeof window & {
    BrevoConversations?: (...args: unknown[]) => void;
  };

  window.setTimeout(() => {
    try {
      brevoWindow.BrevoConversations?.("open");
    } catch {}
  }, 120);
}
