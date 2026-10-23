import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { StepCard } from '@/components/StepCard';
import { ButtonLink } from '@/components/Button';
import { ContactSection } from '@/components/ContactSection';
import { DemoDashboard } from '@/components/demo/DemoDashboard';
import { PILOT_JOURNEY } from '@/data/process';
import {
  alertSummary,
  buildSeries,
  DEMO_VEHICLES,
  fleetSummary,
  fmtInt,
  fmtPercent,
} from '@/data/demo';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Product demo — interactive multi-brand vehicle analytics preview',
  description:
    'An interactive preview of the Evmetrik vehicle analytics platform for mixed-brand vehicles: fleet overview, energy and fuel consumption, battery state of charge and health, utilisation and alerts across electric, hybrid, petrol and diesel sample records. Every figure is illustrative sample data.',
  alternates: { canonical: '/demo/' },
  openGraph: {
    title: 'Evmetrik product demo — interactive vehicle analytics preview',
    description:
      'Explore an illustrative Evmetrik dashboard: fleet counts, consumption, battery readings, utilisation and alerts for electric, petrol, diesel and hybrid vehicles. Sample data only.',
    url: '/demo/',
    type: 'website',
  },
};

const SHOWS = [
  'How fleet counts, consumption, battery readings, utilisation and alerts could sit in one workspace.',
  'How metrics that apply only to battery vehicles are separated from metrics that apply to every drivetrain.',
  'How a single sample vehicle can be inspected without losing sight of the fleet it belongs to.',
  'How changing the time range re-derives every dependent figure from the same set of records.',
];

const DOES_NOT_SHOW = [
  'Live or historical data from real vehicles. Nothing is connected to this page.',
  'Production accuracy, sensor calibration or validated battery diagnostics.',
  'Any measured saving, uptime improvement, failure-rate reduction or return on investment.',
  'Integration, ingestion or an authenticated customer workspace. None of these can be tried here.',
];

const VALUE = [
  {
    title: 'Individual vehicle owners',
    body:
      'See how several supported vehicles from different manufacturers could sit in one account: pick a record, read what it reports, and move to the next vehicle without changing applications. The sample set deliberately mixes manufacturers and drivetrains so the difference between what an electric, hybrid, petrol or diesel vehicle reports is visible rather than glossed over.',
  },
  {
    title: 'Fleet operators and fleet owners',
    body:
      'Compare distance, utilisation and consumption across a mixed fleet, and separate vehicles that are idle from vehicles that have stopped reporting. Decisions about deployment, rotation and workshop time can then rest on a record rather than recollection.',
  },
  {
    title: 'Vehicle manufacturers and OEMs',
    body:
      'Inspect how a model or variant behaves across a batch: which duty cycles draw more energy, where alerts cluster, and which fields arrive incomplete. That is the raw material for a field investigation or the next hardware revision.',
  },
  {
    title: 'EV and mobility businesses',
    body:
      'Follow energy drawn, state of charge and charge patterns per vehicle, and see where real charging behaviour departs from the assumption behind a deployment plan. Hybrid and combustion vehicles stay in the same view under their own metrics.',
  },
  {
    title: 'Prospective pilot partners',
    body:
      'Test one question against data the company already holds. A pilot is scoped around a single use case, so the value of the exercise becomes visible before any wider commitment is discussed.',
  },
];

