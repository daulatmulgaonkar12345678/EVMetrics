'use client';

import { useCallback, useState } from 'react';
import styles from './ProductPreview.module.css';

type ViewId = 'fleet' | 'battery' | 'charging' | 'service';

interface ViewDef {
  id: ViewId;
  title: string;
  explanation: string;
}

const VIEWS: ViewDef[] = [
  {
    id: 'fleet',
    title: 'Fleet Overview',
    explanation:
      'A snapshot of the fleet: how many vehicles are reporting, how usage is spread across models, and where service attention is needed most.',
  },
  {
    id: 'battery',
    title: 'Battery Insights',
    explanation:
      'Battery state of health across the fleet, temperature trends and degradation signals so engineering can spot cells that need attention.',
  },
  {
    id: 'charging',
    title: 'Charging Analytics',
    explanation:
      'When and where vehicles charge, session length and energy delivered — useful for understanding charging behaviour and infrastructure load.',
  },
  {
    id: 'service',
    title: 'Service Insights',
    explanation:
      'Open service alerts, fault types and recurring issues across models, helping service teams prioritise workshop visits and parts.',
  },
];

function KpiCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className={styles.kpiCard}>
      <p className={styles.kpiLabel}>{label}</p>
      <p className={styles.kpiValue}>{value}</p>
      <p className={styles.kpiNote}>{note}</p>
    </div>
  );
}

function LineChart({ points }: { points: { x: number; y: number }[] }) {
  const maxY = Math.max(...points.map((p) => p.y), 1);
  const last = points[points.length - 1];
  return (
    <svg className={styles.chartSvg} viewBox="0 0 100 100" aria-label="Illustrative trend line">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#35d0e6" />
          <stop offset="100%" stopColor="#0f8ba6" />
        </linearGradient>
      </defs>
      <polyline
        points={points.map((p, i) => ((p.x / (points.length - 1)) * 100).toFixed(1) + ',' + (80 - (p.y / maxY) * 60).toFixed(1)).join(' ')}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={((p.x / (points.length - 1)) * 100).toFixed(1)}
          cy={(80 - (p.y / maxY) * 60).toFixed(1)}
          r="3"
          fill={i === points.length - 1 ? '#35d0e6' : 'rgba(53,208,230,0.35)'}
        />
      ))}
      <text x="4" y="14" fontFamily="var(--font-mono)" fontSize="8" fill="#7ce38b">
        {last.y.toFixed(0)}
      </text>
    </svg>
  );
}

