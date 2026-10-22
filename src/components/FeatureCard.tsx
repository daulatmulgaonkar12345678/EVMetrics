import type { Feature } from '@/data/features';
import styles from './FeatureCard.module.css';

const ICON_PATHS: Record<Feature['icon'], string> = {
  dashboard: 'M4 5h16v5H4zM4 13h7v6H4zM14 13h6v6h-6z',
  integration: 'M8 8h8v8H8zM3 11h3v2H3zM18 11h3v2h-3zM11 3h2v3h-2zM11 18h2v3h-2z',
  battery: 'M4 7h12v10H4zM18 10h2v4h-2zM7 10h2v4H7z',
  cost: 'M12 3v18M16 7.5c0-1.7-1.8-2.5-4-2.5s-4 .8-4 2.5S10 10 12 10.5s4 1 4 2.5S14.2 16 12 16s-4-.8-4-2.5',
  service: 'M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',
  access: 'M12 3 4 6v6c0 4.2 3.4 7.6 8 9 4.6-1.4 8-4.8 8-9V6z',
};

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className={`card cardAccent ${styles.card}`}>
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d={ICON_PATHS[feature.icon]} />
        </svg>
      </span>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      <ul className={styles.bullets}>
        {feature.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </article>
  );
}
