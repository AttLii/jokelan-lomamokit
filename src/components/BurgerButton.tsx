"use client";
import { useMemo } from "react";
import useT from "../hooks/useT";
import useUiStore from "../stores/ui";

export default function BurgerButton() {
  const navOpen = useUiStore(state => state.navOpen);
  const toggleNav = useUiStore(state => state.toggleNavOpen);

  const openLabel = useT('nav.open');
  const closeLabel = useT('nav.close');

  const { openClassFirst, openClassMiddle, openClassLast, label } = useMemo(() => {
    if (navOpen) {
      return {
        openClassFirst: "top-1/2 -translate-y-1/2 rotate-45",
        openClassMiddle: "opacity-0",
        openClassLast: "top-1/2 -translate-y-1/2 -rotate-45",
        label: closeLabel
      };
    } else {
      return {
        openClassFirst: "top-0 translate-y-0",
        openClassMiddle: "opacity-100",
        openClassLast: "bottom-0 translate-y-0",
        label: openLabel
      };
    }
  }, [navOpen, closeLabel, openLabel]);

  const onClick = () => toggleNav();

  return (
    <button onClick={onClick} aria-label={label} className={`block sm:hidden ml-auto my-auto relative w-5 h-4`}>
      <span className={`absolute left-0 w-full bg-black h-0.5 transition-all ${openClassFirst}`} />
      <span className={`absolute top-1/2 -translate-y-1/2 left-0 w-full bg-black h-0.5 transition-all ${openClassMiddle}`} />
      <span className={`absolute left-0 w-full bg-black h-0.5 transition-all ${openClassLast}`} />
    </button>
  );
}