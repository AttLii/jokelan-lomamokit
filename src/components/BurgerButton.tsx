import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";

type Props = {
  open: Signal<boolean>;
  _class?: string;
}
export const BurgerButton = component$(({ _class, open }: Props) => {
  const openClassFirst = open.value ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0 translate-y-0"
  const openClassMiddle = open.value ? "opacity-0" : "opacity-100"
  const openClassLast = open.value ? " top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0 translate-y-0"
  return (
    <button onClick$={() => open.value = !open.value} aria-label="Avaa" class={`${_class} relative w-4 h-3 my-1.5`}>
      <div class={`absolute left-0 w-full bg-slate-600 h-0.5 transition-all ${openClassFirst}`} />
      <div class={`absolute top-1/2 -translate-y-1/2 left-0 w-full bg-slate-600 h-0.5 transition-all ${openClassMiddle}`} />
      <div class={`absolute left-0 w-full bg-slate-600 h-0.5 transition-all ${openClassLast}`} />
    </button>
  )
})