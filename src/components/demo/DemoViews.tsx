'use client';

import styles from './demo.module.css';

import {
  alertSummary,
  avgEnergyPer100Km,
  avgFuelPer100Km,
  avgSocPct,
  avgSohPct,
  avgUtilisationPct,
  buildSeries,
  DEMO_ALERTS,
  DEMO_VEHICLES,
  DRIVETRAIN_META,
  fleetSummary,
  fmtInt,
  fmtOne,
  fmtPercent,
  openAlertsForVehicle,
  sum,
  totalDistance30d,
  type DemoSeries,
  type Drivetrain,
  type RangeDef,
} from '@/data/demo';
import { BarChart, Donut, SeriesChart, type DonutSegment } from './charts';
import { EVOnlyTag, KpiCard, PanelTitle, SampleNote } from './parts';

const DRIVETRAIN_COLOUR: Record<Drivetrain, string> = {
  electric: '#35d0e6',
  hybrid: '#7ce38b',
  petrol: '#f5c26b',
  diesel: '#9aa9c0',
};

const SEVERITY_COLOUR: Record<string, string> = {
  critical: '#f2795f',
  warning: '#f5c26b',
  info: '#35d0e6',
};

const FLEET = fleetSummary();
const ALERTS = alertSummary();

function drivetrainSegments(): DonutSegment[] {
  const order: Drivetrain[] = ['electric', 'hybrid', 'petrol', 'diesel'];
  return order.map((d) => ({
    label: DRIVETRAIN_META[d].label,
    value: DEMO_VEHICLES.filter((v) => v.drivetrain === d).length,
    colour: DRIVETRAIN_COLOUR[d],
  }));
}

const RANGE_FORMAT = (n: number): string => fmtInt(n);
const DECIMAL_FORMAT = (n: number): string => fmtOne(Number(n));

/* ------------------------------------------------------------------ */

