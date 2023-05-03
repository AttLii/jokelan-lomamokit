import { $, component$ } from "@builder.io/qwik";
import { t } from "~/stores/translation";
import { ArrowUp } from "./icons/ArrowUp";

type Props = {
  class?: string;
}
export const BackToTopButton = component$(({ class: _class = "" }: Props) => {
  const onClick = $(() => window.scrollTo({
    behavior: "smooth",
    top: 0
  }))
  return (
    <button
      class={`${_class} aspect-square w-10 rounded-full border-2 border-black`}
      onClick$={onClick}
      aria-label={t('generic.back.to.top')}
    >
      <ArrowUp class="w-7 h-7 m-auto " />
    </button>
  )
})