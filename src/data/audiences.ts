/**
 * Customer-value content, kept in one typed module so the homepage, Platform
 * page, product demo and Partner page all describe the same three audiences
 * with the same wording.
 *
 * Every statement here is a designed capability or a potential benefit. None of
 * it claims a live integration, a measured result, a customer or a partnership.
 */

export type AudienceId = 'individuals' | 'fleets' | 'manufacturers';

export type AudienceValue = {
  id: AudienceId;
  tag: string;
  title: string;
  summary: string;
  benefits: string[];
  note: string;
  href: string;
  ctaLabel: string;
};

export const AUDIENCE_VALUES: AudienceValue[] = [
  {
    id: 'individuals',
    tag: 'For individuals',
    title: 'All your vehicles. One place.',
    summary:
      'Evmetrik is designed so one account can hold several supported vehicles from different manufacturers — say an Ather scooter, an Ola Electric scooter and an electric car from a third brand — and show them together instead of one manufacturer app at a time.',
    benefits: [
      'View supported vehicles through one interface, switching between them without changing apps.',
      'Understand the distance, energy or fuel consumption, charging and battery readings your vehicles actually report.',
      'Review how each vehicle has been used over time, and compare supported vehicles side by side.',
      'See alerts and maintenance-related indicators where the connected data source supplies them.',
      'Understand running costs when enough cost and usage data is available to support the figure.',
    ],
    note: 'Simple by default: every reading is labelled with the vehicle it came from and whether it is measured, derived or estimated.',
    href: '/demo/',
    ctaLabel: 'See the owner view',
  },
  {
    id: 'fleets',
    tag: 'For fleets',
    title: 'Your entire fleet. One dashboard.',
    summary:
      'A delivery or logistics operation rarely runs one brand. Evmetrik is designed to consolidate supported electric scooters, electric cars and commercial vehicles from several manufacturers into one fleet analytics workspace, without asking every vehicle to come from the same maker.',
    benefits: [
      'Consolidated visibility across a mixed-brand fleet, with vehicle-level and fleet-level reporting.',
      'Compare distance travelled, utilisation, and energy or fuel consumption across models and depots.',
      'Identify vehicles that are idle, have stopped reporting, or are raising alerts, where the data supports it.',
      'Review operational trends and historical reporting for deployment, maintenance and rotation planning.',
      'Give fleet managers, operations staff and authorised colleagues one common analytics experience with role-based access.',
      'Add further models and data sources over time rather than replacing the workspace.',
    ],
    note: 'Mixed-brand by design. Figures are only shown where the underlying source supplies them; a missing reading is shown as missing, never as zero.',
    href: '/platform/#integrations',
    ctaLabel: 'See how data connects',
  },
  {
    id: 'manufacturers',
    tag: 'For manufacturers',
    title: 'Turn vehicle data into better decisions.',
    summary:
      'For a vehicle manufacturer, OEM engineering team or EV startup, Evmetrik is designed as an integration and analysis layer over data you choose to share — not a route into a private manufacturer database.',
    benefits: [
      'Understand available real-world usage and performance across models, variants and batches.',
      'Analyse energy consumption and charging behaviour for supported electric vehicles under different operating conditions.',
      'Review field alerts and recurring issues, and see where incoming records are incomplete or inconsistent.',
      'Compare model and variant behaviour when enough vehicles and records exist to make the comparison meaningful.',
      'Support engineering investigations and product decisions with a record rather than recollection.',
    ],
    note: 'Insights depend on the fields you authorise, the vehicles in scope and the agreed use case. No proprietary OEM system is accessed without an approved integration.',
    href: '/partner/#founding-pilot',
    ctaLabel: 'Explore a pilot',
  },
];

export type UnifiedStep = { label: string; title: string; body: string };

export const UNIFIED_STEPS: UnifiedStep[] = [
  {
    label: '01',
    title: 'Connect',
    body: 'Integrate an authorised data source: a supported vehicle, an approved telematics device, an OEM API or an existing fleet-management system.',
  },
  {
    label: '02',
    title: 'Unify',
    body: 'Incoming records are validated, mapped and normalised into one common vehicle view, then associated with the right vehicle, owner or organisation.',
  },
  {
    label: '03',
    title: 'Understand',
    body: 'Explore performance, consumption, utilisation, reports, trends and alerts in one interface — with each metric labelled by provenance.',
  },
];

export const COMPATIBILITY_NOTE =
  'Compatibility depends on the vehicle model, the fields a source actually exposes, the permissions granted, and the technical work needed to support it. Evmetrik does not claim universal manufacturer coverage, and no model is supported until an integration for it has been agreed. Within a supported vehicle, what you see depends on the data the source actually provides — where data is available it appears in your workspace, and where it is not, it is shown as unavailable rather than as a zero reading.';

export type SourceKind = { title: string; body: string };

export const DATA_SOURCES: SourceKind[] = [
  {
    title: 'Supported vehicle or telematics unit',
    body: 'Authorised direct telemetry from the vehicle or an approved aftermarket device, where the vehicle exposes the required fields.',
  },
  {
    title: 'Manufacturer or OEM API',
    body: 'A documented interface provided by the manufacturer under a written access scope, where one exists for that model.',
  },
  {
    title: 'Fleet-management system',
    body: 'An existing fleet platform, where export or API access is available, so the workspace complements rather than replaces it.',
  },
  {
    title: 'File-based export',
    body: 'A historical export of vehicle records, useful for a first pilot where a live feed is not yet in place.',
  },
];

export type MetricScope = {
  drivetrain: string;
  metrics: string;
  unavailable: string;
};

export const METRIC_SCOPE: MetricScope[] = [
  {
    drivetrain: 'Electric vehicles',
    metrics: 'State of charge, charging history, energy consumption, distance and available battery-health indicators.',
    unavailable: 'Fuel level and fuel consumption are not applicable.',
  },
  {
    drivetrain: 'Petrol and diesel vehicles',
    metrics: 'Fuel consumption, distance, utilisation and service-related information where the source provides it.',
    unavailable: 'Battery state of charge and state of health are not applicable.',
  },
  {
    drivetrain: 'Hybrid vehicles',
    metrics: 'Fuel and electric-energy figures together, to the extent the source reports both.',
    unavailable: 'Whichever of the two the source does not expose is shown as unavailable, not estimated.',
  },
  {
    drivetrain: 'Commercial vehicles',
    metrics: 'Usage, fleet utilisation and operating-cost indicators where cost inputs are configured.',
    unavailable: 'Passenger-vehicle assumptions such as daily commute patterns do not transfer.',
  },
];
