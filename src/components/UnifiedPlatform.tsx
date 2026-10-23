import Link from 'next/link';
import { SectionHeading } from './SectionHeading';
import { ButtonLink } from './Button';
import { COMPATIBILITY_NOTE, UNIFIED_STEPS } from '@/data/audiences';
import styles from './UnifiedPlatform.module.css';

const COMPARISON = [
  {
    id: 'individuals',
    label: 'Individual owners',
    headline: 'Multiple supported vehicles, one personal dashboard.',
    body: 'Sign in to your own workspace, see the vehicles linked to your account, and compare how they are used.',
    href: '/demo/',
    link: 'View the product demo',
  },
  {
    id: 'fleets',
    label: 'Fleet operators',
    headline: 'Mixed-brand monitoring and fleet analytics.',
    body: 'One workspace for supported vehicles across depots and manufacturers, with role-based access for your team.',
    href: '/platform/#integrations',
    link: 'See integration options',
  },
  {
    id: 'manufacturers',
    label: 'Manufacturers',
    headline: 'Authorised field-data analysis and vehicle insights.',
    body: 'Analyse the data you authorise against your own models, variants and engineering questions.',
    href: '/partner/#founding-pilot',
    link: 'Explore a pilot',
  },
];

export function UnifiedPlatform({ id = 'unified' }: { id?: string }) {
  return (
    <section className={`section ${styles.wrap}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          id={`${id}-title`}
          eyebrow="Multi-brand by design"
          title="One Platform for Every Supported Vehicle"
          lede="Evmetrik brings available vehicle data from multiple manufacturers into one unified analytics experience. From electric two-wheelers and cars to supported commercial vehicles, individuals and businesses can understand their vehicles through one platform rather than managing every vehicle through a separate analytics interface."
        />

        <ol className={styles.steps} role="list">
          {UNIFIED_STEPS.map((step) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepLabel} aria-hidden="true">
                {step.label}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <p className={styles.compatibility}>
          <strong>What &ldquo;supported&rdquo; means.</strong> {COMPATIBILITY_NOTE}
        </p>

        <div className={styles.compare} role="list" aria-label="How Evmetrik differs by customer type">
          {COMPARISON.map((row) => (
            <article key={row.id} className={styles.compareCard} role="listitem">
              <p className={styles.compareLabel}>{row.label}</p>
              <h3>{row.headline}</h3>
              <p className={styles.compareBody}>{row.body}</p>
              <Link className={styles.compareLink} href={row.href}>
                {row.link}
                <span aria-hidden="true"> →</span>
              </Link>
            </article>
          ))}
        </div>

        <div className={`btnRow ${styles.actions}`}>
          <ButtonLink href="/platform/">Explore the Platform</ButtonLink>
          <ButtonLink href="/demo/" variant="ghost">
            View Product Demo
          </ButtonLink>
          <ButtonLink href="/partner/#contact" variant="ghost">
            Become a Pilot Partner
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