export function FleetView({ range, series }: { range: RangeDef; series: DemoSeries }) {
  return (
    <>
      <div className={styles.kpiGrid}>
        <KpiCard label="Vehicles in sample fleet" value={fmtInt(FLEET.total)} note="Fictional records" trend={series.reporting} />
        <KpiCard label="Reporting now" value={fmtInt(FLEET.reporting)} note={`${FLEET.offline} offline in the sample set`} accent="green" />
        <KpiCard label="Active right now" value={fmtInt(FLEET.active)} note={`${FLEET.idle} idle, ${FLEET.offline} offline`} accent="green" />
        <KpiCard label="Open alerts" value={fmtInt(ALERTS.open)} note={`${ALERTS.openCritical} critical`} accent="amber" />
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.card}>
          <PanelTitle
            title="Vehicles reporting"
            hint={`Reporting vehicles per bucket · ${range.caption.toLowerCase()}`}
          />
          <SeriesChart
            values={series.reporting}
            labels={series.labels}
            ariaLabel="Illustrative count of reporting vehicles over the selected range"
            caption={`Sample fleet reporting counts, ${range.label}, ${range.caption.toLowerCase()}.`}
            format={RANGE_FORMAT}
            accent="green"
          />
        </div>
        <div className={styles.card + " " + styles.cardSquare}>
          <PanelTitle title="Drivetrain mix" hint="Sample fleet composition" />
          <Donut
            segments={drivetrainSegments()}
            centreValue={fmtInt(FLEET.total)}
            centreLabel="vehicles"
            ariaLabel="Illustrative drivetrain composition of the sample fleet"
            caption="Sample fleet split across electric, hybrid, petrol and diesel records."
          />
        </div>
      </div>

      <div className={styles.card}>
        <PanelTitle title="Sample fleet records" hint="Each row is an invented vehicle record" />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visuallyHidden">Illustrative sample vehicle records</caption>
            <thead>
              <tr>
                <th scope="col">Vehicle</th>
                <th scope="col">Drivetrain</th>
                <th scope="col">Status</th>
                <th scope="col" className={styles.num}>30-day distance</th>
                <th scope="col" className={styles.num}>Utilisation</th>
                <th scope="col" className={styles.num}>Open alerts</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_VEHICLES.map((v) => (
                <tr key={v.id}>
                  <th scope="row">
                    <span className={styles.tablePrimary}>{v.label}</span>
                    <span className={styles.tableSecondary}>{v.id}</span>
                  </th>
                  <td>
                    <span className={styles.pill} style={{ ['--pill' as string]: DRIVETRAIN_COLOUR[v.drivetrain] }}>
                      {DRIVETRAIN_META[v.drivetrain].short}
                    </span>
                  </td>
                  <td className={styles.status} data-status={v.status}>{v.status}</td>
                  <td className={styles.num}>{fmtInt(v.distance30dKm)} km</td>
                  <td className={styles.num}>{fmtPercent(v.utilisationPct)}</td>
                  <td className={styles.num}>{fmtInt(openAlertsForVehicle(v.id).length)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SampleNote>
          Fictional vehicle IDs and names. No identifier here corresponds to a real vehicle or customer.
        </SampleNote>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

export function EnergyFuelView({ range, series }: { range: RangeDef; series: DemoSeries }) {
  const energyTotal = sum(series.energyKwh);
  const fuelTotal = sum(series.fuelLitres);

  return (
    <>
      <div className={styles.kpiGrid}>
        <KpiCard
          label="Mean energy use"
          value={`${fmtOne(avgEnergyPer100Km())} kWh`}
          note="per 100 km · plug-in vehicles"
          tag="EV / hybrid"
          accent="cyan"
        />
        <KpiCard
          label="Mean fuel use"
          value={`${fmtOne(avgFuelPer100Km())} L`}
          note="per 100 km · combustion vehicles"
          tag="Petrol / diesel / hybrid"
          accent="amber"
        />
        <KpiCard label={`Energy drawn · ${range.label}`} value={`${fmtOne(energyTotal)} kWh`} note="From the sample plug-in records" tag="EV / hybrid" />
        <KpiCard label={`Fuel used · ${range.label}`} value={`${fmtOne(fuelTotal)} L`} note="From the sample combustion records" accent="amber" />
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.card}>
          <PanelTitle title="Energy drawn across the range" hint="Fleet plug-in energy, derived from sample consumption" />
          <SeriesChart
            values={series.energyKwh}
            labels={series.labels}
            ariaLabel="Illustrative plug-in energy drawn per bucket"
            caption={`Derived sample plug-in energy, ${range.label}.`}
            format={DECIMAL_FORMAT}
            accent="cyan"
            unit={`kWh per bucket · ${range.caption.toLowerCase()}`}
          />
          <div className={styles.tagRow}>
            <EVOnlyTag />
            <span className={styles.hint}>Battery-electric and hybrid records only.</span>
          </div>
        </div>
        <div className={styles.card}>
          <PanelTitle title="Fuel consumed across the range" hint="Fleet fuel, derived from sample consumption" />
          <BarChart
            values={series.fuelLitres}
            labels={series.labels}
            ariaLabel="Illustrative fuel consumed per bucket"
            caption={`Derived sample fuel use, ${range.label}.`}
            format={DECIMAL_FORMAT}
            accent="amber"
          />
          <div className={styles.tagRow}>
            <span className={styles.evTag} title="Applies to vehicles that burn fuel">Petrol / diesel / hybrid</span>
            <span className={styles.hint}>Not applicable to battery-electric records.</span>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <PanelTitle title="Consumption by sample vehicle" hint="Per-vehicle figures from the sample records" />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visuallyHidden">Illustrative consumption by sample vehicle</caption>
            <thead>
              <tr>
                <th scope="col">Vehicle</th>
                <th scope="col">Drivetrain</th>
                <th scope="col" className={styles.num}>Energy</th>
                <th scope="col" className={styles.num}>Fuel</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_VEHICLES.map((v) => (
                <tr key={v.id}>
                  <th scope="row">
                    <span className={styles.tablePrimary}>{v.label}</span>
                    <span className={styles.tableSecondary}>{v.id}</span>
                  </th>
                  <td>{DRIVETRAIN_META[v.drivetrain].label}</td>
                  <td className={styles.num}>{v.energyPer100Km === null ? '—' : `${fmtOne(v.energyPer100Km)} kWh`}</td>
                  <td className={styles.num}>{v.fuelPer100Km === null ? '—' : `${fmtOne(v.fuelPer100Km)} L`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SampleNote>
          A dash means the metric does not apply to that drivetrain: battery-electric vehicles report no fuel,
          and petrol or diesel vehicles report no traction energy.
        </SampleNote>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

export function BatteryView({ range, series }: { range: RangeDef; series: DemoSeries }) {
  const bands = [
    { label: '90–100%', min: 90, max: 100 },
    { label: '80–89%', min: 80, max: 89.99 },
    { label: '70–79%', min: 70, max: 79.99 },
    { label: 'below 70%', min: 0, max: 69.99 },
  ];

  const bandValues = bands.map(
    (b) =>
      DEMO_VEHICLES.filter(
        (v) => v.sohPct !== null && v.sohPct >= b.min && v.sohPct <= b.max,
      ).length,
  );

  const below80 = DEMO_VEHICLES.filter((v) => v.sohPct !== null && v.sohPct < 80).length;

  return (
    <>
      <div className={styles.kpiGrid}>
        <KpiCard label="Mean state of health" value={fmtPercent(avgSohPct())} note="Across sample battery vehicles" tag="EV / hybrid" accent="green" trend={series.sohPct} />
        <KpiCard label="Mean state of charge" value={fmtPercent(avgSocPct())} note="Last reported values" tag="EV / hybrid" accent="cyan" trend={series.socPct} />
        <KpiCard label={`Charge sessions · ${range.label}`} value={fmtInt(sum(series.chargeSessions))} note="Derived from sample plug-in records" tag="EV / hybrid" />
        <KpiCard label="Below 80% SoH" value={fmtInt(below80)} note="Sample records flagged for review" accent="amber" />
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.card}>
          <PanelTitle title="State of health trend" hint={`Mean SoH per bucket · ${range.caption.toLowerCase()}`} />
          <SeriesChart
            values={series.sohPct}
            labels={series.labels}
            ariaLabel="Illustrative battery state of health trend"
            caption={`Derived sample mean state of health, ${range.label}.`}
            format={DECIMAL_FORMAT}
            accent="green"
            baseline="auto"
            unit="% state of health"
          />
          <div className={styles.tagRow}>
            <EVOnlyTag />
            <span className={styles.hint}>Battery metrics do not apply to petrol or diesel vehicles.</span>
          </div>
        </div>
        <div className={styles.card}>
          <PanelTitle title="Charge sessions" hint="Sessions started per bucket" />
          <BarChart
            values={series.chargeSessions}
            labels={series.labels}
            ariaLabel="Illustrative charge sessions per bucket"
            caption={`Derived sample charge sessions, ${range.label}.`}
            format={RANGE_FORMAT}
            accent="cyan"
          />
          <div className={styles.tagRow}>
            <EVOnlyTag />
          </div>
        </div>
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.card}>
          <PanelTitle title="SoH distribution" hint="Sample battery vehicles by health band" />
          <BarChart
            values={bandValues}
            labels={bands.map((b) => b.label)}
            ariaLabel="Illustrative distribution of battery health across sample vehicles"
            caption="Sample battery vehicles grouped by state of health band."
            format={RANGE_FORMAT}
            accent="green"
          />
        </div>
        <div className={styles.card}>
          <PanelTitle title="Battery detail" hint="Per-vehicle sample readings" />
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="visuallyHidden">Illustrative battery readings by sample vehicle</caption>
              <thead>
                <tr>
                  <th scope="col">Vehicle</th>
                  <th scope="col" className={styles.num}>SoC</th>
                  <th scope="col" className={styles.num}>SoH</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_VEHICLES.filter((v) => v.sohPct !== null).map((v) => (
                  <tr key={v.id}>
                    <th scope="row">
                      <span className={styles.tablePrimary}>{v.label}</span>
                      <span className={styles.tableSecondary}>{v.id}</span>
                    </th>
                    <td className={styles.num}>{v.socPct === null ? '—' : `${fmtInt(v.socPct)}%`}</td>
                    <td className={styles.num}>{v.sohPct === null ? '—' : `${fmtInt(v.sohPct)}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SampleNote>
        These are invented readings used to show layout. Evmetrik does not claim validated battery diagnostics,
        remaining-life prediction or a measured degradation rate.
      </SampleNote>
    </>
  );
}

/* ------------------------------------------------------------------ */

export function PerformanceView({ range, series }: { range: RangeDef; series: DemoSeries }) {
  const avgDistance = totalDistance30d() / Math.max(FLEET.total, 1);

  return (
    <>
      <div className={styles.kpiGrid}>
        <KpiCard label={`Distance · ${range.label}`} value={`${fmtInt(sum(series.distanceKm))} km`} note="Sum of sample buckets" trend={series.distanceKm} />
        <KpiCard label="Mean 30-day distance" value={`${fmtInt(avgDistance)} km`} note="Per sample vehicle" />
        <KpiCard label="Mean utilisation" value={fmtPercent(avgUtilisationPct())} note="Share of available time in use" accent="green" />
        <KpiCard label="Idle vehicles" value={fmtInt(FLEET.idle)} note={`${FLEET.offline} further records offline`} accent="amber" />
      </div>

      <div className={styles.card}>
        <PanelTitle title="Distance covered" hint={`Sample fleet distance per bucket · ${range.caption.toLowerCase()}`} />
        <SeriesChart
          values={series.distanceKm}
          labels={series.labels}
          ariaLabel="Illustrative distance covered per bucket"
          caption={`Derived sample fleet distance, ${range.label}.`}
          format={RANGE_FORMAT}
          accent="cyan"
          unit="km per bucket"
        />
      </div>

      <div className={styles.card}>
        <PanelTitle title="Utilisation by vehicle" hint="Share of available time each sample vehicle was in use" />
        <BarChart
          values={DEMO_VEHICLES.map((v) => v.utilisationPct)}
          labels={DEMO_VEHICLES.map((v) => v.id.slice(-3))}
          ariaLabel="Illustrative utilisation percentage for each sample vehicle"
          caption="Sample utilisation percentage by vehicle, keyed by the last three digits of each invented ID."
          format={RANGE_FORMAT}
          accent="green"
          height={240}
        />
        <SampleNote>
          Labels are the last three characters of fictional vehicle IDs, in the order shown in the fleet table.
        </SampleNote>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

export function AlertsView({ range, series }: { range: RangeDef; series: DemoSeries }) {
  const severitySegments: DonutSegment[] = ALERTS.bySeverity
    .filter((s) => s.count > 0)
    .map((s) => ({ label: s.severity, value: s.count, colour: SEVERITY_COLOUR[s.severity] ?? '#35d0e6' }));

  const recent = [...DEMO_ALERTS].sort((a, b) => a.openedDaysAgo - b.openedDaysAgo).slice(0, 8);

  return (
    <>
      <div className={styles.kpiGrid}>
        <KpiCard label="Open alerts" value={fmtInt(ALERTS.open)} note="Unresolved in the sample log" accent="amber" />
        <KpiCard label="Critical" value={fmtInt(ALERTS.openCritical)} note="Open and high severity" accent="amber" />
        <KpiCard label={`Opened · ${range.label}`} value={fmtInt(sum(series.alertsOpened))} note="Derived from the sample alert log" trend={series.alertsOpened} />
        <KpiCard label="Vehicles offline" value={fmtInt(FLEET.offline)} note="No recent sample telemetry" />
      </div>

      <div className={styles.chartGrid}>
        <div className={styles.card + " " + styles.cardSquare}>
          <PanelTitle title="Open alerts by severity" hint="Sample alert log" />
          {severitySegments.length > 0 ? (
            <Donut
              segments={severitySegments}
              centreValue={fmtInt(ALERTS.open)}
              centreLabel="open"
              ariaLabel="Illustrative open alerts grouped by severity"
              caption="Open sample alerts grouped by severity."
            />
          ) : (
            <p className={styles.hint}>No open alerts in the sample log.</p>
          )}
        </div>
        <div className={styles.card}>
          <PanelTitle title="Open alerts by type" hint="Most frequent first" />
          <BarChart
            values={ALERTS.byType.map((t) => t.count)}
            labels={ALERTS.byType.map((t) => t.type)}
            ariaLabel="Illustrative open alerts grouped by type"
            caption="Open sample alerts grouped by fault type."
            format={RANGE_FORMAT}
            accent="amber"
            height={240}
          />
        </div>
      </div>

      <div className={styles.card}>
        <PanelTitle title="Recent sample alerts" hint="Newest first" />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visuallyHidden">Illustrative recent alert records</caption>
            <thead>
              <tr>
                <th scope="col">Alert</th>
                <th scope="col">Vehicle</th>
                <th scope="col">Type</th>
                <th scope="col">Severity</th>
                <th scope="col">State</th>
                <th scope="col" className={styles.num}>Opened</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id}>
                  <th scope="row">{a.id}</th>
                  <td>{a.vehicleId}</td>
                  <td>{a.type}</td>
                  <td>
                    <span className={styles.pill} style={{ ['--pill' as string]: SEVERITY_COLOUR[a.severity] }}>
                      {a.severity}
                    </span>
                  </td>
                  <td>{a.state}</td>
                  <td className={styles.num}>{a.openedDaysAgo} d ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <SampleNote>
          Invented alert records. Nothing here was detected on a real vehicle, and no fault rate should be inferred.
        </SampleNote>
      </div>
    </>
  );
}
