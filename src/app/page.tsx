import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { SectionHeading } from '@/components/SectionHeading';
import { FeatureCard } from '@/components/FeatureCard';
import { StepCard } from '@/components/StepCard';
import { CtaBanner } from '@/components/CtaBanner';
import { ButtonLink } from '@/components/Button';
import { AudienceSection } from '@/components/AudienceSection';
import { UnifiedPlatform } from '@/components/UnifiedPlatform';
import { FEATURES } from '@/data/features';
import { HOME_STEPS } from '@/data/process';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Vehicle analytics for mixed-brand fleets, manufacturers and owners',
  description:
    'Evmetrik brings available vehicle data from multiple manufacturers into one analytics experience: individuals managing several supported vehicles, fleet operators monitoring a mixed-brand fleet, and manufacturers analysing authorised field data. Per-brand workspaces, authorised integrations, battery and charging analytics, running-cost reports and service insights.',
};

const AUDIENCE = [
  {
    title: 'Early-stage manufacturers',
    body: 'You are shipping your first few hundred units and need energy, charging and cost visibility without hiring a data team.',
  },
  {
    title: 'Scaling manufacturers',
    body: 'Your volume has grown past spreadsheets and WhatsApp reports, and you need consistent definitions across models and batches.',
  },
  {
    title: 'Component & service partners',
    body: 'You supply chargers, batteries or service networks and need structured feedback on field performance, with authorized data only.',
  },
];

const HONESTY = [
  'Evmetrik is pre-launch. No customers, integrations or performance results are claimed on this site.',
  'Analytics are operational, not validated diagnostics. Every dashboard separates measured, derived and estimated values.',
  'Figures in the sample dashboard are fictional and exist to show layout and metric definitions.',
  'Data is shared only with written authorization, scoped per manufacturer, and isolated per tenant.',
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section" aria-labelledby="problem-title">
        <div className="container">
          <SectionHeading
            id="problem-title"
            eyebrow="The problem"
            title="Vehicle data arrives in as many formats as there are manufacturers"
            lede="Dashboards, pipelines, cost spreadsheets and service trackers get rebuilt from scratch by each company, at a cost small teams cannot absorb. A fleet running several brands, or an owner with three vehicles, has no single place to look — and the numbers that do exist rarely mean the same thing twice. Evmetrik is designed around one common data model instead."
          />

          <div className="grid grid--3">
            <article className="card cardAccent">
              <h3>Duplicated effort</h3>
              <p>
                Telemetry pipelines, metric definitions and report templates get rebuilt
                company by company — and rarely match, so cross-brand comparison is guesswork.
              </p>
            </article>
            <article className="card cardAccent">
              <h3>Blind spots at small volumes</h3>
              <p>
                At a few hundred units a month, a single engineer cannot watch energy,
                charging and service data across every model and batch at once.
              </p>
            </article>
            <article className="card cardAccent">
              <h3>Cost opacity</h3>
              <p>
                Energy, service and warranty costs land in different spreadsheets, so
                per-vehicle running cost is rarely known accurately when it matters.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="value-title">
        <div className="container">
          <SectionHeading
            id="value-title"
            eyebrow="Capabilities"
            title="A shared platform, configured for your make and your models"
            lede="You bring the vehicles and the data you are willing to share. We bring the common stack, the metric definitions and the dashboards — configured to your brand, your models and your teams."
          />
          <div className="grid grid--3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <AudienceSection
        id="customer-value"
        eyebrow="What you get with Evmetrik"
        title="One platform, three very different jobs"
        lede="An individual with two scooters and a car, a logistics operator with a mixed fleet, and a manufacturer investigating a field issue do not need the same screens. They do need the same underlying data discipline."
      />

      <UnifiedPlatform id="unified-platform" />

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <SectionHeading
            id="how-title"
            eyebrow="How it works"
            title="From authorization to insight in three steps"
            lede="A pilot is deliberately small and reversible. You start with a handful of vehicles or a historical file export, and you decide at the end whether to continue."
          />
          <ol className={styles.steps} role="list">
            {HOME_STEPS.map((step, i) => (
              <li key={step.title}>
                <StepCard step={step} index={i} />
              </li>
            ))}
          </ol>
          <p className={styles.stepsNote}>
            We are onboarding a limited number of pilot partners as we build. Pilot scope,
            timings and commercials are agreed per engagement.
          </p>
        </div>
      </section>

      <section className="section section--panel" aria-labelledby="audience-title">
        <div className="container">
          <SectionHeading
            id="audience-title"
            eyebrow="Manufacturer stages"
            title="Built for teams that cannot afford enterprise tooling"
            lede="Separate from customer type, the platform is scoped for manufacturers at three stages — each with the same data discipline and a different starting module set."
          />
          <div className="grid grid--3">
            {AUDIENCE.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="honesty-title">
        <div className="container">
          <div className={styles.honesty}>
            <div>
              <SectionHeading
                id="honesty-title"
                eyebrow="Straight answers"
                title="What this platform does not claim"
                lede="A new platform should be precise about the difference between a designed capability and a proven result. Ours is short and specific."
              />
            </div>
            <ul className={styles.honestyList}>
              {HONESTY.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Bring one model. Leave with a working dashboard."
        body="A pilot starts with a small, authorized vehicle set and a written scope. Tell us what you want to see first, and we will tell you honestly whether the data supports it."
      />

      <section className="section section--tight" aria-labelledby="next-title">
        <div className={`container ${styles.next}`}>
          <div>
            <h2 id="next-title">Want the technical picture first?</h2>
            <p className="lede">
              The Platform page covers the feature set, the architecture overview and an
              illustrative dashboard built on clearly labelled fictional sample data.
            </p>
          </div>
          <div className="btnRow">
            <ButtonLink href="/platform/">Explore the platform</ButtonLink>
            <ButtonLink href="/partner/" variant="ghost">
              Partner With Us
            </ButtonLink>
            <ButtonLink href="/demo/" variant="ghost">
              Open the product demo
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
