import type { PropsWithChildren } from "react";
import { Calendar, CalendarOff } from "./icons/lucide";

type Props = PropsWithChildren & {
  href: string;
}
export default function ActionLink({ href, children }: Props) {
  return (
    <a
      className="
        font-sans border-2 border-black rounded-md inline-flex flex-nowrap items-center gap-2 uppercase py-2 px-4
        bg-red-400 scale-100
        empty-href:pointer-events-none empty-href:bg-slate-300
        hover:scale-105 hover:bg-red-500
        focus:scale-105 focus:bg-red-500
        transition-all
      "
      rel="noopener noreferrer nofollow"
      target="blank"
      href={href}
    >
      {href === "" ? <CalendarOff /> : <Calendar />}
      {children}
    </a>
  );
}