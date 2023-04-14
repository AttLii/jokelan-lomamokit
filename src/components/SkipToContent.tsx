import { $, component$ } from "@builder.io/qwik";
import { translations } from "~/constants/translations";
import type { Signal } from "@builder.io/qwik";

type Props = {
  focusElement: Signal<HTMLElement | undefined>
}
export const SkipToContent = component$(({ focusElement }: Props) => {
  const onClick = $(() => {
    if (!focusElement.value) return
    focusElement.value.focus()
  })
  return (
    <button
      class="
        z-50 left-1/2 fixed -translate-x-1/2 -translate-y-full focus:translate-y-0
        transition duration-300
        color-black bg-slate-300 rounded-md p-2 border-black border-2
      "
      onClick$={onClick}
    >
      {translations.genericSkipToContent}
    </button>
  )
})