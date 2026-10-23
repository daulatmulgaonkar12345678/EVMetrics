/**
 * ILLUSTRATIVE SAMPLE DATA - FICTIONAL.
 *
 * Every value in this file is invented for layout and storytelling purposes.
 * No number here is measured, audited, or taken from a real vehicle, a real
 * fleet, a real pilot or a real customer. Vehicle IDs, model names and
 * variants are fictional. Nothing on the Product Demo page should be read as
 * a performance claim, a customer result, a proven saving or a validated
 * battery diagnostic.
 *
 * DESIGN RULE: this file holds the FEWEST possible stored numbers. Totals,
 * averages, alert counts and every time series are DERIVED from the records
 * below by the exported helper functions, so a headline figure can never
 * contradict the chart or table sitting next to it.
 */

/* ------------------------------------------------------------------ *
 * Drivetrains
 * ------------------------------------------------------------------ */

export type Drivetrain = 'electric' | 'hybrid' | 'petrol' | 'diesel';

export type VehicleStatus = 'active' | 'idle' | 'offline';

export type DrivetrainMeta = {
  label: string;
  short: string;
  /** True when the vehicle has a traction battery worth reporting on. */
  hasBattery: boolean;
  /** True when energy is drawn from a plug. */
  isPlugIn: boolean;
  /** Drivetrain-specific consumption metric, or null when not applicable. */
  consumptionLabel: string | null;
  consumptionUnit: string | null;
};

export const DRIVETRAIN_META: Record<Drivetrain, DrivetrainMeta> = {
  electric: {
    label: 'Electric',
    short: 'EV',
    hasBattery: true,
    isPlugIn: true,
    consumptionLabel: 'Energy consumption',
    consumptionUnit: 'kWh/100 km',
  },
  hybrid: {
    label: 'Hybrid',
    short: 'HEV',
    hasBattery: true,
    isPlugIn: true,
    consumptionLabel: 'Energy consumption (electric share)',
    consumptionUnit: 'kWh/100 km',
  },
  petrol: {
    label: 'Petrol',
    short: 'PET',
    hasBattery: false,
    isPlugIn: false,
    consumptionLabel: 'Fuel consumption',
    consumptionUnit: 'L/100 km',
  },
  diesel: {
    label: 'Diesel',
    short: 'DSL',
    hasBattery: false,
    isPlugIn: false,
    consumptionLabel: 'Fuel consumption',
    consumptionUnit: 'L/100 km',
  },
};

export const DEMO_DATA_NOTICE =
  'Illustrative sample data — fictional records, not live vehicles.';

/* ------------------------------------------------------------------ *
 * Individual sample vehicles (the source of every derived figure)
 * ------------------------------------------------------------------ */

export type DemoVehicle = {
  id: string;
  label: string;
  variant: string;
  drivetrain: Drivetrain;
  status: VehicleStatus;
  /** Distance covered in the trailing 30 days, km. */
  distance30dKm: number;
  /** Electric-only metric. Null for petrol and diesel. */
  energyPer100Km: number | null;
  /** Fuel metric. Null for battery-electric vehicles. */
  fuelPer100Km: number | null;
  /** Electric-only metric. Null for petrol and diesel. */
  socPct: number | null;
  /** Electric-only metric. Null for petrol and diesel. */
  sohPct: number | null;
  utilisationPct: number;
  lastSeenMinutesAgo: number;
};

