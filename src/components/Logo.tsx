import { SITE } from '@/lib/site';
import styles from './Logo.module.css';

export function Logo() {
  return (
    <span className={styles.logo}>
      <svg
        className={styles.mark}
        viewBox="0 0 40 40"
        role="img"
        aria-label={`${SITE.name} logo`}
        focusable="false"
      >
        <defs>
          <linearGradient id="ev-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#35d0e6" />
            <stop offset="100%" stopColor="#7ce38b" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#ev-mark)" opacity="0.16" />
        <rect x="2" y="2" width="36" height="36" rx="11" fill="none" stroke="url(#ev-mark)" strokeWidth="1.4" />
        <path
          d="M23.5 8 12 22.5h7L16.5 32 28 17.5h-7L23.5 8Z"
          fill="url(#ev-mark)"
        />
      </svg>
      <span className={styles.wordmark}>
        {SITE.name}
        <span className={styles.sub}>EV Software &amp; Analytics</span>
      </span>
    </span>
  );
}
