import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { spawnSync } from "node:child_process";

type Bucket = { count: number; resetAt: number };

declare global {
  var __onenetContactLimiter: Map<string, Bucket> | undefined;
}

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000;
const CONTACT_TO = "support@onenetservers.net";
const limiter = globalThis.__onenetContactLimiter ?? new Map<string, Bucket>();
globalThis.__onenetContactLimiter = limiter;

function getClientKey(headerList: Headers) {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown-ip";
  const agent = headerList.get("user-agent")?.slice(0, 120) || "unknown-agent";
  return `${forwarded}::${agent}`;
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  const bucket = limiter.get(key);
  if (!bucket || bucket.resetAt <= now) {
    limiter.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT_MAX) {
    return false;
  }
  bucket.count += 1;
  return true;
}

function clean(value: string) {
  return value.replace(/[\r\n\0]+/g, " ").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sendMail(payload: { name: string; email: string; subject: string; message: string }) {
  const body = [
    "From: OneNet Contact Form <no-reply@onenetservers.net>",
    `Reply-To: ${payload.email}`,
    `To: ${CONTACT_TO}`,
    `Subject: [OneNet Contact] ${payload.subject}`,
    "Content-Type: text/plain; charset=UTF-8",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    payload.message,
    "",
  ].join("\n");

  for (const sendmailPath of ["/sbin/sendmail", "/usr/sbin/sendmail", "sendmail"]) {
    const result = spawnSync(sendmailPath, ["-t", "-i"], { input: body, encoding: "utf8" });
    if (result.status === 0) {
      return;
    }
  }

  throw new Error("sendmail_failed");
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const headerList = await headers();
    const key = getClientKey(headerList);

    if (!consumeRateLimit(key)) {
      return NextResponse.json({ ok: false, message: "Too many requests. Please wait a bit and try again." }, { status: 429 });
    }

    const data = await request.json();
    const honey = clean(String(data.website || ""));
    if (honey) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(String(data.name || ""));
    const email = clean(String(data.email || "")).toLowerCase();
    const subject = clean(String(data.subject || ""));
    const message = clean(String(data.message || ""));

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, field: "name", message: "Full name is required." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, field: "email", message: "Enter a valid email address." }, { status: 400 });
    }
    if (!subject) {
      return NextResponse.json({ ok: false, field: "subject", message: "Please select a topic." }, { status: 400 });
    }
    if (!message || message.length < 12) {
      return NextResponse.json({ ok: false, field: "message", message: "Please add a bit more detail so we can help properly." }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ ok: false, field: "message", message: "Message is too long." }, { status: 400 });
    }

    sendMail({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, message: "We could not send your message right now. Please email support@onenetservers.net." }, { status: 500 });
  }
}
