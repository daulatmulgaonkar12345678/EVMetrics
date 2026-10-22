'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '@/data/navigation';
import { Logo } from './Logo';
import { ButtonLink } from './Button';
import styles from './SiteHeader.module.css';

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visuallyHidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={styles.bars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Primary"
        >
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/partner/#contact" size="sm" className={styles.cta}>
            Request a Pilot
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
