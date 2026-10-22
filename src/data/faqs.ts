export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: 'Do you already integrate with our vehicle controller?',
    a: 'Not yet. Each manufacturer’s controller, firmware and field set differ, so integrations are built per partner during a pilot. We start from a limited vehicle set or a historical file export to validate field mapping before anything is connected in production.',
  },
  {
    q: 'Can we see other manufacturers’ data?',
    a: 'No. Data is isolated per tenant, with per-tenant access control and audit trails. Shared infrastructure is shared in the sense of the platform being common — your operational data is not pooled or exposed to other manufacturers.',
  },
  {
    q: 'What data do you need from us, and how much?',
    a: 'Typically vehicle identity, timestamps, and the fields your controller exposes for energy, charge state, faults and odometer. The volume needed for a pilot is small — a few vehicles or a file export is enough to start. We agree the field list in writing during scoping.',
  },
  {
    q: 'What does a pilot cost?',
    a: 'Pilot commercials are agreed per engagement, based on scope, vehicle count and the modules you adopt. We do not publish a price list, because the scope of a shared platform engagement varies considerably between manufacturers.',
  },
  {
    q: 'Are the analytics validated or clinically proven?',
    a: 'No. This is operational analytics software, not a validated medical or safety-certified diagnostic system. Battery and cost outputs are derived from the telemetry your vehicles report, and every dashboard distinguishes measured, derived and estimated values. Any conclusion about hardware health needs to be confirmed against your own engineering and test data.',
  },
  {
    q: 'Can we bring our own dashboards or BI tool?',
    a: 'Yes. We can expose the platform’s metrics as a scheduled export so an existing BI tool can consume them, or configure the built-in dashboards to your reporting format. Where you already have a working stack, we prefer to feed it rather than replace it.',
  },
  {
    q: 'How is our data protected?',
    a: 'Encryption in transit and at rest, per-tenant access control, least-privilege roles, and logging of access to customer data. The specific controls, retention schedule and breach-notification terms are set out in the agreement signed at the start of a pilot.',
  },
  {
    q: 'What happens if we decide to stop?',
    a: 'The pilot can be ended at any point. We will provide an export of the data you shared, and confirm in writing when it has been removed from the platform.',
  },
];
