import { ButtonLink } from './Button';
import styles from './Hero.module.css';

const PILLARS = [
  { value: 'Multiple manufacturers', label: 'one workspace for supported vehicles' },
  { value: 'Owners, fleets, OEMs', label: 'separate authorised workspaces' },
  { value: 'Authorized data', label: 'only what you consent to share' },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" />
            Pre-launch vehicle analytics platform — one workspace, many manufacturers
          </p>
          <h1>
            One platform for{' '}
            <span className={styles.grad}>every supported vehicle</span>
          </h1>
          <p className={styles.lede}>
            Evmetrik brings available vehicle data from multiple manufacturers into one analytics
            experience — electric two-wheelers and cars, hybrids, and petrol or diesel vehicles
            where a compatible source exists. Individuals can keep several supported vehicles in
            one place, fleet operators can see a mixed-brand fleet together, and manufacturers can
            analyse the field data they authorise.
          </p>
          <div className="btnRow">
            <ButtonLink href="/platform/">Explore the Platform</ButtonLink>
            <ButtonLink href="/demo/" variant="ghost">
              View Product Demo
            </ButtonLink>
            <ButtonLink href="/partner/#contact" variant="ghost">
              Become a Pilot Partner
            </ButtonLink>
          </div>
          <p className={styles.finePrint}>
            No claim of live integrations, universal manufacturer coverage or proven results:
            Evmetrik is pre-launch and onboarding pilot partners. Every figure shown on this site
            is illustrative sample data.
          </p>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.gauge}>
            <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
              <defs>
                <linearGradient id="gauge" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#35d0e6" />
                  <stop offset="100%" stopColor="#7ce38b" />
                </linearGradient>
              </defs>
              <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="rgba(148,180,214,0.22)" strokeWidth="14" strokeLinecap="round" />
              <path d="M20 110 A80 80 0 0 1 180 110" fill="none" stroke="url(#gauge)" strokeWidth="14" strokeLinecap="round" strokeDasharray="190 260" />
              <circle cx="180" cy="110" r="7" fill="#7ce38b" />
            </svg>
            <div className={styles.gaugeLabel}>
              <span className={styles.gaugeValue}>SOC</span>
              <span className={styles.gaugeText}>82%</span>
            </div>
          </div>
          <ul className={styles.pillars}>
            {PILLARS.map((p) => (
              <li key={p.value} className={styles.pillar}>
                <span className={styles.pillarValue}>{p.value}</span>
                <span className={styles.pillarLabel}>{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
