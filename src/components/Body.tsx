'use client';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import useUiStore from '../stores/ui';

type Props = PropsWithChildren & {
  className?: string;
};
export default function Body({ children, className = '' }: Props) {
  const navOpen = useUiStore((state) => state.navOpen);
  useEffect(() => {
    const scrollLockClasses = ['overflow-hidden', 'sm:overflow-auto'];
    navOpen
      ? document.body.classList.add(...scrollLockClasses)
      : document.body.classList.remove(...scrollLockClasses);
  }, [navOpen]);

  return <body className={className}>{children}</body>;
}
