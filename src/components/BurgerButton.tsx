import { useContext, component$ } from "@builder.io/qwik";
import { translations } from "~/constants/translations";
import { UiContext } from "~/root";

type Props = {
  _class?: string;
}
export const BurgerButton = component$(({ _class }: Props) => {
  const ui = useContext(UiContext);
  const openClassFirst = ui.nav ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0"
  const openClassMiddle = ui.nav ? "opacity-0" : "opacity-100"
  const openClassLast = ui.nav ? " top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0 translate-y-0"
  const label = ui.nav ? translations.uiNavClose : translations.uiNavOpen
  return (
    <button onClick$={() => ui.nav = !ui.nav} aria-label={label} class={`${_class} relative w-4 h-3 my-1.5`}>
      <div class={`absolute left-0 w-full bg-slate-600 h-0.5 transition-all ${openClassFirst}`} />
      <div class={`absolute top-1/2 -translate-y-1/2 left-0 w-full bg-slate-600 h-0.5 transition-all ${openClassMiddle}`} />
      <div class={`absolute left-0 w-full bg-slate-600 h-0.5 transition-all ${openClassLast}`} />
    </button>
  )
})