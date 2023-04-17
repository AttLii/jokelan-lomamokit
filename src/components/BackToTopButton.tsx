import { $, component$ } from "@builder.io/qwik";
import { LuArrowUp } from "@qwikest/icons/lucide";
import { translations } from "~/constants/translations";

type Props = {
  _class: string;
}
export const BackToTopButton = component$(({ _class }: Props) => {
  const onClick = $(() => window.scrollTo({
    behavior: "smooth",
    top: 0
  }))
  return (
    <button
      class={`${_class} aspect-square w-10 rounded-full border-2 border-black`}
      onClick$={onClick}
      aria-label={translations.backToTop}
    >
      <LuArrowUp class="w-7 h-7 m-auto " />
    </button>
  )
})