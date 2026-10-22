/**
 * ILLUSTRATIVE SAMPLE DATA — FICTIONAL.
 *
 * Every value in this file is made up for layout and storytelling purposes.
 * No number here is measured, audited, or taken from a real manufacturer,
 * a real vehicle, a real pilot or a real partner. Company, model and batch
 * names are invented. Nothing on the Platform page should be read as a
 * performance claim, a customer result, a proven saving or a validated
 * battery diagnostic.
 */

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  direction: 'up' | 'down' | 'flat';
  note: string;
};

export const SAMPLE_KPIS: Kpi[] = [
  {
    label: 'Vehicles reporting',
    value: '1,240',
    delta: '+3.1%',
    direction: 'up',
    note: 'of 1,500 sample units',
  },
  {
    label: 'Median energy per km',
    value: '2.9 kWh',
    delta: '−0.2 kWh',
    direction: 'down',
    note: 'sample model mix',
  },
  {
    label: 'Open service events',
    value: '37',
    delta: '−8 this week',
    direction: 'down',
    note: 'sample event log',
  },
  {
    label: 'Avg. charge dwell time',
    value: '2 h 40 m',
    delta: '−12 min',
    direction: 'down',
    note: 'sample charge sessions',
  },
];

export type Bar = { label: string; value: number; display: string };

/** Sample energy-per-km by model, in kWh/km. */
export const SAMPLE_ENERGY_BY_MODEL: Bar[] = [
  { label: 'Model A1', value: 2.3, display: '2.3' },
  { label: 'Model A2', value: 2.7, display: '2.7' },
  { label: 'Model B1', value: 3.1, display: '3.1' },
  { label: 'Model B2', value: 3.4, display: '3.4' },
  { label: 'Model C1', value: 2.5, display: '2.5' },
  { label: 'Model C2', value: 3.0, display: '3.0' },
];

/** Sample charge sessions per week. */
export const SAMPLE_CHARGE_SESSIONS: Bar[] = [
  { label: 'Wk 1', value: 620, display: '620' },
  { label: 'Wk 2', value: 710, display: '710' },
  { label: 'Wk 3', value: 690, display: '690' },
  { label: 'Wk 4', value: 780, display: '780' },
  { label: 'Wk 5', value: 745, display: '745' },
  { label: 'Wk 6', value: 812, display: '812' },
  { label: 'Wk 7', value: 860, display: '860' },
  { label: 'Wk 8', value: 905, display: '905' },
];

export type SampleModel = {
  model: string;
  units: string;
  energyPerKm: string;
  chargeCycles: string;
  openEvents: string;
  flag: 'ok' | 'review';
};

export const SAMPLE_MODEL_TABLE: SampleModel[] = [
  { model: 'Sample Model A1', units: '512', energyPerKm: '2.3 kWh', chargeCycles: '186', openEvents: '6', flag: 'ok' },
  { model: 'Sample Model A2', units: '268', energyPerKm: '2.7 kWh', chargeCycles: '141', openEvents: '4', flag: 'ok' },
  { model: 'Sample Model B1', units: '243', energyPerKm: '3.1 kWh', chargeCycles: '120', openEvents: '17', flag: 'review' },
  { model: 'Sample Model B2', units: '104', energyPerKm: '3.4 kWh', chargeCycles: '61', openEvents: '8', flag: 'review' },
  { model: 'Sample Model C1', units: '81', energyPerKm: '2.5 kWh', chargeCycles: '40', openEvents: '2', flag: 'ok' },
  { model: 'Sample Model C2', units: '32', energyPerKm: '3.0 kWh', chargeCycles: '19', openEvents: '0', flag: 'ok' },
];

export type SampleEvent = {
  id: string;
  model: string;
  issue: string;
  units: number;
  window: string;
  status: 'Under review' | 'Awaiting data' | 'Resolved in sample';
};

export const SAMPLE_EVENTS: SampleEvent[] = [
  { id: 'EV-1042', model: 'Sample Model B1', issue: 'Charge-cycle counter mismatch', units: 11, window: 'Batch 2024-S11', status: 'Under review' },
  { id: 'EV-1043', model: 'Sample Model B2', issue: 'Intermittent charger handshake fault', units: 6, window: 'Batch 2024-S12', status: 'Under review' },
  { id: 'EV-1044', model: 'Sample Model A2', issue: 'Cell voltage spread above sample band', units: 3, window: 'Batch 2024-S10', status: 'Awaiting data' },
];

export const SAMPLE_SEGMENTS = [
  { label: 'Sample Manufacturer A', detail: 'Fictional brand — sample tenancy' },
  { label: 'Sample Manufacturer B', detail: 'Fictional brand — sample tenancy' },
  { label: 'Sample Manufacturer C', detail: 'Fictional brand — sample tenancy' },
];
