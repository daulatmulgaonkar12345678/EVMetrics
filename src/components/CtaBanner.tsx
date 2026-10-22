import { ButtonLink } from './Button';
import styles from './CtaBanner.module.css';

type Props = {
  title: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaBanner({
  title,
  body,
  primaryLabel = 'Request a Pilot',
  primaryHref = '/partner/#contact',
  secondaryLabel = 'See the platform',
  secondaryHref = '/platform/',
}: Props) {
  return (
    <section className={styles.wrap} aria-labelledby="cta-title">
      <div className={`container ${styles.inner}`}>
        <div>
          <h2 id="cta-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.body}>{body}</p>
        </div>
        <div className={`btnRow ${styles.actions}`}>
          <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
          <ButtonLink href={secondaryHref} variant="ghost">
            {secondaryLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