export const DEMO_VEHICLES: DemoVehicle[] = [
  { id: 'SIM-EV-001', label: 'Simurgh E1', variant: 'E1 · 2.4 kWh', drivetrain: 'electric', status: 'active',  distance30dKm: 1284, energyPer100Km: 2.6, fuelPer100Km: null, socPct: 72, sohPct: 96, utilisationPct: 61, lastSeenMinutesAgo: 2 },
  { id: 'SIM-EV-002', label: 'Simurgh E1', variant: 'E1 · 2.4 kWh', drivetrain: 'electric', status: 'active',  distance30dKm: 1102, energyPer100Km: 2.7, fuelPer100Km: null, socPct: 64, sohPct: 95, utilisationPct: 58, lastSeenMinutesAgo: 6 },
  { id: 'SIM-EV-003', label: 'Simurgh E1', variant: 'E1 · 2.4 kWh', drivetrain: 'electric', status: 'idle',    distance30dKm:  612, energyPer100Km: 3.1, fuelPer100Km: null, socPct: 41, sohPct: 94, utilisationPct: 34, lastSeenMinutesAgo: 74 },
  { id: 'SIM-EV-014', label: 'Simurgh E2', variant: 'E2 · 3.0 kWh', drivetrain: 'electric', status: 'active',  distance30dKm: 1460, energyPer100Km: 3.0, fuelPer100Km: null, socPct: 78, sohPct: 93, utilisationPct: 68, lastSeenMinutesAgo: 1 },
  { id: 'SIM-EV-015', label: 'Simurgh E2', variant: 'E2 · 3.0 kWh', drivetrain: 'electric', status: 'active',  distance30dKm:  988, energyPer100Km: 3.2, fuelPer100Km: null, socPct: 55, sohPct: 92, utilisationPct: 52, lastSeenMinutesAgo: 11 },
  { id: 'SIM-EV-016', label: 'Simurgh E2', variant: 'E2 · 3.0 kWh', drivetrain: 'electric', status: 'offline', distance30dKm:  210, energyPer100Km: 3.4, fuelPer100Km: null, socPct: 22, sohPct: 91, utilisationPct: 18, lastSeenMinutesAgo: 2160 },
  { id: 'SIM-HY-101', label: 'Halcyon H1', variant: 'H1 · series hybrid', drivetrain: 'hybrid', status: 'active', distance30dKm: 1320, energyPer100Km: 2.2, fuelPer100Km: 3.1, socPct: 58, sohPct: 97, utilisationPct: 66, lastSeenMinutesAgo: 4 },
  { id: 'SIM-HY-102', label: 'Halcyon H1', variant: 'H1 · series hybrid', drivetrain: 'hybrid', status: 'idle',   distance30dKm:  705, energyPer100Km: 2.4, fuelPer100Km: 3.4, socPct: 36, sohPct: 96, utilisationPct: 39, lastSeenMinutesAgo: 96 },
  { id: 'SIM-PT-201', label: 'Corvus P1', variant: 'P1 · 125 cc', drivetrain: 'petrol', status: 'active', distance30dKm: 1175, energyPer100Km: null, fuelPer100Km: 3.6, socPct: null, sohPct: null, utilisationPct: 57, lastSeenMinutesAgo: 8 },
  { id: 'SIM-PT-202', label: 'Corvus P1', variant: 'P1 · 125 cc', drivetrain: 'petrol', status: 'idle',   distance30dKm:  540, energyPer100Km: null, fuelPer100Km: 3.9, socPct: null, sohPct: null, utilisationPct: 31, lastSeenMinutesAgo: 142 },
  { id: 'SIM-DS-301', label: 'Corvus D1', variant: 'D1 · 250 cc', drivetrain: 'diesel', status: 'active', distance30dKm: 1540, energyPer100Km: null, fuelPer100Km: 3.2, socPct: null, sohPct: null, utilisationPct: 71, lastSeenMinutesAgo: 3 },
  { id: 'SIM-DS-302', label: 'Corvus D1', variant: 'D1 · 250 cc', drivetrain: 'diesel', status: 'offline', distance30dKm: 260, energyPer100Km: null, fuelPer100Km: 3.5, socPct: null, sohPct: null, utilisationPct: 20, lastSeenMinutesAgo: 4320 },
];

/* ------------------------------------------------------------------ *
 * Alert records (severity and type counts are derived from these)
 * ------------------------------------------------------------------ */

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertState = 'open' | 'acknowledged' | 'closed';

export type DemoAlert = {
  id: string;
  vehicleId: string;
  type: string;
  severity: AlertSeverity;
  state: AlertState;
  openedDaysAgo: number;
};

