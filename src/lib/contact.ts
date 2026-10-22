/**
 * Shared shape and validation for the pilot-request form.
 *
 * This module is imported by BOTH the browser form and the server route, so
 * it must stay free of environment variables, secrets and server-only APIs.
 * The mailbox that receives submissions is read inside the API route from a
 * server-only environment variable and is never sent to the browser.
 */

export const VOLUME_OPTIONS = [
  'Under 100 units / month',
  '100 - 500 units / month',
  '500 - 2,000 units / month',
  'Over 2,000 units / month',
  'Pre-production / not yet shipping',
] as const;

export type PilotRequest = {
  company: string;
  contactName: string;
  email: string;
  fleetSize: string;
  notes: string;
};

export type ValidationResult =
  | { ok: true; value: PilotRequest }
  | { ok: false; errors: string[] };

const LIMITS = {
  company: 120,
  contactName: 120,
  email: 200,
  fleetSize: 80,
  notes: 4000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanSingleLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

function cleanMultiLine(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n/g, '\n').trim().slice(0, max);
}

/**
 * Validate and normalise an untrusted request payload.
 * Returns field-level messages so the client can show a useful error.
 */
export function validatePilotRequest(input: unknown): ValidationResult {
  const raw = (input ?? {}) as Record<string, unknown>;

  const company = cleanSingleLine(raw.company, LIMITS.company);
  const contactName = cleanSingleLine(raw.contactName, LIMITS.contactName);
  const email = cleanSingleLine(raw.email, LIMITS.email);
  const fleetSize = cleanSingleLine(raw.fleetSize, LIMITS.fleetSize);
  const notes = cleanMultiLine(raw.notes, LIMITS.notes);

  const errors: string[] = [];

  if (!company) errors.push('Company name is required.');
  if (!contactName) errors.push('Your name is required.');
  if (!email) errors.push('Email address is required.');
  else if (!EMAIL_PATTERN.test(email)) errors.push('Enter a valid email address.');
  if (!fleetSize) errors.push('Select an approximate monthly vehicle volume.');

  if (errors.length > 0) return { ok: false, errors };

  return { ok: true, value: { company, contactName, email, fleetSize, notes } };
}

/**
 * Plain-text body for the notification email. The submitter's details are
 * included in the body only — never as a second recipient.
 */
export function formatPilotRequestBody(value: PilotRequest): string {
  return [
    'New pilot request from the Evmetrik website.',
    '',
    `Company: ${value.company}`,
    `Contact: ${value.contactName}`,
    `Email: ${value.email}`,
    `Monthly vehicle volume (approx.): ${value.fleetSize}`,
    '',
    'Notes:',
    value.notes ? value.notes : '-',
  ].join('\n');
}
