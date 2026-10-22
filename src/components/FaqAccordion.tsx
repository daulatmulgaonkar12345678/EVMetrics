import type { Faq } from '@/data/faqs';
import styles from './FaqAccordion.module.css';

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className={styles.list}>
      {faqs.map((faq) => (
        <details key={faq.q} className={styles.item}>
          <summary className={styles.question}>
            <span>{faq.q}</span>
            <span className={styles.chevron} aria-hidden="true" />
          </summary>
          <div className={styles.answer}>
            <p>{faq.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