export const DEMO_ALERTS: DemoAlert[] = [
  { id: 'SIM-AL-01', vehicleId: 'SIM-EV-001', type: 'Battery temperature', severity: 'warning',  state: 'open',         openedDaysAgo: 2 },
  { id: 'SIM-AL-02', vehicleId: 'SIM-EV-001', type: 'Cell imbalance',      severity: 'info',     state: 'acknowledged', openedDaysAgo: 9 },
  { id: 'SIM-AL-03', vehicleId: 'SIM-EV-002', type: 'Low state of charge', severity: 'info',     state: 'open',         openedDaysAgo: 1 },
  { id: 'SIM-AL-04', vehicleId: 'SIM-EV-003', type: 'Charge fault',        severity: 'critical', state: 'open',         openedDaysAgo: 3 },
  { id: 'SIM-AL-05', vehicleId: 'SIM-EV-014', type: 'Battery temperature', severity: 'warning',  state: 'open',         openedDaysAgo: 4 },
  { id: 'SIM-AL-06', vehicleId: 'SIM-EV-015', type: 'Cell imbalance',      severity: 'warning',  state: 'open',         openedDaysAgo: 6 },
  { id: 'SIM-AL-07', vehicleId: 'SIM-EV-016', type: 'Telemetry offline',   severity: 'critical', state: 'open',         openedDaysAgo: 1 },
  { id: 'SIM-AL-08', vehicleId: 'SIM-HY-101', type: 'Charge fault',        severity: 'warning',  state: 'acknowledged', openedDaysAgo: 5 },
  { id: 'SIM-AL-09', vehicleId: 'SIM-HY-102', type: 'Low state of charge', severity: 'info',     state: 'closed',       openedDaysAgo: 12 },
  { id: 'SIM-AL-10', vehicleId: 'SIM-PT-201', type: 'Service due',         severity: 'info',     state: 'open',         openedDaysAgo: 7 },
  { id: 'SIM-AL-11', vehicleId: 'SIM-PT-202', type: 'Brake wear',          severity: 'warning',  state: 'open',         openedDaysAgo: 8 },
  { id: 'SIM-AL-12', vehicleId: 'SIM-DS-301', type: 'Service due',         severity: 'info',     state: 'acknowledged', openedDaysAgo: 10 },
  { id: 'SIM-AL-13', vehicleId: 'SIM-DS-302', type: 'Telemetry offline',   severity: 'critical', state: 'open',         openedDaysAgo: 2 },
  { id: 'SIM-AL-14', vehicleId: 'SIM-DS-302', type: 'Brake wear',          severity: 'warning',  state: 'open',         openedDaysAgo: 11 },
  { id: 'SIM-AL-15', vehicleId: 'SIM-EV-003', type: 'Low state of charge', severity: 'info',     state: 'closed',       openedDaysAgo: 15 },
  { id: 'SIM-AL-16', vehicleId: 'SIM-EV-014', type: 'Charge fault',        severity: 'info',     state: 'closed',       openedDaysAgo: 18 },
];

/* ------------------------------------------------------------------ *
 * Time ranges
 *
 * Each range stores only LABELS, a fixed set of bucket WEIGHTS that sum to
 * 1, an activity shape and small drift vectors. The actual values are
 * computed by buildSeries() from the vehicle records above, so a range
 * switch re-renders the same underlying fleet rather than a different story.
 * ------------------------------------------------------------------ */

export type RangeId = '7d' | '30d' | '90d';

export type RangeDef = {
  id: RangeId;
  label: string;
  caption: string;
  days: number;
  labels: string[];
  /** Distribution of volume across buckets. Must sum to 1. */
  weights: number[];
  /** Reporting-vehicle shape, centred on 1. */
  activityShape: number[];
  sohDrift: number[];
  socDrift: number[];
};

export const DEMO_RANGES: RangeDef[] = [
  {
    id: '7d',
    label: '7 days',
    caption: 'Daily buckets',
    days: 7,
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    weights: [0.155, 0.15, 0.145, 0.15, 0.16, 0.135, 0.105],
    activityShape: [0.98, 1, 0.95, 1, 1.02, 0.93, 0.86],
    sohDrift: [0.2, 0.2, 0.1, 0, -0.1, -0.2, -0.3],
    socDrift: [3, -1, 2, 4, 0, 1, -2],
  },
  {
    id: '30d',
    label: '30 days',
    caption: '3-day buckets',
    days: 30,
    labels: ['D1–3', 'D4–6', 'D7–9', 'D10–12', 'D13–15', 'D16–18', 'D19–21', 'D22–24', 'D25–27', 'D28–30'],
    weights: [0.093, 0.098, 0.101, 0.095, 0.104, 0.102, 0.099, 0.103, 0.105, 0.1],
    activityShape: [0.96, 0.98, 1, 0.97, 1, 1.01, 0.99, 1.02, 1, 0.97],
    sohDrift: [0.4, 0.3, 0.2, 0.1, 0, -0.1, -0.2, -0.3, -0.4, -0.5],
    socDrift: [2, 3, 1, 0, -1, -2, -1, 0, 1, 2],
  },
  {
    id: '90d',
    label: '90 days',
    caption: 'Weekly buckets',
    days: 90,
    labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
    weights: [0.072, 0.078, 0.081, 0.079, 0.084, 0.086, 0.082, 0.088, 0.085, 0.087, 0.089, 0.089],
    activityShape: [0.92, 0.95, 0.98, 1, 1.01, 1.02, 1, 1.03, 1.01, 0.99, 0.97, 0.95],
    sohDrift: [0.8, 0.7, 0.6, 0.5, 0.3, 0.2, 0.1, 0, -0.2, -0.3, -0.5, -0.7],
    socDrift: [1, 2, 3, 2, 1, 0, -1, -2, -2, -1, 0, 1],
  },
];

