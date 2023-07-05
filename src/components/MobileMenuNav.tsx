"use client";
import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import useUiStore from "../stores/ui";

type Props = PropsWithChildren & {
  title: string;
}
export default function MobileMenuNav({ children, title }: Props) {
  const navOpen = useUiStore(state => state.navOpen);
  const toggleNavOpen = useUiStore(state => state.toggleNavOpen);
  const { backdrop, menuLeft } = useMemo(() => {
    if (navOpen) {
      return {
        backdrop: "right-0 opacity-30",
        menuLeft: "right-0"
      };
    } else {
      return {
        backdrop: "-right-full opacity-0",
        menuLeft: "-right-full"
      };
    }
  }, [navOpen]);

  const onClick = () => toggleNavOpen;
  return (
    <>
      <div onClick={onClick} className={`sm:hidden block cursor-pointer fixed top-[3.5rem] h-[calc(100%-3.5rem)] w-screen bg-black transition-opacity duration-500 ${backdrop}`} />
      <nav aria-label={title} className={`block sm:hidden border-l-2 border-black fixed top-[3.5rem] w-full h-[calc(100%-3.5rem)] bg-slate-100 mx-auto py-4 transition-all duration-500 px-4 ${menuLeft}`}>
        {children}
      </nav>
    </>
  );
}