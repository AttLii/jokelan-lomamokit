import type { LinkProps } from 'next/link';
import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import { ChevronRight } from './icons/lucide';

type Props = LinkProps & PropsWithChildren;
export default function IconLink({ children, ...rest }: Props) {
  return (
    <Link
      {...rest}
      className='color-black inline-flex flex-nowrap items-center gap-1 font-sans transition-all hover:gap-2 focus:gap-2'
    >
      {children}
      <ChevronRight className='h-4 w-4' />
    </Link>
  );
}
