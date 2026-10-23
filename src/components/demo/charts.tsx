'use client';

import styles from './demo.module.css';

import { useId } from 'react';

/**
 * Small, dependency-free SVG charts for the product demo.
 *
 * These render with a fixed viewBox and scale with the container width, so
 * they stay crisp on mobile without any layout JavaScript. Each chart exposes
 * a text alternative: a <title>/<desc> pair for assistive technology plus a
 * visually hidden data table, so the values are readable even when colour and
 * shape are not.
 */

const CYAN = '#35d0e6';
const GREEN = '#7ce38b';
const AMBER = '#f5c26b';
const GRID = 'rgba(148, 180, 214, 0.16)';
const AXIS_TEXT = '#7e93ae';

export type Accent = 'cyan' | 'green' | 'amber';

function accentColour(accent: Accent): string {
  if (accent === 'green') return GREEN;
  if (accent === 'amber') return AMBER;
  return CYAN;
}

function niceTop(values: number[], baseline: 'zero' | 'auto'): { min: number; max: number } {
  if (values.length === 0) return { min: 0, max: 1 };
  const rawMax = Math.max(...values);
  const rawMin = Math.min(...values);

  if (baseline === 'zero') {
    const max = rawMax <= 0 ? 1 : rawMax * 1.15;
    return { min: 0, max };
  }

  const spread = Math.max(rawMax - rawMin, Math.abs(rawMax) * 0.02, 0.5);
  return { min: rawMin - spread * 0.4, max: rawMax + spread * 0.4 };
}

type DataTableProps = {
  labels: string[];
  values: number[];
  caption: string;
  format: (n: number) => string;
};

