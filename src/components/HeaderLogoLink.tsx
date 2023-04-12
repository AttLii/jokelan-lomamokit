import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { translations } from "~/constants/translations";

export const HeaderLogoLink = component$(() => {
  return (
    <Link
      href="/"
      aria-label={translations.genericLogoLink}
      class="
        aspect-square w-10 border-2 overflow-hidden
        border-black rounded-md
        hover:rounded-none focus:rounded-none
        transition-all
      "
    >
      <img src="/logo.svg" loading="eager" width="40" height="40" alt="" />
    </Link>
  )
})