export type Step = { title: string; summary: string; detail: string; duration: string };

/** The proposed pilot motion. Timings are indicative targets, not commitments. */
export const PILOT_STEPS: Step[] = [
  {
    title: 'Scoping call',
    summary: 'A 45-minute conversation on your vehicle line, volumes and data sources.',
    detail:
      'We map which models, variants and controllers are in scope, and what a useful first outcome looks like for your team.',
    duration: 'Week 1',
  },
  {
    title: 'Access and agreement',
    summary: 'Written scope, data-sharing terms and a named integration owner on both sides.',
    detail:
      'Nothing is connected before authorization is signed. Scope covers which fields are shared, for how long, and who may see them.',
    duration: 'Week 1–2',
  },
  {
    title: 'Sandbox integration',
    summary: 'We connect a limited set of vehicles or a historical file export in a test environment.',
    detail:
      'Field mapping and ingestion are validated against sample and replay data. Access is limited to the sandbox until sign-off.',
    duration: 'Week 2–4',
  },
  {
    title: 'Dashboard configuration',
    summary: 'Your dashboards, metric definitions and report templates are set up for your team.',
    detail:
      'We configure the widgets your engineers and finance reviewers actually use, and document each metric definition in plain language.',
    duration: 'Week 4–5',
  },
  {
    title: 'Pilot review',
    summary: 'A structured review of what the data showed, what it did not, and what to fix.',
    detail:
      'We share an honest assessment: which findings are supported by the ingested data, which are still thin, and what instrumentation we would recommend next.',
    duration: 'Week 6',
  },
  {
    title: 'Go / no-go',
    summary: 'You decide whether to extend, adjust or stop — with a written summary either way.',
    detail:
      'No automatic renewal, no lock-in, and an export of your data on request at any point in the pilot.',
    duration: 'End of pilot',
  },
];

export const HOME_STEPS: Step[] = [
  {
    title: 'Connect, with consent',
    summary: 'Share telemetry only where you have authorized it — per model, per field, per partner.',
    detail:
      'Integrations are established through a written agreement and scoped to the vehicles and fields you choose.',
    duration: '01',
  },
  {
    title: 'See your fleet clearly',
    summary: 'One dashboard per brand, with consistent definitions across models and batches.',
    detail:
      'Manufacturers see their own operations only. Shared infrastructure means no rebuilding of the same views.',
    duration: '02',
  },
  {
    title: 'Decide with evidence',
    summary: 'Cost, battery, charging and service signals in the same place your team already works.',
    detail:
      'Findings are labelled by how they were derived, so the team knows what is measured, derived or estimated.',
    duration: '03',
  },
];