function DataTable({ labels, values, caption, format }: DataTableProps) {
  return (
    <table className="visuallyHidden">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Period</th>
          <th scope="col">Value</th>
        </tr>
      </thead>
      <tbody>
        {labels.map((label, i) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{format(values[i] ?? 0)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export type SeriesChartProps = {
  values: number[];
  labels: string[];
  ariaLabel: string;
  caption: string;
  format?: (n: number) => string;
  accent?: Accent;
  baseline?: 'zero' | 'auto';
  height?: number;
  unit?: string;
};

/** Single-series area + line chart with a light y-axis. */
export function SeriesChart({
  values,
  labels,
  ariaLabel,
  caption,
  format = (n) => String(Math.round(n)),
  accent = 'cyan',
  baseline = 'zero',
  height = 220,
  unit,
}: SeriesChartProps) {
  const gradientId = useId();
  const width = 640;
  const padL = 46;
  const padR = 14;
  const padT = 14;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const { min, max } = niceTop(values, baseline);
  const span = max - min === 0 ? 1 : max - min;
  const count = values.length;

  const xAt = (i: number): number => (count <= 1 ? padL + innerW / 2 : padL + (i / (count - 1)) * innerW);
  const yAt = (v: number): number => padT + innerH - ((v - min) / span) * innerH;

  const points = values.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`);
  const linePath = points.length === 0 ? '' : `M ${points.join(' L ')}`;
  const areaPath =
    points.length === 0
      ? ''
      : `${linePath} L ${xAt(count - 1).toFixed(1)},${(padT + innerH).toFixed(1)} L ${xAt(0).toFixed(1)},${(padT + innerH).toFixed(1)} Z`;

  const stroke = accentColour(accent);
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  // Show at most 8 x-axis labels so narrow screens stay legible.
  const labelStep = Math.ceil(count / 8);

  return (
    <figure className={styles.chart}>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
      >
        <title>{ariaLabel}</title>
        <desc>{caption}</desc>
        <defs>
          <linearGradient id={`area-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.34" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {gridLines.map((g) => {
          const y = padT + innerH * g;
          const value = max - span * g;
          return (
            <g key={g}>
              <line x1={padL} x2={width - padR} y1={y} y2={y} stroke={GRID} strokeWidth="1" />
              <text
                x={padL - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill={AXIS_TEXT}
                fontFamily="var(--font-mono)"
              >
                {format(value)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={`url(#area-${gradientId})`} />
        <path d={linePath} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {values.map((v, i) => (
          <circle
            key={i}
            cx={xAt(i)}
            cy={yAt(v)}
            r={i === count - 1 ? 4 : 2.4}
            fill={i === count - 1 ? stroke : 'rgba(13, 22, 38, 0.9)'}
            stroke={stroke}
            strokeWidth="1.6"
          />
        ))}

        {labels.map((label, i) =>
          i % labelStep === 0 ? (
            <text
              key={label}
              x={xAt(i)}
              y={height - 8}
              textAnchor="middle"
              fontSize="11"
              fill={AXIS_TEXT}
              fontFamily="var(--font-mono)"
            >
              {label}
            </text>
          ) : null,
        )}
      </svg>
      {unit ? <figcaption className={styles.chartCaption}>{unit}</figcaption> : null}
      <DataTable labels={labels} values={values} caption={caption} format={format} />
    </figure>
  );
}

export type BarChartProps = {
  values: number[];
  labels: string[];
  ariaLabel: string;
  caption: string;
  format?: (n: number) => string;
  accent?: Accent;
  height?: number;
};

/** Vertical bar chart with value labels above each bar. */
export function BarChart({
  values,
  labels,
  ariaLabel,
  caption,
  format = (n) => String(Math.round(n)),
  accent = 'cyan',
  height = 220,
}: BarChartProps) {
  const width = 640;
  const padL = 46;
  const padR = 14;
  const padT = 22;
  const padB = 34;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const { max } = niceTop(values, 'zero');
  const count = Math.max(values.length, 1);
  const slot = innerW / count;
  const barW = Math.min(slot * 0.56, 54);
  const stroke = accentColour(accent);

  return (
    <figure className={styles.chart}>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        preserveAspectRatio="xMidYMid meet"
      >
        <title>{ariaLabel}</title>
        <desc>{caption}</desc>
        <line x1={padL} x2={width - padR} y1={padT + innerH} y2={padT + innerH} stroke={GRID} strokeWidth="1" />
        {values.map((v, i) => {
          const h = max === 0 ? 0 : (v / max) * innerH;
          const x = padL + slot * i + (slot - barW) / 2;
          const y = padT + innerH - h;
          return (
            <g key={labels[i] ?? i}>
              <rect x={x} y={y} width={barW} height={Math.max(h, 1)} rx="4" fill={stroke} opacity="0.85" />
              <text
                x={x + barW / 2}
                y={y - 6}
                textAnchor="middle"
                fontSize="11"
                fill="#a9bdd6"
                fontFamily="var(--font-mono)"
              >
                {format(v)}
              </text>
              <text
                x={x + barW / 2}
                y={height - 12}
                textAnchor="middle"
                fontSize="11"
                fill={AXIS_TEXT}
                fontFamily="var(--font-mono)"
              >
                {labels[i]}
              </text>
            </g>
          );
        })}
      </svg>
      <DataTable labels={labels} values={values} caption={caption} format={format} />
    </figure>
  );
}

export type DonutSegment = { label: string; value: number; colour: string };

/** Donut chart with a centre total. */
export function Donut({
  segments,
  centreValue,
  centreLabel,
  ariaLabel,
  caption,
}: {
  segments: DonutSegment[];
  centreValue: string;
  centreLabel: string;
  ariaLabel: string;
  caption: string;
}) {
  const total = segments.reduce((acc, s) => acc + s.value, 0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <figure className={styles.donut}>
      <svg viewBox="0 0 160 160" role="img" aria-label={ariaLabel} className={styles.donutSvg}>
        <title>{ariaLabel}</title>
        <desc>{caption}</desc>
        <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(148,180,214,0.14)" strokeWidth="18" />
        {segments.map((s) => {
          const fraction = total === 0 ? 0 : s.value / total;
          const dash = fraction * circumference;
          const circle = (
            <circle
              key={s.label}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={s.colour}
              strokeWidth="18"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)"
              strokeLinecap="butt"
            />
          );
          offset += dash;
          return circle;
        })}
        <text x="80" y="76" textAnchor="middle" fontSize="24" fontWeight="700" fill="#eaf1fb">
          {centreValue}
        </text>
        <text x="80" y="96" textAnchor="middle" fontSize="10" fill="#7e93ae" fontFamily="var(--font-mono)">
          {centreLabel}
        </text>
      </svg>
      <ul className={styles.legend}>
        {segments.map((s) => (
          <li key={s.label}>
            <span className={styles.legendSwatch} style={{ background: s.colour }} aria-hidden="true" />
            <span className={styles.legendLabel}>{s.label}</span>
            <span className={styles.legendValue}>{s.value}</span>
          </li>
        ))}
      </ul>
      <table className="visuallyHidden">
        <caption>{caption}</caption>
        <tbody>
          {segments.map((s) => (
            <tr key={s.label}>
              <th scope="row">{s.label}</th>
              <td>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

/** Tiny inline trend used inside KPI cards. Purely decorative. */
export function Sparkline({ values, accent = 'cyan' }: { values: number[]; accent?: Accent }) {
  const width = 120;
  const height = 30;
  const { min, max } = niceTop(values, 'auto');
  const span = max - min === 0 ? 1 : max - min;
  const points = values
    .map((v, i) => {
      const x = (i / Math.max(values.length - 1, 1)) * width;
      const y = height - ((v - min) / span) * height;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={styles.sparkline} aria-hidden="true" focusable="false">
      <polyline
        points={points}
        fill="none"
        stroke={accentColour(accent)}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
