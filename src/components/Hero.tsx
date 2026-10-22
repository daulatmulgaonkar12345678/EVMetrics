import { ButtonLink } from './Button';
import styles from './Hero.module.css';

const PILLARS = [
  { value: 'One shared stack', label: 'for many small manufacturers' },
  { value: 'Per-brand isolation', label: 'your data stays yours' },
  { value: 'Authorized data', label: 'only what you consent to share' },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span className={styles.dot} aria-hidden="true" />
            Pre-launch B2B platform for electric two-wheeler manufacturers
          </p>
          <h1>
            One analytics stack for the{' '}
            <span className={styles.grad}>next wave of EV makers</span>
          </h1>
          <p className={styles.lede}>
            Small and emerging electric two-wheeler manufacturers each end up rebuilding the
            same dashboards, the same data pipelines and the same cost models. Evmetrik is a
            shared platform so you can switch on manufacturer-grade analytics — with your own
            data, your own definitions and your own access rules.
          </p>
          <div className="btnRow">
            <ButtonLink href="/partner/#contact">Request a Pilot</ButtonLink>
            <ButtonLink href="/platform/" variant="ghost">
              Explore the platform
            </ButtonLink>
          </div>
          <p className={styles.finePrint}>
            No claim of existing integrations or proven results: we are onboarding pilot
            partners now, and every figure shown on this site is illustrative sample data.
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
