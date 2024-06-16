import type { PropsWithChildren } from 'react';

export default function Section({ children }: PropsWithChildren) {
  return <section className='py-10'>{children}</section>;
}
