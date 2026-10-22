export type Feature = {
  title: string;
  description: string;
  bullets: string[];
  icon: 'dashboard' | 'integration' | 'battery' | 'cost' | 'service' | 'access';
};

/**
 * Capability descriptions only. Nothing here claims a customer, a measured
 * saving, or a validated diagnostic outcome — the platform is pre-launch and
 * every figure shown on the site is illustrative sample data.
 */
export const FEATURES: Feature[] = [
  {
    title: 'Manufacturer-specific dashboards',
    description:
      'A shared platform that renders each manufacturer’s own vehicle mix, variants and configuration as a separate, permissioned view.',
    bullets: [
      'Per-brand workspaces with isolated data boundaries',
      'Configurable widgets for model, variant and region',
      'Role-based views for leadership, engineering and service teams',
    ],
    icon: 'dashboard',
  },
  {
    title: 'Authorized vehicle-data integrations',
    description:
      'A standards-based connector layer designed to ingest telemetry from vehicle controllers through written manufacturer authorization.',
    bullets: [
      'Documented, per-manufacturer consent and access scope',
      'Connector model for CAN / serial gateway and file-based feeds',
      'Data retention windows and access audit trails',
    ],
    icon: 'integration',
  },
  {
    title: 'Battery and charging analytics',
    description:
      'Derived metrics for state of charge, energy throughput and charging behaviour, computed from whatever the vehicle actually reports.',
    bullets: [
      'Charge/discharge energy, cycle and dwell-time views',
      'Anomaly flags surfaced for engineers to investigate',
      'Clearly separated measured, derived and estimated fields',
    ],
    icon: 'battery',
  },
  {
    title: 'Running-cost reporting',
    description:
      'Consolidated per-vehicle and per-model cost views that combine energy, service and other line items you authorise us to track.',
    bullets: [
      'Cost per kilometre and per vehicle-month roll-ups',
      'Scenario comparison across models, regions and suppliers',
      'Exportable periodic reports for finance and product teams',
    ],
    icon: 'cost',
  },
  {
    title: 'Service insights',
    description:
      'Service-event and warranty-facing views that help a small team spot recurring issues before they become a recall conversation.',
    bullets: [
      'Issue clustering by symptom, batch and component',
      'Recall-candidate lists to check against your own records',
      'Service-part demand signals for planning',
    ],
    icon: 'service',
  },
  {
    title: 'Shared platform, isolated tenancy',
    description:
      'Many emerging manufacturers use one platform without seeing each other’s data, and without rebuilding the same dashboards.',
    bullets: [
      'Tenant-isolated storage and per-tenant keys',
      'Common metric definitions so comparisons are meaningful',
      'Optional module adoption as each team becomes ready',
    ],
    icon: 'access',
  },
];
