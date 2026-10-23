import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { StepCard } from '@/components/StepCard';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ContactSection } from '@/components/ContactSection';
import { ProductPreview } from '@/components/ProductPreview';
import { ButtonLink } from '@/components/Button';
import { FAQS } from '@/data/faqs';
import { PILOT_JOURNEY } from '@/data/process';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Partner With Us — pilot process, FAQ and contact',
  description:
    'How a pilot with Evmetrik works: scoping, authorization, sandbox integration, dashboard configuration and a pilot review. Plus answers to common questions and a contact form.',
};

const USER_TYPES = [
  {
    title: 'Manufacturers and leadership',
    body:
      'Fleet-level visibility across models and variants: active vehicles, distance covered, energy per kilometre and service alerts in one view, to support investment and roadmap decisions.',
  },
  {
    title: 'Battery and engineering teams',
    body:
      'Battery state of health (SoH), temperature trends and degradation signals across the fleet, so engineers can spot cells that need attention before they become failures.',
  },
  {
    title: 'Service teams',
    body:
      'Open service alerts, fault types and recurring issues by model, helping prioritise workshop visits, parts and service actions to reduce unplanned downtime.',
  },
  {
    title: 'Fleet operations',
    body:
      'Charging behaviour, dwell time and usage patterns by vehicle, so operations can plan charging infrastructure, route assignments and vehicle rotation more effectively.',
  },
];

