import { SectionHeading } from './SectionHeading';
import { ButtonLink } from './Button';
import { AUDIENCE_VALUES, type AudienceId, type AudienceValue } from '@/data/audiences';
import styles from './AudienceSection.module.css';

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  /** Which audiences to show. Defaults to all three. */
  only?: AudienceId[];
  /** Render the per-card link through to the relevant page. */
  showLinks?: boolean;
  className?: string;
};

export function AudienceSection({
  id,
  eyebrow,
  title,
  lede,
  only,
  showLinks = true,
  className,
}: Props) {
  const items: AudienceValue[] = only
    ? AUDIENCE_VALUES.filter((item) => only.includes(item.id))
    : AUDIENCE_VALUES;

  return (
    <section className={`section ${className ?? ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} lede={lede} />

        <div className={styles.grid} data-count={items.length}>
          {items.map((item) => (
            <article key={item.id} className={styles.card} data-audience={item.id}>
              <p className={styles.tag}>{item.tag}</p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.summary}>{item.summary}</p>

              <ul className={styles.benefits}>
                {item.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>

              <p className={styles.note}>{item.note}</p>

              {showLinks ? (
                <p className={styles.linkRow}>
                  <ButtonLink href={item.href} variant="ghost" size="sm">
                    {item.ctaLabel}
                  </ButtonLink>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
