import { NextResponse } from "next/server";
import {
  customerConfirmationEmailHtml,
  customerConfirmationEmailText,
  internalContactEmailHtml,
  internalContactEmailText,
} from "@/lib/email-templates";

export const runtime = "nodejs";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  project?: unknown;
  date?: unknown;
  message?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as ContactPayload | null;
  if (!payload) return NextResponse.json({ message: "Requête invalide." }, { status: 400 });

  // Honeypot and minimum completion time: bots receive a neutral success.
  if (clean(payload.website, 200) || typeof payload.startedAt !== "number" || Date.now() - payload.startedAt < 1500) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, 100);
  const phone = clean(payload.phone, 40);
  const email = clean(payload.email, 200).toLowerCase();
  const project = clean(payload.project, 150);
  const date = clean(payload.date, 20);
  const message = clean(payload.message, 1500);

  if (
    name.length < 2 ||
    phone.replace(/\D/g, "").length < 10 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
    !project ||
    message.length < 10
  ) {
    return NextResponse.json({ message: "Certains renseignements sont incomplets ou invalides." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { message: "Le service de courriel n’est pas encore configuré. Utilisez le lien de secours ci-dessous." },
      { status: 503 },
    );
  }

  const fingerprint = new TextEncoder().encode(
    `${email}|${payload.startedAt}|${project}|${message}`,
  );
  const digest = await crypto.subtle.digest("SHA-256", fingerprint);
  const submissionId = Array.from(new Uint8Array(digest))
    .slice(0, 6)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  const emailData = { submissionId, name, phone, email, project, date, message };

  const response = await fetch("https://api.resend.com/emails/batch", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `contact-${submissionId}`,
    },
    body: JSON.stringify([
      {
        from,
        to: [to],
        reply_to: email,
        subject: `Nouveau projet — ${project} — ${name}`,
        html: internalContactEmailHtml(emailData),
        text: internalContactEmailText(emailData),
        tags: [
          { name: "type", value: "new-project" },
          { name: "source", value: "website" },
        ],
      },
      {
        from,
        to: [email],
        reply_to: to,
        subject: `${name.split(/\s+/)[0]}, nous avons bien reçu votre projet`,
        html: customerConfirmationEmailHtml(emailData),
        text: customerConfirmationEmailText(emailData),
        tags: [
          { name: "type", value: "confirmation" },
          { name: "source", value: "website" },
        ],
      },
    ]),
  });

  if (!response.ok) {
    console.error("Resend contact form error", response.status, await response.text());
    return NextResponse.json({ message: "Le service de courriel est momentanément indisponible." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, confirmationSent: true, reference: submissionId });
}
