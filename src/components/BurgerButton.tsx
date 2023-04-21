import { useContext, component$ } from "@builder.io/qwik";
import { UiContext } from "~/root";
import { t } from "~/stores/translation";

type Props = {
  class?: string;
}
export const BurgerButton = component$(({ class: _class = "" }: Props) => {
  const ui = useContext(UiContext);
  const openClassFirst = ui.nav ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0";
  const openClassMiddle = ui.nav ? "opacity-0" : "opacity-100";
  const openClassLast = ui.nav ? " top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0 translate-y-0";
  const label = ui.nav ? t('nav.close') : t('nav.open');
  return (
    <button onClick$={() => ui.nav = !ui.nav} aria-label={label} class={`${_class} relative w-5 h-4 my-1.5`}>
      <span class={`absolute left-0 w-full bg-black h-0.5 transition-all ${openClassFirst}`} />
      <span class={`absolute top-1/2 -translate-y-1/2 left-0 w-full bg-black h-0.5 transition-all ${openClassMiddle}`} />
      <span class={`absolute left-0 w-full bg-black h-0.5 transition-all ${openClassLast}`} />
    </button>
  )
})