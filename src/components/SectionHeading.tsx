import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
};

export function SectionHeading({ eyebrow, title, lede, align = 'left', id }: Props) {
  const cls = [styles.head, align === 'center' ? styles.center : ''].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
      {lede ? <p className="lede">{lede}</p> : null}
    </div>
  );
}
