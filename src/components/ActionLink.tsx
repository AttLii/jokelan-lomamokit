import { FC, PropsWithChildren } from "react";
import { Calendar, CalendarOff } from "./icons/lucide";

type Props = PropsWithChildren & {
  href: string;
  disabled?: boolean
}
export const ActionLink: FC<Props> = ({ href, disabled, children }) => {
  const onClick = () => window.open(href, "_blank", "noopener noreferrer")
  return (
    <button
      className="
        border-2 border-black rounded-md inline-flex flex-nowrap items-center gap-2 uppercase py-2 px-4
        bg-red-400 scale-100
        disabled:cursor-not-allowed disabled:bg-slate-300
        hover:enabled:scale-105 hover:enabled:bg-red-500
        focus:enabled:scale-105 focus:enabled:bg-red-500
        transition-all
      "
      onClick={onClick}
      disabled={disabled}
    >
      {disabled
        ? <CalendarOff />
        : <Calendar />
      }
      {children}
    </button>
  )
}

