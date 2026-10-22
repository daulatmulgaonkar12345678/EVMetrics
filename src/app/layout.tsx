import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - Shared EV software & analytics platform for manufacturers`,
    template: `%s | ${SITE.name}`,
  },
  description:
    'A shared software and analytics platform for small and emerging electric two-wheeler manufacturers in India: per-brand dashboards, authorized data integrations, battery and charging analytics, running-cost reports and service insights.',
  keywords: [
    'EV analytics platform',
    'electric two-wheeler manufacturer software',
    'battery analytics',
    'telemetry integration',
    'India EV startup',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${SITE.name} - Shared EV software & analytics platform`,
    description:
      'Per-brand dashboards, authorized vehicle-data integrations, battery and charging analytics, running-cost reports and service insights for emerging EV manufacturers.',
    url: SITE.url,
    siteName: SITE.name,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - Shared EV software & analytics platform`,
    description:
      'Shared EV software and analytics for small and emerging electric two-wheeler manufacturers in India.',
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
