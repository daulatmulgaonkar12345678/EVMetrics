import type { Step } from '@/data/process';
import styles from './StepCard.module.css';

export function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <article className={styles.step}>
      <span className={styles.marker} aria-hidden="true">
        {step.duration && !/^\d+$/.test(step.duration) ? step.duration : String(index + 1).padStart(2, '0')}
      </span>
      <h3 className={styles.title}>{step.title}</h3>
      <p className={styles.summary}>{step.summary}</p>
      <p className={styles.detail}>{step.detail}</p>
    </article>
  );
}
