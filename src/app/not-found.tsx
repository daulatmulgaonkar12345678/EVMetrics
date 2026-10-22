import Link from 'next/link';
import { ButtonLink } from '@/components/Button';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>That page has moved or never existed</h1>
        <p className="lede">
          Try one of the three pages below, or go back to the home page.
        </p>
        <div className="btnRow" style={{ marginTop: '1.5rem' }}>
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/platform/" variant="ghost">Platform</ButtonLink>
          <ButtonLink href="/partner/" variant="ghost">Partner With Us</ButtonLink>
        </div>
        <p style={{ marginTop: '1.5rem' }}>
          <Link href="/">Return home</Link>
        </p>
      </div>
    </section>
  );
}
