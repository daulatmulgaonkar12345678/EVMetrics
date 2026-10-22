# Evmetrik — marketing website

Standalone website for **Evmetrik** (`evmetrik.com`): a pre-launch B2B platform concept —
shared EV software and analytics for small and emerging electric two-wheeler manufacturers
in India.

This project is **self-contained**. It shares no code, configuration or dependencies with
any other repository or project on your machine, and it does not touch any existing
EMS / Raspberry Pi work.

- Framework: **Next.js 14 (App Router) + TypeScript**
- Rendering: the three marketing pages are prerendered as static HTML; the contact form
  needs one small Node server route (`/api/contact`) to forward submissions by email
- Styling: **CSS Modules** + a small global design-token stylesheet (no CSS framework)
- Database / auth: **none**
- Deployment: **not performed.** Nothing is deployed and no domain is registered by this
  project. See "Deployment status" below.

---

## 1. Prerequisites

| Requirement | Version used / minimum |
| ----------- | ---------------------- |
| Node.js     | 20.x (18.18+ works)      |
| npm         | 10+ (9+ works)          |

```bash
node -v
npm -v
```

## 2. Install

```bash
cd ev-platform-site
npm install
```

## 3. Environment variables

Copy the template and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
| -------- | -------- | ------- |
| `CONTACT_TO_EMAIL` | yes | **The single recipient** of every pilot-request submission. |
| `SMTP_HOST` | yes | Outgoing mail server host. |
| `SMTP_PORT` | no (default `587`) | SMTP port. Use `465` for implicit TLS. |
| `SMTP_SECURE` | no (default `false`) | Set `true` for TLS-on-connect. |
| `SMTP_USER` | usually | SMTP username. |
| `SMTP_PASS` | usually | SMTP password or app password. |
| `MAIL_FROM` | recommended | Sender address shown on the email. Defaults to `Evmetrik Website <SMTP_USER>`. |

Example `.env.local`:

```bash
CONTACT_TO_EMAIL=pilots@your-mailbox.com
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailbox.com
SMTP_PASS=your-app-password
MAIL_FROM="Evmetrik Website <no-reply@your-mailbox.com>
```

### Why these variables are not `NEXT_PUBLIC_*`

`NEXT_PUBLIC_*` variables are **inlined into the JavaScript bundle that every visitor
downloads**. A `NEXT_PUBLIC_CONTACT_EMAIL` would therefore be readable in the page source
and would publish the mailbox to anyone who opens dev tools. This project keeps every
mail variable server-side, and the address is never sent to the browser or rendered on
any page.

### What the form does with the address

`src/app/api/contact/route.ts` sends the submission to **exactly one** address — the
value of `CONTACT_TO_EMAIL`:

- no `cc`, no `bcc`
- no auto-reply to the visitor (the visitor's address is written into the body only)
- no copy stored anywhere else; no database, no third-party form service
- the response body tells the browser only whether it succeeded

The endpoint also validates every field, applies a per-IP rate limit (5 submissions per
10 minutes), rejects oversized payloads, and uses a hidden honeypot field to filter bots.

## 4. Run locally (development)

```bash
npm run dev
```

Open <http://localhost:3000>. The contact form works in development too — the API route
runs in the dev server, so a valid `.env.local` is all you need.

```bash
npm run dev -- --port 3001     # use a different port
```

## 5. Production build and preview

```bash
npm run build      # builds the app (prerendered pages + /api/contact)
npm run start      # serves the production build on http://localhost:3000
```

`npm run preview` is an alias for `npm run start`.

> This project needs a **Node server** (not a pure static host) because of the contact
> form. Any host that can run `next start` works — a VPS, a container, or a platform
> such as Vercel/Render/Railway/Fly. Static-only hosts (S3 + CloudFront, GitHub Pages)
> cannot run the API route; for those, the form would have to be disabled or pointed at
> a third-party form service.

## 6. Test the contact form without a real mailbox

A tiny SMTP stub is included. It accepts a message and prints the envelope, so you can
confirm that a submission is delivered to **one** recipient only.

```bash
# terminal 1 — fake SMTP server on port 2525
npm run smtp:stub

# terminal 2 — point the app at it
CONTACT_TO_EMAIL=pilots@your-mailbox.com \
SMTP_HOST=127.0.0.1 SMTP_PORT=2525 SMTP_SECURE=false \
SMTP_USER=test SMTP_PASS=test \
MAIL_FROM="Evmetrik Website <no-reply@example.com>" \
npm run dev
```

Submit the form at <http://localhost:3000/partner/#contact>. The stub prints:

```
=== message received ===
MAIL FROM: <no-reply@example.com>
RCPT TO  : <pilots@your-mailbox.com>
recipients: 1
```

## 7. Checks

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
```

## 8. Project layout

```
ev-platform-site/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── .env.example            # template for .env.local
├── scripts/
│   └── smtp-stub.mjs       # local fake SMTP server for form testing
└── src/
    ├── app/
    │   ├── layout.tsx           # metadata, header/footer, brand
    │   ├── globals.css          # design tokens + layout helpers
    │   ├── icon.svg
    │   ├── page.tsx             # Home
    │   ├── platform/page.tsx    # Platform
    │   ├── partner/page.tsx     # Partner With Us
    │   ├── api/contact/route.ts # server-only mail endpoint
    │   ├── not-found.tsx
    │   ├── robots.ts
    │   └── sitemap.ts
    ├── components/          # reusable UI (header, footer, cards, dashboard, FAQ…)
    ├── data/                # typed content: features, process, faqs, sample dashboard
    └── lib/
        ├── site.ts          # brand constants (name, domain, canonical URL)
        └── contact.ts       # shared form shape + validation (no secrets)
```

## 9. Content rules for this site

The site is pre-launch, so it must not claim things that are not true:

- no existing customers, partners or testimonials
- no live vehicle integrations
- no proven savings or performance results
- no validated battery diagnostics — analytics are operational, and every dashboard
  separates measured, derived and estimated values
- all figures in the illustrative dashboard are **fictional sample data**, labelled as
  such on the page and in `src/data/sample-dashboard.ts`

## 10. Deployment status

**Nothing is deployed and no domain has been purchased.** Deployment and domain
registration need explicit approval. When approved, the only thing required is a host
that can run `next start` plus the environment variables from section 3 — set
`SITE.url`-related values in `src/lib/site.ts` if the domain differs.
