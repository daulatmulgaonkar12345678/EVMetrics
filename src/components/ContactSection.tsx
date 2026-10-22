'use client';

import { useState } from 'react';
import { VOLUME_OPTIONS, type PilotRequest } from '@/lib/contact';
import styles from './ContactSection.module.css';

const EMPTY: PilotRequest = {
  company: '',
  contactName: '',
  email: '',
  fleetSize: VOLUME_OPTIONS[0],
  notes: '',
};

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export function ContactSection() {
  const [form, setForm] = useState<PilotRequest>(EMPTY);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [honeypot, setHoneypot] = useState('');

  function update<K extends keyof PilotRequest>(key: K, value: PilotRequest[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status.kind !== 'idle') setStatus({ kind: 'idle' });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: 'sending' });

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot }),
      });

      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !data?.ok) {
        setStatus({
          kind: 'error',
          message:
            data?.message ??
            'We could not send your request just now. Please try again in a moment.',
        });
        return;
      }

      setForm(EMPTY);
      setHoneypot('');
      setStatus({ kind: 'success' });
    } catch {
      setStatus({
        kind: 'error',
        message: 'We could not reach the server. Please check your connection and try again.',
      });
    }
  }

  const sending = status.kind === 'sending';

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.intro}>
          <p className="eyebrow">Request a pilot</p>
          <h2 id="contact-title">Talk to the founding team</h2>
          <p className={styles.lede}>
            Tell us a little about your vehicle line and what you would want to see first.
            We reply from a single shared mailbox to the address you enter below, so please
            use an address you can read replies from.
          </p>

          <ul className={styles.points}>
            <li>Scoping call of about 45 minutes.</li>
            <li>Written scope and data-sharing terms before any connection.</li>
            <li>No commitment beyond the agreed pilot; you can stop and take your data.</li>
          </ul>

          <div className={styles.direct}>
            <p className={styles.directLabel}>What happens next</p>
            <ol className={styles.nextList}>
              <li>Your request reaches our pilot team directly.</li>
              <li>We reply to the email address you provide here.</li>
              <li>If it looks like a fit, we book a 45-minute scoping call.</li>
            </ol>
            <p className={styles.formNote}>
              The form posts to this website&rsquo;s own server, which forwards the details to
              our pilot mailbox. Nothing else is stored, and the mailbox address is never
              displayed on this site.
            </p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="company">Company name</label>
            <input
              id="company"
              name="company"
              type="text"
              required
              maxLength={120}
              autoComplete="organization"
              value={form.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="Your manufacturing company"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="contactName">Your name</label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                required
                maxLength={120}
                autoComplete="name"
                value={form.contactName}
                onChange={(e) => update('contactName', e.target.value)}
                placeholder="Full name"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Work email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="Your work email address"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="fleetSize">Monthly vehicle volume (approx.)</label>
            <select
              id="fleetSize"
              name="fleetSize"
              required
              value={form.fleetSize}
              onChange={(e) => update('fleetSize', e.target.value)}
            >
              {VOLUME_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="notes">
              What would you want to see first? <span className={styles.optional}>(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={5}
              maxLength={4000}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Models, telemetry you already have, reports you run today, anything that matters to you."
            />
          </div>

          {/* Honeypot — hidden from users, catches naive form bots. */}
          <div className={styles.hp} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <button className={styles.submit} type="submit" disabled={sending}>
            {sending ? 'Sending…' : 'Request a pilot'}
          </button>

          <div className={styles.status} role="status" aria-live="polite">
            {status.kind === 'success' ? (
              <p className={styles.statusOk}>
                Thank you — your request has been received. We will reply to the email address
                you provided, usually within two working days.
              </p>
            ) : null}
            {status.kind === 'error' ? (
              <p className={styles.statusError}>
                {status.message}{' '}
                <button type="button" className={styles.retry} onClick={() => setStatus({ kind: 'idle' })}>
                  Try again
                </button>
              </p>
            ) : null}
          </div>

          <p className={styles.legal}>
            By sending this form you agree to be contacted about a pilot. We do not sell or
            share your details.
          </p>
        </form>
      </div>
    </section>
  );
}
