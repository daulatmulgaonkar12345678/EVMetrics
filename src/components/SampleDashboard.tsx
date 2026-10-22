import {
  SAMPLE_CHARGE_SESSIONS,
  SAMPLE_ENERGY_BY_MODEL,
  SAMPLE_EVENTS,
  SAMPLE_KPIS,
  SAMPLE_MODEL_TABLE,
  SAMPLE_SEGMENTS,
} from '@/data/sample-dashboard';
import styles from './SampleDashboard.module.css';

const maxEnergy = Math.max(...SAMPLE_ENERGY_BY_MODEL.map((b) => b.value));
const maxSessions = Math.max(...SAMPLE_CHARGE_SESSIONS.map((b) => b.value));

const STATUS_CLASS: Record<string, string> = {
  'Under review': styles.statusReview,
  'Awaiting data': styles.statusWait,
  'Resolved in sample': styles.statusOk,
};

export function SampleDashboard() {
  return (
    <div className={styles.frame}>
      <div className={styles.ribbon}>
        <span className={styles.ribbonBadge}>Illustrative sample data</span>
        <p>
          Every company, model, batch, metric and number in this mock-up is{' '}
          <strong>fictional</strong>. It is shown to demonstrate layout and metric
          definitions only — it is not a customer result, a measured saving, or a
          validated battery diagnosis.
        </p>
      </div>

      <div className={styles.app}>
        <div className={styles.topbar}>
          <div className={styles.tenant}>
            <span className={styles.tenantLabel}>Workspace</span>
            <span className={styles.tenantValue}>{SAMPLE_SEGMENTS[0].label}</span>
            <span className="badge badge--muted">{SAMPLE_SEGMENTS[0].detail}</span>
          </div>
          <div className={styles.topMeta}>
            <span className="badge">Sample data</span>
            <span className={styles.period}>Sample period: 1–30 Sep (fictional)</span>
          </div>
        </div>

        <div className={styles.kpis}>
          {SAMPLE_KPIS.map((kpi) => (
            <div className={styles.kpi} key={kpi.label}>
              <p className={styles.kpiLabel}>{kpi.label}</p>
              <p className={styles.kpiValue}>{kpi.value}</p>
              <p className={styles.kpiNote}>
                <span
                  className={`${styles.delta} ${
                    kpi.direction === 'up' ? styles.deltaUp : styles.deltaDown
                  }`}
                >
                  {kpi.delta}
                </span>
                <span className={styles.kpiFoot}>{kpi.note}</span>
              </p>
            </div>
          ))}
        </div>

        <div className={styles.charts}>
          <section className={styles.chartCard} aria-label="Sample energy per kilometre by model">
            <header className={styles.chartHead}>
              <h4>Energy per km by model</h4>
              <span className="badge badge--muted">Derived from sample telemetry</span>
            </header>
            <ul className={styles.bars}>
              {SAMPLE_ENERGY_BY_MODEL.map((bar) => (
                <li key={bar.label} className={styles.barRow}>
                  <span className={styles.barLabel}>{bar.label}</span>
                  <span className={styles.barTrack}>
                    <span
                      className={styles.barFill}
                      style={{ width: `${Math.round((bar.value / maxEnergy) * 100)}%` }}
                    />
                  </span>
                  <span className={styles.barValue}>{bar.display} kWh</span>
                </li>
              ))}
            </ul>
            <p className={styles.chartFoot}>
              Illustrative values only. Lower is not claimed to be better for any real
              vehicle; energy per km depends on load, terrain, tyre and ride settings.
            </p>
          </section>

          <section className={styles.chartCard} aria-label="Sample charge sessions per week">
            <header className={styles.chartHead}>
              <h4>Charge sessions per week</h4>
              <span className="badge badge--muted">Sample counts</span>
            </header>
            <div className={styles.columns}>
              {SAMPLE_CHARGE_SESSIONS.map((bar) => (
                <div className={styles.column} key={bar.label}>
                  <span className={styles.columnValue}>{bar.display}</span>
                  <span className={styles.columnTrack}>
                    <span
                      className={styles.columnFill}
                      style={{ height: `${Math.round((bar.value / maxSessions) * 100)}%` }}
                    />
                  </span>
                  <span className={styles.columnLabel}>{bar.label}</span>
                </div>
              ))}
            </div>
            <p className={styles.chartFoot}>
              Sample session counts for layout demonstration. No growth or trend is being
              claimed.
            </p>
          </section>
        </div>

        <section className={styles.tableCard} aria-label="Sample model summary table">
          <header className={styles.chartHead}>
            <h4>Model summary (sample)</h4>
            <span className="badge badge--muted">Fictional</span>
          </header>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="visuallyHidden">
                Sample per-model summary with fictional units, energy per kilometre, charge
                cycles and open events.
              </caption>
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Units (sample)</th>
                  <th scope="col">Energy / km</th>
                  <th scope="col">Charge cycles</th>
                  <th scope="col">Open events</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_MODEL_TABLE.map((row) => (
                  <tr key={row.model}>
                    <th scope="row">{row.model}</th>
                    <td>{row.units}</td>
                    <td>{row.energyPerKm}</td>
                    <td>{row.chargeCycles}</td>
                    <td>{row.openEvents}</td>
                    <td>
                      <span className={row.flag === 'ok' ? styles.statusOk : styles.statusReview}>
                        {row.flag === 'ok' ? 'Sample — no flag' : 'Sample — needs review'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.tableCard} aria-label="Sample service event queue">
          <header className={styles.chartHead}>
            <h4>Service event queue (sample)</h4>
            <span className="badge badge--muted">Fictional entries</span>
          </header>
          <ul className={styles.events}>
            {SAMPLE_EVENTS.map((event) => (
              <li key={event.id} className={styles.event}>
                <span className={styles.eventId}>{event.id}</span>
                <span className={styles.eventBody}>
                  <strong>{event.issue}</strong>
                  <span className={styles.eventMeta}>
                    {event.model} · {event.window} · {event.units} sample units
                  </span>
                </span>
                <span className={`${styles.status} ${STATUS_CLASS[event.status] ?? ''}`}>
                  {event.status}
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.chartFoot}>
            Sample entries are examples of how an engineering review queue could look. They
            are not detected defects, and no fault in a real vehicle is implied.
          </p>
        </section>
      </div>
    </div>
  );
}
