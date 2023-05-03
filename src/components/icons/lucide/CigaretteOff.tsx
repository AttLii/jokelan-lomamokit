import { component$ } from "@builder.io/qwik";
import type { IconProps } from "~/types/Icon";

export const CigaretteOff = component$<IconProps>(({ class: _class = "" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-cigarette-off ${_class}`}>
      <line x1="2" x2="22" y1="2" y2="22" />
      <path d="M12 12H2v4h14" />
      <path d="M22 12v4" />
      <path d="M18 12h-.5" />
      <path d="M7 12v4" />
      <path d="M18 8c0-2.5-2-2.5-2-5" />
      <path d="M22 8c0-2.5-2-2.5-2-5" />
    </svg>
  )
})