import { component$ } from "@builder.io/qwik";
import type { IconProps } from "~/types/Icon";

export const ChevronRight = component$<IconProps>(({ class: _class = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-chevron-right ${_class}`}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
})