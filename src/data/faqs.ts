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
    q: 'Does Evmetrik work with vehicles from more than one manufacturer?',
    a: 'That is the design intent. One analytical model is intended to hold supported vehicles regardless of brand, so a mixed fleet or a multi-vehicle household can be viewed in one workspace. Each manufacturer is still a separate integration: compatibility depends on the model, the fields its source exposes and the permissions granted, and no model is supported until an integration for it has been agreed.',
  },
  {
    q: 'Where does the vehicle data come from?',
    a: 'From whichever authorised source is available for that vehicle: the vehicle itself or an approved telematics device, a manufacturer or OEM API where one is provided, an existing fleet-management system with export or API access, or a historical file export. Data does not have to pass through a manufacturer database first, and some integrations will not be possible at all — that is assessed per vehicle during scoping.',
  },
  {
    q: 'Can an individual owner use it, or is it only for companies?',
    a: 'Individual owner accounts are part of the intended product: several supported vehicles in one account, with access limited to the vehicles associated with that account, kept separate from any company workspace. Evmetrik is pre-launch, so there is no self-service sign-up today. The product demo shows the intended owner experience using fictional sample records, and organisations can apply for a pilot.',
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