export const DEFAULT_RANGE: RangeId = '30d';

export function getRange(id: RangeId): RangeDef {
  const found = DEMO_RANGES.find((r) => r.id === id);
  return found ?? DEMO_RANGES[1];
}

/* ------------------------------------------------------------------ *
 * Small numeric helpers
 * ------------------------------------------------------------------ */

export function sum(values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}

export function mean(values: number[]): number {
  return values.length === 0 ? 0 : sum(values) / values.length;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/* ------------------------------------------------------------------ *
 * Fleet derivation
 * ------------------------------------------------------------------ */

export const PLUG_IN_VEHICLES = DEMO_VEHICLES.filter(
  (v) => DRIVETRAIN_META[v.drivetrain].isPlugIn,
);
export const COMBUSTION_VEHICLES = DEMO_VEHICLES.filter((v) => v.fuelPer100Km !== null);
export const BATTERY_VEHICLES = DEMO_VEHICLES.filter(
  (v) => DRIVETRAIN_META[v.drivetrain].hasBattery,
);

export type FleetSummary = {
  total: number;
  active: number;
  idle: number;
  offline: number;
  /** Vehicles that are not offline. */
  reporting: number;
  plugIn: number;
  combustion: number;
  battery: number;
};

export function fleetSummary(vehicles: DemoVehicle[] = DEMO_VEHICLES): FleetSummary {
  return {
    total: vehicles.length,
    active: vehicles.filter((v) => v.status === 'active').length,
    idle: vehicles.filter((v) => v.status === 'idle').length,
    offline: vehicles.filter((v) => v.status === 'offline').length,
    reporting: vehicles.filter((v) => v.status !== 'offline').length,
    plugIn: vehicles.filter((v) => DRIVETRAIN_META[v.drivetrain].isPlugIn).length,
    combustion: vehicles.filter((v) => !DRIVETRAIN_META[v.drivetrain].isPlugIn).length,
    battery: vehicles.filter((v) => DRIVETRAIN_META[v.drivetrain].hasBattery).length,
  };
}

export function totalDistance30d(vehicles: DemoVehicle[] = DEMO_VEHICLES): number {
  return sum(vehicles.map((v) => v.distance30dKm));
}

/** Mean energy consumption across the sample plug-in vehicles, kWh/100 km. */
export function avgEnergyPer100Km(): number {
  return mean(
    PLUG_IN_VEHICLES.map((v) => v.energyPer100Km).filter((n): n is number => n !== null),
  );
}

/** Mean fuel consumption across the sample combustion vehicles, L/100 km. */
export function avgFuelPer100Km(): number {
  return mean(
    COMBUSTION_VEHICLES.map((v) => v.fuelPer100Km).filter((n): n is number => n !== null),
  );
}

/** Mean state of health across battery vehicles, %. */
export function avgSohPct(): number {
  return mean(BATTERY_VEHICLES.map((v) => v.sohPct).filter((n): n is number => n !== null));
}

/** Mean state of charge across battery vehicles, %. */
export function avgSocPct(): number {
  return mean(BATTERY_VEHICLES.map((v) => v.socPct).filter((n): n is number => n !== null));
}

export function avgUtilisationPct(): number {
  return mean(DEMO_VEHICLES.map((v) => v.utilisationPct));
}

/* ------------------------------------------------------------------ *
 * Alert derivation
 * ------------------------------------------------------------------ */

export type AlertSummary = {
  total: number;
  open: number;
  openCritical: number;
  bySeverity: { severity: AlertSeverity; count: number }[];
  byType: { type: string; count: number }[];
  byState: { state: AlertState; count: number }[];
};

export function alertSummary(alerts: DemoAlert[] = DEMO_ALERTS): AlertSummary {
  const openAlerts = alerts.filter((a) => a.state === 'open');
  const severityOrder: AlertSeverity[] = ['critical', 'warning', 'info'];
  const severities: AlertSeverity[] = severityOrder;
  const states: AlertState[] = ['open', 'acknowledged', 'closed'];

  const types = Array.from(new Set(alerts.map((a) => a.type))).sort();

  return {
    total: alerts.length,
    open: openAlerts.length,
    openCritical: openAlerts.filter((a) => a.severity === 'critical').length,
    bySeverity: severities.map((severity) => ({
      severity,
      count: openAlerts.filter((a) => a.severity === severity).length,
    })),
    byType: types
      .map((type) => ({ type, count: openAlerts.filter((a) => a.type === type).length }))
      .filter((row) => row.count > 0)
      .sort((a, b) => b.count - a.count),
    byState: states.map((state) => ({
      state,
      count: alerts.filter((a) => a.state === state).length,
    })),
  };
}

export function openAlertsForVehicle(vehicleId: string): DemoAlert[] {
  return DEMO_ALERTS.filter((a) => a.vehicleId === vehicleId && a.state !== 'closed');
}

/* ------------------------------------------------------------------ *
 * Series derivation
 * ------------------------------------------------------------------ */

export type DemoSeries = {
  labels: string[];
  distanceKm: number[];
  energyKwh: number[];
  fuelLitres: number[];
  chargeSessions: number[];
  alertsOpened: number[];
  socPct: number[];
  sohPct: number[];
  reporting: number[];
};

const TRAILING_DAYS = 30;
const SESSIONS_PER_PLUG_IN_PER_DAY = 0.95;

function dailyDistanceKm(): number {
  return totalDistance30d() / TRAILING_DAYS;
}

function dailyEnergyKwh(): number {
  return (
    sum(
      PLUG_IN_VEHICLES.map(
        (v) => (v.distance30dKm / TRAILING_DAYS) * ((v.energyPer100Km ?? 0) / 100),
      ),
    )
  );
}

function dailyFuelLitres(): number {
  return (
    sum(
      COMBUSTION_VEHICLES.map(
        (v) => (v.distance30dKm / TRAILING_DAYS) * ((v.fuelPer100Km ?? 0) / 100),
      ),
    )
  );
}

/**
 * Builds the chart series for a range.
 *
 * Every bucket is (daily fleet rate x days in range x bucket weight), so the
 * sum of a series always reconciles with the fleet totals shown elsewhere on
 * the page. Nothing here is random: the same input yields the same output.
 */
export function buildSeries(rangeId: RangeId): DemoSeries {
  const range = getRange(rangeId);
  const scale = range.days;

  const daily = {
    distance: dailyDistanceKm(),
    energy: dailyEnergyKwh(),
    fuel: dailyFuelLitres(),
    sessions: PLUG_IN_VEHICLES.length * SESSIONS_PER_PLUG_IN_PER_DAY,
    alerts: DEMO_ALERTS.length / TRAILING_DAYS,
  };

  const reportingBase = fleetSummary().reporting;
  const socBase = avgSocPct();
  const sohBase = avgSohPct();

  return {
    labels: range.labels,
    distanceKm: range.weights.map((w) => Math.round(daily.distance * scale * w)),
    energyKwh: range.weights.map((w) => Number((daily.energy * scale * w).toFixed(1))),
    fuelLitres: range.weights.map((w) => Number((daily.fuel * scale * w).toFixed(1))),
    chargeSessions: range.weights.map((w) => Math.round(daily.sessions * scale * w)),
    alertsOpened: range.weights.map((w) => Math.round(daily.alerts * scale * w)),
    socPct: range.socDrift.map((d) => Number(clamp(socBase + d, 0, 100).toFixed(0))),
    sohPct: range.sohDrift.map((d) => Number(clamp(sohBase + d, 0, 100).toFixed(1))),
    reporting: range.activityShape.map((shape) => Math.round(reportingBase * shape)),
  };
}

/* ------------------------------------------------------------------ *
 * Formatting
 * ------------------------------------------------------------------ */

const intFormatter = new Intl.NumberFormat('en-IN');

export function fmtInt(value: number): string {
  return intFormatter.format(Math.round(value));
}

export function fmtOne(value: number): string {
  return value.toFixed(1);
}

export function fmtPercent(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

/** "2 h 40 m" style duration from minutes. */
export function fmtMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m} min`;
  return `${h} h ${m} m`;
}
