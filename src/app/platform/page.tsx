import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { FeatureCard } from '@/components/FeatureCard';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { SampleDashboard } from '@/components/SampleDashboard';
import { CtaBanner } from '@/components/CtaBanner';
import { FEATURES } from '@/data/features';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Platform — features, architecture and an illustrative dashboard',
  description:
    'The Evmetrik platform: per-brand dashboards, authorized data integrations, battery and charging analytics, running-cost reports, service insights, a logical architecture overview and an illustrative dashboard using fictional sample data.',
};

const MODULES = [
  {
    title: 'Dashboards',
    status: 'Core module',
    body: 'Per-tenant workspaces with configurable widgets for model, variant, batch and region. Roles determine which view a team sees.',
  },
  {
    title: 'Data integrations',
    status: 'Core module',
    body: 'Connector adapters for CAN, serial gateway and file-based feeds, each bound to a written access scope and a field mapping.',
  },
  {
    title: 'Battery & charging',
    status: 'Optional module',
    body: 'Energy throughput, charge cycles, dwell time and spread flags — derived from reported fields, with derived-versus-measured labels.',
  },
  {
    title: 'Running-cost reports',
    status: 'Optional module',
    body: 'A cost model you configure (energy rates, service parts, other line items) producing per-vehicle and per-model cost views.',
  },
  {
    title: 'Service insights',
    status: 'Optional module',
    body: 'Event clustering, batch-level review queues and service-part demand signals, for your engineering team to verify.',
  },
  {
    title: 'Exports & BI',
    status: 'Optional module',
    body: 'Scheduled metric exports so an existing BI or spreadsheet workflow can consume the platform without being replaced.',
  },
];

const PRINCIPLES = [
  {
    title: 'Authorization before connection',
    body: 'No data moves before a signed scope defines the fields, vehicles, purpose and retention window.',
  },
  {
    title: 'Tenant isolation by default',
    body: 'Storage, keys, queries and access logs are separated per manufacturer. Shared code, shared nothing else.',
  },
  {
    title: 'Provenance on every number',
    body: 'Each metric records whether it was measured, derived or estimated, so reviewers can judge it themselves.',
  },
  {
    title: 'Reversible by design',
    body: 'Pilots end cleanly: data export on request, and written confirmation when it has been removed.',
  },
];

export default function PlatformPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow">The platform</p>
          <h1>One stack, six modules, one tenant per manufacturer</h1>
          <p className="lede">
            The platform is built as a common foundation with optional modules, so a new
            manufacturer can start with dashboards and add battery, cost and service
            analytics when their data and team are ready.
          </p>
          <div className={styles.badges}>
            <span className="badge">Per-brand workspaces</span>
            <span className="badge">Authorized ingestion</span>
            <span className="badge">No database required on your side</span>
            <span className="badge">Pre-launch — pilots now</span>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <SectionHeading
            id="features-title"
            eyebrow="Capabilities"
            title="What the platform does"
            lede="Each capability below is a designed part of the product. Availability, effort and pricing are confirmed per pilot engagement."
          />
          <div className="grid grid--3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="modules-title">
        <div className="container">
          <SectionHeading
            id="modules-title"
            eyebrow="Module map"
            title="Adopt what you need, when you need it"
            lede="A shared platform means common metric definitions across brands — but each manufacturer chooses their own module set."
          />
          <div className="grid grid--3">
            {MODULES.map((m) => (
              <article key={m.title} className="card cardAccent">
                <span className="badge badge--muted">{m.status}</span>
                <h3 style={{ marginTop: '0.8rem' }}>{m.title}</h3>
                <p>{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="architecture-title">
        <div className="container">
          <SectionHeading
            id="architecture-title"
            eyebrow="Architecture overview"
            title="How the pieces fit together"
            lede="A logical view of the platform, from the vehicle up to the screens your team uses. The same metric definitions sit underneath every tenant."
          />
          <ArchitectureDiagram />

          <div className="grid grid--2" style={{ marginTop: '2.5rem' }}>
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>

          <p className={styles.scopeNote}>
            Scope note: this is a conceptual architecture for a pre-launch product. Physical
            deployment topology, connector-level protocol details, regional data-residency
            options and infrastructure sizing are agreed during technical scoping for each
            pilot.
          </p>
        </div>
      </section>

      <section className="section section--panel" aria-labelledby="dashboard-title">
        <div className="container">
          <SectionHeading
            id="dashboard-title"
            eyebrow="Illustrative dashboard"
            title="What a brand workspace could look like"
            lede="The mock-up below shows the intended information architecture: fleet KPIs, energy and charging views, a model table and a service-event queue. All of it runs on clearly labelled fictional sample data."
          />
          <SampleDashboard />
        </div>
      </section>

      <CtaBanner
        title="See it against your own vehicles"
        body="Bring a sample data export and we will configure the closest matching workspace during a pilot — and tell you plainly where your data is too thin to support a conclusion."
        secondaryLabel="Read the FAQ"
        secondaryHref="/partner/#faq"
      />
    </>
  );
}