export default function DemoPage() {
  const fleet = fleetSummary();
  const alerts = alertSummary();
  const week = buildSeries('7d');
  const weekMax = Math.max(...week.distanceKm, 1);
  const sampleRows = DEMO_VEHICLES.slice(0, 3);

  return (
    <>
      <section className={styles.hero} aria-labelledby="demo-title">
        <div className="container">
          <div className={styles.heroInner}>
            <p className="eyebrow">Product demo</p>
            <h1 id="demo-title" className={styles.heroTitle}>
              Vehicle analytics for electric, petrol, diesel, hybrid and fleet vehicles.
            </h1>
            <p className={styles.heroLede}>
              Evmetrik is built to turn vehicle records into views a team can act on: how far each
              vehicle travelled, what it consumed, how hard it worked, what its battery is doing and
              which alerts are still open. This page is an interactive preview of that surface. Choose
              a sample vehicle, switch the time range and move between views to see the pieces
              together.
            </p>
            <div className={styles.heroActions}>
              <ButtonLink href="#dashboard" variant="primary">
                Explore Product Demo
              </ButtonLink>
              <ButtonLink href="/partner/" variant="ghost">
                Become a Pilot Partner
              </ButtonLink>
            </div>
            <p className={styles.heroNote}>
              <span aria-hidden="true" />
              <span>
                Every figure on this page is invented for demonstration. No vehicle, customer or live
                feed is connected, and no number here describes a real fleet or a measured result.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="dashboard" aria-labelledby="dashboard-title">
        <div className="container">
          <SectionHeading
            id="dashboard-title"
            eyebrow="Interactive preview"
            title="A working view of the analysis surface"
            lede="Switch between the five views, change the time range, or pick a different sample vehicle. Every interaction runs in your browser against a fixed set of fictional records held on this page."
          />
          <DemoDashboard />
          <p className={styles.dashNote}>
            The sample set mixes drivetrains on purpose. Battery state of charge and state of health
            appear only for electric and hybrid records, and are labelled as such wherever they are
            shown. Selecting a petrol or diesel record explains why those readings are absent instead
            of showing an empty gauge.
          </p>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="honesty-title">
        <div className="container">
          <SectionHeading
            id="honesty-title"
            eyebrow="Read this before the numbers"
            title="What this demo does and does not show"
            lede="A dashboard is easy to make persuasive. The list below is what the preview is actually evidence of."
          />
          <div className={styles.honestyGrid}>
            <div className={styles.honestyCard} data-tone="yes">
              <h3>What you are looking at</h3>
              <ul>
                {SHOWS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.honestyCard} data-tone="no">
              <h3>What it is not</h3>
              <ul>
                {DOES_NOT_SHOW.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="preview-title">
        <div className="container">
          <SectionHeading
            id="preview-title"
            eyebrow="Responsive layout"
            title="The same views, built to collapse to a phone"
            lede="The dashboard above is a responsive interface, not a fixed image. Below is an illustrative mobile layout assembled from the same components and sample records."
          />
          <div className={styles.previewGrid}>
            <div className={styles.previewCopy}>
              <p>
                On a narrow screen the interface drops to one column: the metric cards stack, the tab
                row scrolls horizontally, charts reflow to the available width, and tables become
                scrollable rather than squeezing their columns.
              </p>
              <p>
                The frame here is a layout study, not a screenshot, and it is not an application you
                can install. Evmetrik has no released mobile app, so no store badge or download link
                appears anywhere on this site.
              </p>
              <p className={styles.previewCaption}>
                Illustrative layout only. Figures in the frame come from the same fictional sample
                set as the dashboard above.
              </p>
            </div>

            <div className={styles.phone} aria-hidden="true">
              <div className={styles.phoneScreen}>
                <div className={styles.phoneBar}>
                  <strong>Evmetrik</strong>
                  <span>Sample</span>
                </div>
                <div className={styles.phoneBody}>
                  <div className={styles.phoneKpiRow}>
                    <div className={styles.phoneKpi}>
                      <span>Vehicles</span>
                      <strong>{fmtInt(fleet.total)}</strong>
                    </div>
                    <div className={styles.phoneKpi}>
                      <span>Open alerts</span>
                      <strong>{fmtInt(alerts.open)}</strong>
                    </div>
                  </div>
                  <div className={styles.phoneChart}>
                    {week.distanceKm.map((value, i) => (
                      <i
                        key={week.labels[i]}
                        style={{ height: `${Math.max(12, Math.round((value / weekMax) * 100))}%` }}
                      />
                    ))}
                  </div>
                  <div className={styles.phoneRows}>
                    {sampleRows.map((v) => (
                      <div className={styles.phoneRow} key={v.id}>
                        <b>{v.id}</b>
                        <em>{fmtPercent(v.utilisationPct)}</em>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="value-title">
        <div className="container">
          <SectionHeading
            id="value-title"
            eyebrow="Customer value"
            title="How different customers would use this preview"
            lede="The same surface answers different questions depending on who is looking at it. These are the questions the platform is designed to support — potential benefits, not outcomes Evmetrik has measured or can promise."
          />
          <div className={styles.valueGrid}>
            {VALUE.map((item) => (
              <article className={styles.valueCard} key={item.title}>
                <span className={styles.valueTag}>Potential benefit</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className={styles.disclaimer}>
            <strong>Nothing here is a measured result.</strong> Evmetrik has no published customer
            outcomes: there is no case study, benchmark, rating or comparison behind this page. What a
            team actually gets depends on the data it can supply, the condition of that data and the
            specific question it wants answered. A pilot is where that becomes testable.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="journey-title">
        <div className="container">
          <SectionHeading
            id="journey-title"
            eyebrow="How a pilot works"
            title="Five steps, one question at a time"
            lede="The same journey is described on the Partner page. It is deliberately short, and each step has an exit."
          />
          <ol className={styles.steps} role="list">
            {PILOT_JOURNEY.map((step, i) => (
              <li key={step.title}>
                <StepCard step={step} index={i} />
              </li>
            ))}
          </ol>
          <div className={styles.pilotNote}>
            <p>
              <strong>What a pilot is not.</strong> There is no connector, ingestion pipeline or
              self-service upload available on this website, and none is implied by the demo above.
              Starting a pilot means a conversation about what data exists and what question is worth
              asking — not switching on an integration.
            </p>
          </div>
          <div className={styles.pilotLinks}>
            <ButtonLink href="/partner/" variant="primary">
              Become a Pilot Partner
            </ButtonLink>
            <ButtonLink href="/platform/" variant="ghost">
              See the platform overview
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="trust-title">
        <div className="container">
          <SectionHeading
            id="trust-title"
            eyebrow="Founding pilot partners"
            title="No testimonials yet — so none are shown"
            lede="We would rather describe the method than borrow a quote."
          />
          <div className={styles.trust}>
            <div className={styles.trustBody}>
              <p>
                There are no customer testimonials on this site. Evmetrik has not published a customer
                outcome, a logo wall, a star rating or a case study, because none has been reviewed and
                approved for publication. Inventing one, or dressing a stock photo as a screenshot of
                this product, would tell you nothing true about what we do.
              </p>
              <p>
                What exists instead is an open invitation. We are looking for a small number of
                founding pilot partners — manufacturers, fleet operators and mobility businesses —
                willing to test one clearly scoped question against data they already hold.
              </p>
            </div>
            <div className={styles.trustPanel}>
              <h3>What a founding pilot partner gets</h3>
              <ul>
                <li>A scoped question, agreed in writing, with the data fields it requires.</li>
                <li>Access to the analytics built for that question, and an honest written readout.</li>
                <li>Data kept inside the agreed scope, exportable on request, removed on request.</li>
                <li>No automatic renewal and no lock-in at the end of the pilot.</li>
              </ul>
              <ButtonLink href="#contact" variant="primary" size="sm">
                Start a conversation
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
