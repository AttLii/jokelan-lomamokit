import { $, Slot, component$ } from "@builder.io/qwik";
import { LuCalendar, LuCalendarOff } from "@qwikest/icons/lucide";

type Props = {
  href: string;
  disabled?: boolean
}
export const ActionLink = component$(({ href, disabled }: Props) => {
  const onClick = $(() => window.open(href, "_blank", "noopener noreferrer"))
  return (
    <button
      class="
        border-2 border-black rounded-md inline-flex flex-nowrap items-center gap-2 uppercase py-2 px-4
        bg-red-400 scale-100
        disabled:cursor-not-allowed disabled:bg-slate-300
        hover:enabled:scale-105 hover:enabled:bg-red-500
        focus:enabled:scale-105 focus:enabled:bg-red-500
        transition-all
      "
      onClick$={onClick}
      disabled={disabled}
    >
      {disabled
        ? <LuCalendarOff />
        : <LuCalendar />
      }
      <Slot />
    </button>
  )
})