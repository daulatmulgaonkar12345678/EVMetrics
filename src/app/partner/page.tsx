import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { StepCard } from '@/components/StepCard';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ContactSection } from '@/components/ContactSection';
import { ButtonLink } from '@/components/Button';
import { FAQS } from '@/data/faqs';
import { PILOT_STEPS } from '@/data/process';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Partner With Us — pilot process, FAQ and contact',
  description:
    'How a pilot with Evmetrik works: scoping, authorization, sandbox integration, dashboard configuration and a pilot review. Plus answers to common questions and a contact form.',
};

const YOU_PROVIDE = [
  'A named technical owner who can answer field-level questions about your controller and firmware.',
  'A small vehicle set, or a historical telemetry export, for the sandbox phase.',
  'Written authorization for the specific fields and vehicles in scope.',
  'Your own engineering judgement on anything the platform flags — we do not replace it.',
];

const WE_PROVIDE = [
  'A sandbox workspace configured to your models, variants and metric definitions.',
  'Written documentation for every metric, including how it is derived.',
  'A structured pilot review that separates supported findings from thin ones.',
  'A data export and written deletion confirmation if you decide to stop.',
];

export default function PartnerPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <p className="eyebrow">Partner with us</p>
          <h1>Start with one model, one data export, one question</h1>
          <p className="lede">
            Evmetrik is onboarding a small number of pilot partners as the platform is built. A
            pilot is scoped, written, reversible and honest about what the data can and
            cannot tell you.
          </p>
          <div className="btnRow" style={{ marginTop: '1.6rem' }}>
            <ButtonLink href="#contact">Request a Pilot</ButtonLink>
            <ButtonLink href="#faq" variant="ghost">
              Read the FAQ
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <SectionHeading
            id="process-title"
            eyebrow="Pilot process"
            title="How a pilot runs, step by step"
            lede="The sequence below is our proposed motion for a standard pilot. Timings are indicative and adjust to your launch calendar."
          />
          <ol className={styles.steps} role="list">
            {PILOT_STEPS.map((step, i) => (
              <li key={step.title}>
                <StepCard step={step} index={i} />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="prep-title">
        <div className="container">
          <SectionHeading
            id="prep-title"
            eyebrow="What each side brings"
            title="A pilot is a two-sided commitment"
          />
          <div className="grid grid--2">
            <article className="card cardAccent">
              <h3>What you bring</h3>
              <ul className={styles.list}>
                {YOU_PROVIDE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="card cardAccent">
              <h3>What we bring</h3>
              <ul className={styles.list}>
                {WE_PROVIDE.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading
            id="faq-title"
            eyebrow="Questions we get asked"
            title="Frequently asked questions"
            lede="Straight answers, including the ones that are not flattering."
          />
          <FaqAccordion faqs={FAQS} />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
