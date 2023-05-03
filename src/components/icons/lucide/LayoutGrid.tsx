import { component$ } from "@builder.io/qwik";
import type { IconProps } from "~/types/Icon";

export const LayoutGrid = component$<IconProps>(({ class: _class = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-layout-grid ${_class}`}>
      <rect width="7" height="7" x="3" y="3" />
      <rect width="7" height="7" x="14" y="3" />
      <rect width="7" height="7" x="14" y="14" />
      <rect width="7" height="7" x="3" y="14" />
    </svg>
  )
})