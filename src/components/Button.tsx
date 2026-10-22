import Link from 'next/link';
import type { ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'ghost';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: 'md' | 'sm';
  className?: string;
};

type LinkProps = CommonProps & { href: string; external?: boolean };
type AnchorProps = CommonProps & { href: string };

export function ButtonLink({ children, href, variant = 'primary', size = 'md', className, external }: LinkProps) {
  const cls = [styles.btn, styles[variant], size === 'sm' ? styles.sm : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  if (external || href.startsWith('mailto:') || href.startsWith('http')) {
    return (
      <a className={cls} href={href} rel={external ? 'noreferrer noopener' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link className={cls} href={href}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({ children, href, variant = 'primary', size = 'md', className }: AnchorProps) {
  const cls = [styles.btn, styles[variant], size === 'sm' ? styles.sm : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  return (
    <a className={cls} href={href}>
      {children}
    </a>
  );
}
