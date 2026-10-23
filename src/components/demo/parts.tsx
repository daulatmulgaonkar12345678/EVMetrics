'use client';

import styles from './demo.module.css';

import { Sparkline, type Accent } from './charts';

export function KpiCard({
  label,
  value,
  note,
  trend,
  accent = 'cyan',
  tag,
}: {
  label: string;
  value: string;
  note: string;
  trend?: number[];
  accent?: Accent;
  tag?: string;
}) {
  return (
    <div className={styles.kpi}>
      <div className={styles.kpiHead}>
        <p className={styles.kpiLabel}>{label}</p>
        {tag ? <span className={styles.kpiTag}>{tag}</span> : null}
      </div>
      <p className={styles.kpiValue}>{value}</p>
      {trend ? <Sparkline values={trend} accent={accent} /> : null}
      <p className={styles.kpiNote}>{note}</p>
    </div>
  );
}

/** A short, repeated statement that a figure is synthetic. */
export function SampleNote({ children }: { children: React.ReactNode }) {
  return <p className={styles.sampleNote}>{children}</p>;
}

/** Label that marks a metric as applicable to battery vehicles only. */
export function EVOnlyTag() {
  return (
    <span className={styles.evTag} title="Applies to electric and hybrid vehicles only">
      EV / hybrid only
    </span>
  );
}

export function PanelTitle({ title, hint }: { title: string; hint: string }) {
  return (
    <div className={styles.panelTitle}>
      <h3>{title}</h3>
      <p>{hint}</p>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.empty} role="status">
      <p className={styles.emptyTitle}>{title}</p>
      <p className={styles.emptyBody}>{body}</p>
    </div>
  );
}
