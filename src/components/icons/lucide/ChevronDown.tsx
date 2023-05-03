import { component$ } from "@builder.io/qwik";
import type { IconProps } from "~/types/Icon";

export const ChevronDown = component$<IconProps>(({ class: _class = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-chevron-down ${_class}`}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
})