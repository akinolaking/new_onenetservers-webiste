import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

const intentMap: Record<string, string> = {
  domains: "/domains",
  transfer: "/domains/transfer",
  hosting: "/hosting/web",
  wordpress: "/hosting/wordpress",
  vps: "/hosting/vps",
  support: "/contact.php",
  billing: "/clientarea.php?action=invoices",
  default: "/contact",
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const intent = String(body.intent || "default").trim();
  const missingUrl = String(body.missingUrl || "").trim();
  const note = String(body.note || "").trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const payload = {
    source: "main-site-404",
    name,
    email,
    intent,
    missingUrl,
    note,
    occurredAt: new Date().toISOString(),
  };

  const logDir = path.join(process.cwd(), "logs");
  const logFile = path.join(logDir, "404-capture.jsonl");

  await mkdir(logDir, { recursive: true }).catch(() => null);
  await appendFile(logFile, `${JSON.stringify(payload)}\n`, "utf8").catch(() => null);

  const bridgeUrl = process.env.WHMCS_404_BRIDGE_URL;
  const bridgeToken = process.env.WHMCS_404_BRIDGE_TOKEN;

  if (bridgeUrl) {
    await fetch(bridgeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(bridgeToken ? { Authorization: `Bearer ${bridgeToken}` } : {}),
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }).catch(() => null);
  }

  const destination = intentMap[intent] || intentMap.default;
  return NextResponse.json({
    ok: true,
    redirectTo: `${destination}${destination.includes("?") ? "&" : "?"}utm_source=404&utm_medium=recovery`,
  });
}
