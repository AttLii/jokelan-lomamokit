'use client';

import Link from 'next/link';
import Container from '../components/Container';
import Section from '../components/Section';

/**
 * The Component is required for not-found.tsx to work.
 */
export default function Error() {
  return (
    <Section>
      <Container type='wide' className='rich-text text-center'>
        <h1>Everything is broken</h1>
        <Link href='/'>Go to homepage and hope for the best!</Link>
      </Container>
    </Section>
  );
}
