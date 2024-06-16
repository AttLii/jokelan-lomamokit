'use client';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import useUiStore from '../stores/ui';

type Props = PropsWithChildren & {
  title: string;
};
export default function MobileMenuNav({ children, title }: Props) {
  const navOpen = useUiStore((state) => state.navOpen);
  const closeNav = useUiStore((state) => state.closeNav);
  const { backdrop, menuLeft } = useMemo(() => {
    if (navOpen) {
      return {
        backdrop: 'right-0 opacity-30',
        menuLeft: 'right-0',
      };
    } else {
      return {
        backdrop: '-right-full opacity-0',
        menuLeft: '-right-full',
      };
    }
  }, [navOpen]);

  const onClick = () => closeNav;
  return (
    <>
      <div
        onClick={onClick}
        className={`fixed top-[3.5rem] block h-[calc(100%-3.5rem)] w-screen cursor-pointer bg-black transition-opacity duration-500 sm:hidden ${backdrop}`}
      />
      <nav
        aria-label={title}
        className={`fixed top-[3.5rem] mx-auto block h-[calc(100%-3.5rem)] w-full border-l-2 border-black bg-slate-100 px-4 py-4 transition-all duration-500 sm:hidden ${menuLeft}`}
      >
        {children}
      </nav>
    </>
  );
}
