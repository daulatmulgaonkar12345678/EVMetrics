import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { formatPilotRequestBody, validatePilotRequest } from '@/lib/contact';

/**
 * Pilot-request endpoint.
 *
 * Behaviour that matters for this project:
 *  - The submission is delivered to EXACTLY ONE address: the server-only
 *    `CONTACT_TO_EMAIL` environment variable. There is no cc, no bcc, no
 *    auto-reply to the visitor, and no copy of the message sent anywhere else.
 *  - That address is never returned to the browser and never rendered on any
 *    page. The browser only learns whether the request succeeded.
 *  - `CONTACT_TO_EMAIL` is intentionally NOT prefixed with `NEXT_PUBLIC_`,
 *    because `NEXT_PUBLIC_*` variables are inlined into the client bundle.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const attempts = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);

  if (attempts.size > 5_000) attempts.clear();

  if (recent.length >= RATE_LIMIT.max) {
    attempts.set(key, recent);
    return true;
  }

  recent.push(now);
  attempts.set(key, recent);
  return false;
}

function failure(status: number, message: string) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return failure(429, 'Too many requests from this connection. Please try again in a few minutes.');
  }

  const declaredLength = Number(request.headers.get('content-length') ?? '0');
  if (declaredLength > MAX_BODY_BYTES) {
    return failure(413, 'That message is too long. Please shorten the notes and try again.');
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return failure(400, 'We could not read that request. Please try again.');
  }

  // Honeypot: a real visitor never fills a hidden field. Answer as if it
  // worked, but do not send anything.
  const honeypot = (payload as Record<string, unknown> | null)?.website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const result = validatePilotRequest(payload);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.errors[0]!, errors: result.errors },
      { status: 400 },
    );
  }

  const recipient = process.env.CONTACT_TO_EMAIL?.trim();
  if (!recipient) {
    console.error('[contact] CONTACT_TO_EMAIL is not configured - no email was sent.');
    return failure(503, 'Email delivery is not configured yet. Please try again later.');
  }

  const host = process.env.SMTP_HOST?.trim();
  if (!host) {
    console.error('[contact] SMTP_HOST is not configured - no email was sent.');
    return failure(503, 'Email delivery is not configured yet. Please try again later.');
  }

  const port = Number(process.env.SMTP_PORT ?? '587');
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from =
    process.env.MAIL_FROM?.trim() ||
    (user ? `Evmetrik Website <${user}>` : undefined);

  if (!from) {
    console.error('[contact] MAIL_FROM (or SMTP_USER) is not configured - no email was sent.');
    return failure(503, 'Email delivery is not configured yet. Please try again later.');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });

  const { value } = result;

  try {
    await transporter.sendMail({
      from,
      to: recipient, // the single and only recipient
      subject: `Pilot request - ${value.company}`,
      text: formatPilotRequestBody(value),
      html: [
        '<p><strong>New pilot request from the Evmetrik website.</strong></p>',
        '<ul>',
        `<li><strong>Company:</strong> ${escapeHtml(value.company)}</li>`,
        `<li><strong>Contact:</strong> ${escapeHtml(value.contactName)}</li>`,
        `<li><strong>Email:</strong> ${escapeHtml(value.email)}</li>`,
        `<li><strong>Monthly vehicle volume (approx.):</strong> ${escapeHtml(value.fleetSize)}</li>`,
        '</ul>',
        `<p><strong>Notes:</strong><br />${escapeHtml(value.notes || '-').replace(/\n/g, '<br />')}</p>`,
      ].join(''),
    });
  } catch (error) {
    console.error('[contact] Failed to send pilot request email:', error);
    return failure(502, 'We could not send your request just now. Please try again in a moment.');
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
