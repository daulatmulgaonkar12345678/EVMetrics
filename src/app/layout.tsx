import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - Vehicle analytics for mixed-brand fleets, manufacturers and owners`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'Evmetrik brings available vehicle data from multiple manufacturers into one analytics experience: dashboards for individuals running several supported vehicles, fleet operators monitoring a mixed-brand fleet, and manufacturers analysing authorised field data. Per-organisation workspaces, authorised integrations, battery and charging analytics, running-cost reports and service insights.',
  keywords: [
    'vehicle analytics platform',
    'multi-brand fleet analytics',
    'fleet management dashboard',
    'EV and hybrid vehicle data',
    'battery analytics',
    'authorized telemetry integration',
    'manufacturer field data',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name} - One platform for every supported vehicle`,
    description:
      'Manufacturer-independent dashboards, authorised vehicle-data integrations, battery and charging analytics, running-cost reports and service insights — for owners, fleets and manufacturers.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - One platform for every supported vehicle`,
    description:
      'Available vehicle data from multiple manufacturers, in one analytics experience — for individual owners, mixed-brand fleets and manufacturers.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#060b14',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skipLink" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
