import { Slot, component$ } from "@builder.io/qwik";

export type Props = {
  type: "wide" | "narrow",
  _class?: string
}

export const Container = component$(({ type, _class = "" }: Props) => {
  const maxWidth = type === "wide" ? "max-w-7xl" : "max-w-xl"
  return <div class={`mx-auto px-4 ${maxWidth} ${_class}`}><Slot /></div>
})