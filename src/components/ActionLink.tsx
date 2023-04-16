import { $, Slot, component$ } from "@builder.io/qwik";
import { HiCalendarDays, HiNoSymbol } from "@qwikest/icons/heroicons";

type Props = {
  href: string;
  disabled?: boolean
}
export const ActionLink = component$(({ href, disabled }: Props) => {
  const onClick = $(() => window.open(href, "_blank", "noopener noreferrer"))
  return (
    <button
      class="
        border-2 border-black rounded-md inline-flex flex-nowrap items-center gap-2 uppercase py-2 px-4 group
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
        ? <HiNoSymbol variant="mini" class="scale-110 group-hover:enabled:scale-150 transition-transform" />
        : <HiCalendarDays class="scale-110 group-hover:enabled:scale-150 transition-transform" />
      }
      <Slot />
    </button>
  )
})