function BarChart({ bars }: { bars: { label: string; value: number }[] }) {
  const maxV = Math.max(...bars.map((b) => b.value), 1);
  return (
    <svg className={styles.chartSvg} viewBox="0 0 100 100" aria-label="Illustrative bar chart">
      {bars.map((b, i) => {
        const h = (b.value / maxV) * 62;
        const x = 8 + i * 13;
        return (
          <g key={i}>
            <rect
              x={x.toFixed(1)}
              y={(100 - 8 - h).toFixed(1)}
              width="8"
              height={h.toFixed(1)}
              fill="#35d0e6"
              rx="1.5"
            />
            <text
              x={(x + 4).toFixed(1)}
              y="96"
              fontFamily="var(--font-mono)"
              fontSize="7"
              fill="#7e93ae"
              textAnchor="middle"
            >
              {b.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart({ value, total, label }: { value: number; total: number; label: string }) {
  const pct = value / total;
  const endAngle = pct * 360;
  const rad = endAngle * (Math.PI / 180);
  const x1 = 50 + 38 * Math.cos(-Math.PI / 2);
  const y1 = 50 + 38 * Math.sin(-Math.PI / 2);
  const x2 = 50 + 38 * Math.cos(rad - Math.PI / 2);
  const y2 = 50 + 38 * Math.sin(rad - Math.PI / 2);
  const largeArc = endAngle > 180 ? 1 : 0;
  const d = `M ${x1} ${y1} A 38 38 0 ${largeArc} 1 ${x2} ${y2}`;
  return (
    <svg className={styles.chartSvg} viewBox="0 0 100 100" aria-label={label}>
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(148,180,214,0.18)" strokeWidth="10" />
      <path
        d={d}
        fill="none"
        stroke="url(#donutGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="donutGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7ce38b" />
          <stop offset="100%" stopColor="#35d0e6" />
        </linearGradient>
      </defs>
      <text x="50" y="52" fontFamily="var(--font-sans)" fontSize="16" fontWeight="700" fill="#eaf1fb" textAnchor="middle">
        {value}
      </text>
      <text x="50" y="70" fontFamily="var(--font-mono)" fontSize="9" fill="#a9bdd6" textAnchor="middle">
        {label}
      </text>
    </svg>
  );
}

export function ProductPreview() {
  const [activeId, setActiveId] = useState<ViewId>('fleet');

  const view = VIEWS.find((v) => v.id === activeId)!;

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, next: ViewId) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveId(next);
      }
    },
    []
  );

  return (
    <section className={styles.root} aria-labelledby="preview-title">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.badge}>Illustrative sample data — not live vehicle data</span>
          <h2 id="preview-title" className={styles.previewTitle}>
            Product preview
          </h2>
          <p className={styles.previewLede}>
            Select a view to explore a sample dashboard. Every figure is fictional and shown for
            layout and metric-definition purposes only.
          </p>
        </div>

        <div className={styles.tablistWrapper}>
          <div className={styles.tablist} role="tablist" aria-label="Dashboard views">
            {VIEWS.map((v) => {
              const active = v.id === activeId;
              return (
                <button
                  key={v.id}
                  role="tab"
                  aria-selected={active}
                  aria-controls={`panel-${v.id}`}
                  id={`tab-${v.id}`}
                  className={styles.tab + (active ? ' ' + styles.tabActive : '')}
                  onClick={() => setActiveId(v.id)}
                  onKeyDown={(e) => onKeyDown(e, v.id)}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.panels}>
          {VIEWS.map((v) => {
            const active = v.id === activeId;
            return (
              <div
                key={v.id}
                role="tabpanel"
                aria-labelledby={`tab-${v.id}`}
                id={`panel-${v.id}`}
                hidden={!active}
                className={styles.panel}
              >
                {renderView(v.id)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  function renderView(id: ViewId) {
    switch (id) {
      case 'fleet':
        return (
          <>
            <div className={styles.viewBody}>
              <div className={styles.kpis}>
                <KpiCard label="Total vehicles (sample)" value="1,248" note="Across 4 sample models" />
                <KpiCard label="Active today (sample)" value="986" note="+8% vs last month" />
                <KpiCard label="Avg. daily ride (sample)" value="78 km" note="per active vehicle" />
                <KpiCard label="Open service alerts (sample)" value="12" note="High priority" />
              </div>
              <div className={styles.chartWrap}>
                <div className={styles.chartCard}>
                  <div className={styles.chartHead}>
                    <h4>Active vehicles over time</h4>
                    <span className={styles.chartNote}>Sample data</span>
                  </div>
                  <LineChart points={fleetPoints} />
                  <p className={styles.chartFoot}>
                    Illustrative daily active-vehicle counts. Not measured from live vehicles.
                  </p>
                </div>
                <div className={`${styles.chartCard} ${styles.chartCardSquare}`}>
                  <div className={styles.chartHead}>
                    <h4>Vehicle status (sample)</h4>
                    <span className={styles.chartNote}>Share of fleet</span>
                  </div>
                  <DonutChart value={986} total={1248} label="Active" />
                  <p className={styles.chartFoot}>
                    Sample status split: active, idle and offline. Fictional values.
                  </p>
                </div>
              </div>
            </div>
            <p className={styles.viewNote}>{view.explanation}</p>
          </>
        );
      case 'battery':
        return (
          <>
            <div className={styles.viewBody}>
              <div className={styles.kpis}>
                <KpiCard label="Avg. battery health (SoH)" value="92%" note="Fleet average" />
                <KpiCard label="Below 80% SoH (sample)" value="14" note="Vehicles flagged" />
                <KpiCard label="Avg. pack temperature" value="28 °C" note="Normal band" />
                <KpiCard label="Fast-charge share (sample)" value="22%" note="Of all sessions" />
              </div>
              <div className={styles.chartWrap}>
                <div className={styles.chartCard}>
                  <div className={styles.chartHead}>
                    <h4>Battery health trend</h4>
                    <span className={styles.chartNote}>State of health, %</span>
                  </div>
                  <LineChart points={batteryPoints} />
                  <p className={styles.chartFoot}>
                    Illustrative SoH trend across the sample fleet. Not a validated diagnosis.
                  </p>
                </div>
                <div className={`${styles.chartCard} ${styles.chartCardSquare}`}>
                  <div className={styles.chartHead}>
                    <h4>SoH distribution (sample)</h4>
                    <span className={styles.chartNote}>Vehicles per band</span>
                  </div>
                  <BarChart bars={sohBars} />
                  <p className={styles.chartFoot}>
                    Sample distribution across health bands. Fictional counts.
                  </p>
                </div>
              </div>
            </div>
            <p className={styles.viewNote}>{view.explanation}</p>
          </>
        );
      case 'charging':
        return (
          <>
            <div className={styles.viewBody}>
              <div className={styles.kpis}>
                <KpiCard label="Total sessions (sample)" value="1,248" note="Last 30 days" />
                <KpiCard label="Energy delivered (sample)" value="18,540 kWh" note="Across fleet" />
                <KpiCard label="Avg. dwell time (sample)" value="2 h 16 m" note="Per session" />
                <KpiCard label="Home-charge share (sample)" value="61%" note="Of sessions" />
              </div>
              <div className={styles.chartWrap}>
                <div className={styles.chartCard}>
                  <div className={styles.chartHead}>
                    <h4>Charging sessions per day</h4>
                    <span className={styles.chartNote}>Sample counts</span>
                  </div>
                  <BarChart bars={chargeBars} />
                  <p className={styles.chartFoot}>
                    Illustrative sessions per day of the week. Not live charger data.
                  </p>
                </div>
                <div className={`${styles.chartCard} ${styles.chartCardSquare}`}>
                  <div className={styles.chartHead}>
                    <h4>Energy consumed</h4>
                    <span className={styles.chartNote}>kWh per 100 km</span>
                  </div>
                  <LineChart points={energyPoints} />
                  <p className={styles.chartFoot}>
                    Sample energy-efficiency trend. Varies by load, terrain and ride settings.
                  </p>
                </div>
              </div>
            </div>
            <p className={styles.viewNote}>{view.explanation}</p>
          </>
        );
      case 'service':
        return (
          <>
            <div className={styles.viewBody}>
              <div className={styles.kpis}>
                <KpiCard label="Open alerts (sample)" value="27" note="Across fleet" />
                <KpiCard label="High-temperature events (sample)" value="8" note="Last 30 days" />
                <KpiCard label="Communication errors (sample)" value="5" note="Vehicles affected" />
                <KpiCard label="Low state of charge (sample)" value="14" note="Vehicles flagged" />
              </div>
              <div className={styles.chartWrap}>
                <div className={styles.chartCard}>
                  <div className={styles.chartHead}>
                    <h4>Service alerts by type (sample)</h4>
                    <span className={styles.chartNote}>Open issues</span>
                  </div>
                  <BarChart bars={serviceBars} />
                  <p className={styles.chartFoot}>
                    Illustrative alert categories. Not detected defects in real vehicles.
                  </p>
                </div>
                <div className={`${styles.chartCard} ${styles.chartCardSquare}`}>
                  <div className={styles.chartHead}>
                    <h4>Alert severity (sample)</h4>
                    <span className={styles.chartNote}>Share of open alerts</span>
                  </div>
                  <DonutChart value={8} total={27} label="High" />
                  <p className={styles.chartFoot}>
                    Sample severity split. Fictional values for layout only.
                  </p>
                </div>
              </div>
            </div>
            <p className={styles.viewNote}>{view.explanation}</p>
          </>
        );
    }
  }
}

const fleetPoints = [
  { x: 0, y: 1080 }, { x: 1, y: 1110 }, { x: 2, y: 1145 }, { x: 3, y: 1190 },
  { x: 4, y: 1220 }, { x: 5, y: 1248 },
];
const batteryPoints = [
  { x: 0, y: 94 }, { x: 1, y: 93 }, { x: 2, y: 92 }, { x: 3, y: 91 },
  { x: 4, y: 92 }, { x: 5, y: 92 },
];
const energyPoints = [
  { x: 0, y: 2.7 }, { x: 1, y: 2.8 }, { x: 2, y: 2.9 }, { x: 3, y: 3.0 },
  { x: 4, y: 2.9 }, { x: 5, y: 2.8 },
];
const chargeBars = [
  { label: 'Mon', value: 145 }, { label: 'Tue', value: 162 }, { label: 'Wed', value: 158 },
  { label: 'Thu', value: 171 }, { label: 'Fri', value: 183 }, { label: 'Sat', value: 134 },
  { label: 'Sun', value: 118 },
];
const sohBars = [
  { label: '90–100%', value: 712 }, { label: '80–89%', value: 386 }, { label: '70–79%', value: 104 },
  { label: '60–69%', value: 34 }, { label: '< 60%', value: 12 },
];
const serviceBars = [
  { label: 'High temp', value: 8 }, { label: 'Comms error', value: 5 },
  { label: 'Low SoC', value: 14 }, { label: 'Cell imbalance', value: 6 },
  { label: 'Charger fault', value: 4 },
];
