"use client";
import type { ReactNode } from "react";
import { useMemo } from "react";
import useUi from "../hooks/useUi";

type Props = {
  children: ReactNode;
  title: string;
}
export default function MobileMenuNav({ children, title }: Props) {
  const ui = useUi();
  const { backdrop, menuLeft } = useMemo(() => {
    if (ui.state.navOpen) {
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
  }, [ui.state.navOpen]);

  const onClick = () => ui.dispatch({ type: "NAV_CLOSE" });
  return (
    <>
      <div onClick={onClick} className={`sm:hidden block cursor-pointer fixed top-[3.5rem] h-[calc(100%-3.5rem)] w-screen bg-black transition-opacity duration-500 ${backdrop}`} />
      <nav aria-label={title} className={`block sm:hidden border-l-2 border-black fixed top-[3.5rem] w-full h-[calc(100%-3.5rem)] bg-slate-100 mx-auto py-4 transition-all duration-500 px-4 ${menuLeft}`}>
        {children}
      </nav>
    </>
  );
}