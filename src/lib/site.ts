/**
 * Brand configuration for the Evmetrik marketing site.
 *
 * Kept in one place so the name, domain and canonical URL stay consistent
 * across the header, footer, page metadata and structured data.
 *
 * No secret and no contact address lives in this file. The mailbox that
 * receives form submissions is a server-side environment variable and is
 * never imported by client code (see src/app/api/contact/route.ts).
 */
export const SITE = {
  name: 'Evmetrik',
  domain: 'evmetrik.com',
  url: 'https://evmetrik.com',
  tagline:
    'One analytics platform for supported vehicles from multiple manufacturers — owners, fleets and manufacturers',
} as const;
