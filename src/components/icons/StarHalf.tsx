import { component$ } from "@builder.io/qwik";
import type { IconProps } from "~/types/Icon";

export const StarHalf = component$(({ class: _class = "" }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em" class={_class}>
      <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
    </svg>
  )
})