export default function PartnerPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Product preview</p>
              <h1>Turn EV data into clearer decisions.</h1>
              <p className={styles.lede}>
                Evmetrik helps electric two-wheeler manufacturers explore battery performance,
                vehicle usage, charging behaviour and operational trends through structured analytics.
              </p>
              <div className={styles.btnRow}>
                <ButtonLink href="#contact">Request a Pilot</ButtonLink>
                <ButtonLink href="/demo/" variant="ghost">
                  Explore Product Demo
                </ButtonLink>
              </div>
              <p className={styles.finePrint}>
                Pre-launch platform. Pilot scope, data access and available features will be agreed
                upon with each partner. All figures on this page are illustrative sample data.
              </p>
            </div>
            <div className={styles.heroVisual} aria-hidden="true">
              {renderHeroVisual()}
            </div>
          </div>
        </div>
      </section>

      <ProductPreview />

      <section className="section section--alt" id="user-types" aria-labelledby="user-types-title">
        <div className="container">
          <SectionHeading
            id="user-types-title"
            eyebrow="Value by team"
            title="What each team could learn from supported vehicle data"
            lede="Evmetrik turns telemetry into information your engineers, service teams and leadership can use — without rebuilding dashboards."
            align="left"
          />
          <div className={styles.userTypeGrid}>
            {USER_TYPES.map((u) => (
              <article key={u.title} className={styles.userTypeCard}>
                <h3>{u.title}</h3>
                <p>{u.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="founding-pilot" aria-labelledby="pilot-title">
        <div className="container">
          <SectionHeading
            id="pilot-title"
            eyebrow="Founding pilot"
            title="Start with one model, one data export, one question."
            lede="You do not need to commit to a long-term engagement to start a conversation. The first step is to identify one useful question and assess whether a focused pilot can answer it."
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
              <strong>Transparent and reversible scope.</strong> Everything in scope — the data,
              the fields, the vehicles, the deliverables and the boundaries — is agreed in writing
              before anything is connected. You can stop at any point, take your data with you, and
              receive written confirmation when it has been removed from the platform.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="trust" aria-labelledby="trust-title">
        <div className="container">
          <SectionHeading
            id="trust-title"
            eyebrow="Trust and data access"
            title="Questions about data, permissions and pilot scope"
            lede="Straight answers, including the ones that are not flattering."
          />
          <FaqAccordion faqs={FAQS} />
          <div className={styles.trustNotice}>
            <p>
              <strong>Pre-launch status.</strong> Evmetrik is currently in its pre-launch phase.
              Product capabilities, data compatibility and pilot deliverables are subject to
              confirmation. No integration is connected to live vehicles unless authorized in
              writing during scoping.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="sample-dashboard" aria-labelledby="sample-title">
        <div className="container">
          <SectionHeading
            id="sample-title"
            eyebrow="Sample dashboard"
            title="Explore a sample dashboard"
            lede="The interactive demo has its own page. It shows fleet overview, energy and fuel, battery and charging, performance and alerts views, all built from fictional sample data."
            align="center"
          />
          <p className={styles.sampleIntro}>
            Use the demo to assess layout and metric definitions before agreeing a pilot scope. You can
            switch views, change the time range and inspect individual sample vehicles. Nothing on that
            page is connected to a live vehicle, and no figure on it is a measured result.
          </p>
          <div className={styles.btnRow}>
            <ButtonLink href="/demo/">Open the product demo</ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Request a Pilot
            </ButtonLink>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );

  function renderHeroVisual() {
    return (
      <svg className={styles.heroSvg} viewBox="0 0 420 260" role="img" aria-label="Illustrative dashboard mockup">
        <defs>
          <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.94)" />
            <stop offset="100%" stopColor="rgba(240,244,248,0.98)" />
          </linearGradient>
          <linearGradient id="chipGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#35d0e6" />
            <stop offset="100%" stopColor="#1c9fb9" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#35d0e6" />
            <stop offset="100%" stopColor="#7ce38b" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="420" height="260" rx="16" fill="url(#panelGrad)" stroke="rgba(148,180,214,0.25)" />
        <rect x="18" y="18" width="140" height="34" rx="8" fill="#060b14" />
        <rect x="176" y="20" width="24" height="8" rx="4" fill="#eaf1fb" opacity="0.9" />
        <rect x="208" y="20" width="16" height="8" rx="4" fill="#a9bdd6" opacity="0.6" />
        <rect x="18" y="70" width="104" height="56" rx="8" fill="#ffffff" />
        <rect x="136" y="70" width="104" height="56" rx="8" fill="#ffffff" />
        <rect x="254" y="70" width="148" height="56" rx="8" fill="#ffffff" />
        <rect x="18" y="142" width="192" height="98" rx="8" fill="#ffffff" />
        <rect x="224" y="142" width="178" height="98" rx="8" fill="#ffffff" />
        <text x="30" y="94" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="#0b1320">1,248</text>
        <text x="30" y="110" fontFamily="var(--font-mono)" fontSize="9" fill="#7e93ae">Vehicles (sample)</text>
        <text x="148" y="94" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="#0b1320">92%</text>
        <text x="148" y="110" fontFamily="var(--font-mono)" fontSize="9" fill="#7e93ae">Avg. battery health</text>
        <text x="266" y="94" fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="#0b1320">78 km</text>
        <text x="266" y="110" fontFamily="var(--font-mono)" fontSize="9" fill="#7e93ae">Avg. daily ride</text>
        <polyline points="30,218 60,208 90,222 120,198 150,212 185,202" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="30" y="234" fontFamily="var(--font-mono)" fontSize="9" fill="#a9bdda">Jan</text>
        <text x="185" y="234" fontFamily="var(--font-mono)" fontSize="9" fill="#a9bdda">Jun</text>
        <rect x="236" y="156" width="16" height="56" rx="2" fill="url(#chipGrad)" />
        <rect x="260" y="156" width="16" height="42" rx="2" fill="#7ce38b" opacity="0.85" />
        <rect x="284" y="156" width="16" height="28" rx="2" fill="#35d0e6" opacity="0.85" />
        <text x="244" y="226" fontFamily="var(--font-mono)" fontSize="8" fill="#7e93ae">Home</text>
        <text x="268" y="226" fontFamily="var(--font-mono)" fontSize="8" fill="#7e93ae">Work</text>
        <text x="292" y="226" fontFamily="var(--font-mono)" fontSize="8" fill="#7e93ae">Public</text>
        <text x="236" y="140" fontFamily="var(--font-sans)" fontSize="10" fontWeight="600" fill="#0b1320">Charge sessions</text>
      </svg>
    );
  }
}
