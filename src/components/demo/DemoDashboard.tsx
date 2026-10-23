'use client';

import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import {
  buildSeries,
  DEFAULT_RANGE,
  DEMO_RANGES,
  DEMO_VEHICLES,
  DRIVETRAIN_META,
  DEMO_DATA_NOTICE,
  fleetSummary,
  fmtInt,
  fmtMinutes,
  fmtOne,
  fmtPercent,
  getRange,
  openAlertsForVehicle,
  type DemoVehicle,
  type RangeId,
} from '@/data/demo';
import { AlertsView, BatteryView, EnergyFuelView, FleetView, PerformanceView } from './DemoViews';
import { EmptyState, PanelTitle } from './parts';
import styles from './demo.module.css';

type TabId = 'fleet' | 'energy' | 'battery' | 'performance' | 'alerts';

const TABS: { id: TabId; label: string }[] = [
  { id: 'fleet', label: 'Fleet Overview' },
  { id: 'energy', label: 'Energy & Fuel' },
  { id: 'battery', label: 'Battery & Charging' },
  { id: 'performance', label: 'Performance' },
  { id: 'alerts', label: 'Alerts & Health' },
];

const PILL_CLASS = {
  electric: styles.pillElectric,
  hybrid: styles.pillHybrid,
  petrol: styles.pillPetrol,
  diesel: styles.pillDiesel,
} as const;

const STATUS_LABEL: Record<DemoVehicle['status'], string> = {
  active: 'Active',
  idle: 'Idle',
  offline: 'Offline',
};

export function DemoDashboard() {
  const [tab, setTab] = useState<TabId>('fleet');
  const [rangeId, setRangeId] = useState<RangeId>(DEFAULT_RANGE);
  const [vehicleId, setVehicleId] = useState<string>(DEMO_VEHICLES[0].id);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const range = useMemo(() => getRange(rangeId), [rangeId]);
  const series = useMemo(() => buildSeries(rangeId), [rangeId]);

  const vehicle = useMemo(
    () => DEMO_VEHICLES.find((v) => v.id === vehicleId) ?? DEMO_VEHICLES[0],
    [vehicleId],
  );

  const drivetrain = DRIVETRAIN_META[vehicle.drivetrain];
  const vehicleAlerts = openAlertsForVehicle(vehicle.id);
  const fleet = fleetSummary();

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = TABS.length - 1;
    let next = index;

    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = last;
    else return;

    event.preventDefault();
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  function renderView() {
    switch (tab) {
      case 'energy':
        return <EnergyFuelView range={range} series={series} />;
      case 'battery':
        return <BatteryView range={range} series={series} />;
      case 'performance':
        return <PerformanceView range={range} series={series} />;
      case 'alerts':
        return <AlertsView range={range} series={series} />;
      case 'fleet':
      default:
        return <FleetView range={range} series={series} />;
    }
  }

  return (
    <div className={styles.shell}>
      <div className={styles.toolbar}>
        <p className={styles.notice}>
          <span className={styles.noticeDot} aria-hidden="true" />
          {DEMO_DATA_NOTICE}
        </p>

        <div className={styles.rangeGroup} role="group" aria-label="Chart time range">
          <span className={styles.rangeLabel}>Range</span>
          {DEMO_RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`${styles.rangeButton} ${r.id === rangeId ? styles.rangeButtonActive : ''}`}
              aria-pressed={r.id === rangeId}
              onClick={() => setRangeId(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tabList} role="tablist" aria-label="Dashboard views">
        {TABS.map((t, i) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`demo-tab-${t.id}`}
              aria-selected={active}
              aria-controls={`demo-panel-${t.id}`}
              tabIndex={active ? 0 : -1}
              className={`${styles.tab} ${active ? styles.tabActive : ''}`}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className={styles.body}>
        <div
          className={styles.main}
          role="tabpanel"
          id={`demo-panel-${tab}`}
          aria-labelledby={`demo-tab-${tab}`}
          tabIndex={0}
        >
          {renderView()}
        </div>

        <aside className={styles.side} aria-label="Sample vehicle detail">
          <div className={styles.sideCard}>
            <div className={styles.selector}>
              <label htmlFor="demo-vehicle" className={styles.selectorLabel}>
                Sample vehicle
              </label>
              <select
                id="demo-vehicle"
                className={styles.select}
                value={vehicle.id}
                onChange={(e) => setVehicleId(e.target.value)}
              >
                {DEMO_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.id} · {v.label}
                  </option>
                ))}
              </select>
              <p className={styles.selectorHint}>
                {fleet.total} fictional records in this demo set. Switching a record changes only what
                this page displays locally.
              </p>
            </div>

            <div className={styles.vehicleHead}>
              <h3 className={styles.vehicleName}>{vehicle.label}</h3>
              <p className={styles.vehicleVariant}>{vehicle.variant}</p>
              <div className={styles.vehicleTags}>
                <span className={`${styles.pill} ${PILL_CLASS[vehicle.drivetrain]}`}>
                  {drivetrain.label}
                </span>
                <span className={styles.status} data-status={vehicle.status}>
                  {STATUS_LABEL[vehicle.status]}
                </span>
              </div>
            </div>

            <dl className={styles.metrics}>
              <div>
                <dt>30-day distance</dt>
                <dd>{fmtInt(vehicle.distance30dKm)} km</dd>
              </div>
              <div>
                <dt>Utilisation</dt>
                <dd>{fmtPercent(vehicle.utilisationPct)}</dd>
              </div>
              <div>
                <dt>Last sample report</dt>
                <dd>{fmtMinutes(vehicle.lastSeenMinutesAgo)} ago</dd>
              </div>
              {vehicle.energyPer100Km !== null ? (
                <div>
                  <dt>
                    Energy use <span className={styles.evTag}>EV / hybrid</span>
                  </dt>
                  <dd>{fmtOne(vehicle.energyPer100Km)} kWh/100 km</dd>
                </div>
              ) : null}
              {vehicle.fuelPer100Km !== null ? (
                <div>
                  <dt>Fuel use</dt>
                  <dd>{fmtOne(vehicle.fuelPer100Km)} L/100 km</dd>
                </div>
              ) : null}
              {vehicle.socPct !== null ? (
                <div>
                  <dt>
                    State of charge <span className={styles.evTag}>EV / hybrid</span>
                  </dt>
                  <dd>{fmtInt(vehicle.socPct)}%</dd>
                </div>
              ) : null}
              {vehicle.sohPct !== null ? (
                <div>
                  <dt>
                    State of health <span className={styles.evTag}>EV / hybrid</span>
                  </dt>
                  <dd>{fmtInt(vehicle.sohPct)}%</dd>
                </div>
              ) : null}
            </dl>

            {!drivetrain.hasBattery ? (
              <EmptyState
                title="No battery metrics for this vehicle"
                body={`Battery state of charge and state of health are only meaningful for electric and hybrid vehicles. This record is ${drivetrain.label.toLowerCase()}, so those readings are not shown.`}
              />
            ) : null}

            <div className={styles.alertsBlock}>
              <PanelTitle title="Open alerts" hint="For this sample record" />
              {vehicleAlerts.length === 0 ? (
                <p className={styles.noAlerts}>No open alerts in the sample log.</p>
              ) : (
                <ul className={styles.alertList}>
                  {vehicleAlerts.slice(0, 3).map((a) => (
                    <li key={a.id}>
                      <span className={styles.alertType}>{a.type}</span>
                      <span className={styles.alertMeta} data-severity={a.severity}>
                        {a.severity} · {a.state}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
