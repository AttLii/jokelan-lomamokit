import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { translations } from "~/constants/translations";

export const HeaderLogoLink = component$(() => {
  return (
    <Link
      href="/"
      aria-label={translations.genericLogoLink}
      class="flex items-center gap-2 uppercase font-semibold group"
    >
      <img src="/logo.svg" loading="eager" width="40" height="40" alt="" />
      <div class="flex flex-col leading-tight">
        <span class="group-hover:ml-1 group-focus:ml-1 transition-all">Jokelan</span>
        <span class="group-hover:ml-2 group-focus:ml-2 transition-all">Lomamökit</span>
      </div>
    </Link>
  )
})