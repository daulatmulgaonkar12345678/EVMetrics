import styles from './ArchitectureDiagram.module.css';

const LAYERS = [
  {
    id: 'edge',
    title: 'Vehicle & edge layer',
    items: ['Vehicle controllers', 'Telematics units', 'Charging hardware', 'File / batch exports'],
  },
  {
    id: 'ingest',
    title: 'Authorized ingestion',
    items: ['Signed access scope', 'Field mapping', 'Gateway adapters', 'Replay & backfill'],
  },
  {
    id: 'core',
    title: 'Tenant-isolated data platform',
    items: ['Per-tenant storage & keys', 'Time-series store', 'Quality & schema checks', 'Retention & audit log'],
  },
  {
    id: 'metrics',
    title: 'Metric & report layer',
    items: ['Energy & charging metrics', 'Running-cost model', 'Service-event taxonomy', 'Derived vs estimated flags'],
  },
  {
    id: 'apps',
    title: 'Applications',
    items: ['Brand dashboards', 'Scheduled reports', 'Anomaly review queue', 'Metric exports to your BI'],
  },
] as const;

export function ArchitectureDiagram() {
  return (
    <figure className={styles.figure}>
      <div className={styles.stack} role="list" aria-label="Platform architecture layers, bottom to top: applications, metrics, tenant-isolated data platform, authorized ingestion, vehicle and edge layer.">
        {LAYERS.map((layer) => (
          <div className={styles.layer} key={layer.id} role="listitem">
            <div className={styles.layerTitle}>
              <span className={styles.layerDot} aria-hidden="true" />
              {layer.title}
            </div>
            <ul className={styles.items}>
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <figcaption className={styles.caption}>
        Logical view of the platform. A physical deployment diagram, per-connector
        protocol details and infrastructure sizing are provided during technical
        scoping, and are not shown here.
      </figcaption>
    </figure>
  );
}
