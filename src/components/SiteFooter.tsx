import Link from 'next/link';
import { NAV_ITEMS } from '@/data/navigation';
import { SITE } from '@/lib/site';
import { Logo } from './Logo';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Logo />
            <p className={styles.blurb}>
              A shared software and analytics platform for emerging electric two-wheeler
              manufacturers in India. Pre-launch product for pilot partners.
            </p>
            <p className={styles.domain}>{SITE.domain}</p>
          </div>

          <nav aria-label="Footer">
            <h3 className={styles.colTitle}>Pages</h3>
            <ul className={styles.list}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={styles.colTitle}>Platform modules</h3>
            <ul className={styles.list}>
              <li>Dashboards</li>
              <li>Data integrations</li>
              <li>Battery &amp; charging</li>
              <li>Running-cost reports</li>
              <li>Service insights</li>
            </ul>
          </div>

          <div>
            <h3 className={styles.colTitle}>Get in touch</h3>
            <ul className={styles.list}>
              <li>
                <Link href="/partner/#contact">Request a pilot</Link>
              </li>
              <li>
                <Link href="/partner/#faq">Read the pilot FAQs</Link>
              </li>
            </ul>
            <p className={styles.contactNote}>
              The pilot request form on this site delivers straight to our team. No email
              address is published here on purpose.
            </p>
          </div>
        </div>

        <div className={styles.legal}>
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className={styles.disclaimer}>
            Pre-launch product. Sample figures shown on this site are illustrative and
            fictional, not measured results. The platform does not provide validated
            battery diagnostics, and no customer, partner or saving is claimed on this
            site.
          </p>
        </div>
      </div>
    </footer>
  );
}
