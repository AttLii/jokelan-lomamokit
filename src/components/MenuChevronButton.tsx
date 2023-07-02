"use client";

import useT from "../hooks/useT";
import { ChevronDown } from "./icons/lucide";

type Props = {
  className?: string;
  iconClassName?: string;
}
export default function MenuChevronButton({ className = "", iconClassName = "" }: Props) {
  const label = useT('sub.menu.toggle');
  return (
    <button tabIndex={-1} aria-hidden="true" className={`${className} aspect-square`} aria-label={label}>
      <ChevronDown className={`${iconClassName} h-6 w-6`} />
    </button>
  );
}