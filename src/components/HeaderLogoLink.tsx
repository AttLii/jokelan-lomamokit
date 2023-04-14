import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { translations } from "~/constants/translations";

export const HeaderLogoLink = component$(() => {
  return (
    <Link
      href="/"
      aria-label={translations.genericLogoLink}
      class="flex items-center gap-2 uppercase"
    >
      <img src="/logo.svg" loading="eager" width="40" height="40" alt="" />
      <div class="flex flex-col leading-tight">
        <span>Jokelan</span>
        <span>Lomamökit</span>
      </div>
    </Link>
  )
})