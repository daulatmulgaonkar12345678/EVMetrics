import { SectionHeading } from './SectionHeading';
import { DATA_SOURCES, METRIC_SCOPE } from '@/data/audiences';
import styles from './DataIntegrations.module.css';

export function DataIntegrations({ id = 'integrations' }: { id?: string }) {
  return (
    <section className="section section--alt" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          id={`${id}-title`}
          eyebrow="Integrations and compatibility"
          title="Manufacturer-independent by design"
          lede="Evmetrik is designed to sit over several authorised sources rather than depending on one manufacturer or one data provider. Data does not have to pass through an OEM database first: where a supported vehicle or an approved telematics device exposes the fields, that can be the source."
        />

        <div className={styles.sourceGrid}>
          {DATA_SOURCES.map((source) => (
            <article key={source.title} className="card cardAccent">
              <h3>{source.title}</h3>
              <p>{source.body}</p>
            </article>
          ))}
        </div>

        <h3 className={styles.tableTitle}>Unified data, vehicle-specific metrics</h3>
        <p className={styles.tableLede}>
          One experience does not mean every vehicle reports the same things. Evmetrik is designed to
          show the metrics a source supports and to mark the rest as unavailable — never as a zero
          reading and never as an estimate presented as a measurement.
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="visuallyHidden">
              Metrics available by drivetrain, and which metrics do not apply or are unavailable.
            </caption>
            <thead>
              <tr>
                <th scope="col">Drivetrain</th>
                <th scope="col">Metrics shown where the source supports them</th>
                <th scope="col">Not applicable or unavailable</th>
              </tr>
            </thead>
            <tbody>
              {METRIC_SCOPE.map((row) => (
                <tr key={row.drivetrain}>
                  <th scope="row">{row.drivetrain}</th>
                  <td>{row.metrics}</td>
                  <td className={styles.mutedCell}>{row.unavailable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.privacy}>
          <div>
            <h3>Separate workspaces, by construction</h3>
            <p>
              An individual account and a company workspace are intended to be distinct authorised
              spaces. The product requirement is that a vehicle is associated with its owner or its
              organisation, that organisation data is isolated, and that roles determine what a signed-in
              user can see or do.
            </p>
          </div>
          <ul>
            <li>Vehicle-to-owner and vehicle-to-organisation associations</li>
            <li>Organisation-level data isolation</li>
            <li>Role-based permissions for managers, operations and read-only users</li>
            <li>Consent and written authorisation for third-party vehicle data</li>
            <li>Integration credentials held server-side, never in the browser</li>
          </ul>
        </div>

        <p className={styles.statusNote}>
          <strong>Status.</strong> These are product requirements for a pre-launch platform, not a
          description of shipped authentication or tenancy features. Nothing on this page is a
          signed-in experience: the product demo runs entirely on fictional sample records.
        </p>
      </div>
    </section>
  );
}
