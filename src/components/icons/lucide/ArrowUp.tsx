import { component$ } from "@builder.io/qwik";
import type { IconProps } from "~/types/Icon";

export const ArrowUp = component$<IconProps>(({ class: _class = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-arrow-up ${_class}`}>
      <line x1="12" x2="12" y1="19" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  )
})