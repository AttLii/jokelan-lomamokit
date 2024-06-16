'use client';
import { useMemo } from 'react';
import useT from '../hooks/useT';
import useUiStore from '../stores/ui';

export default function BurgerButton() {
  const navOpen = useUiStore((state) => state.navOpen);
  const toggleNav = useUiStore((state) => state.toggleNavOpen);

  const openLabel = useT('nav.open');
  const closeLabel = useT('nav.close');

  const { openClassFirst, openClassMiddle, openClassLast, label } =
    useMemo(() => {
      if (navOpen) {
        return {
          openClassFirst: 'top-1/2 -translate-y-1/2 rotate-45',
          openClassMiddle: 'opacity-0',
          openClassLast: 'top-1/2 -translate-y-1/2 -rotate-45',
          label: closeLabel,
        };
      } else {
        return {
          openClassFirst: 'top-0 translate-y-0',
          openClassMiddle: 'opacity-100',
          openClassLast: 'bottom-0 translate-y-0',
          label: openLabel,
        };
      }
    }, [navOpen, closeLabel, openLabel]);

  const onClick = () => toggleNav();

  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative my-auto ml-auto block h-4 w-5 sm:hidden`}
    >
      <span
        className={`absolute left-0 h-0.5 w-full bg-black transition-all ${openClassFirst}`}
      />
      <span
        className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-black transition-all ${openClassMiddle}`}
      />
      <span
        className={`absolute left-0 h-0.5 w-full bg-black transition-all ${openClassLast}`}
      />
    </button>
  );
}
