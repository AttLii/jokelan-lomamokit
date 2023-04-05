import { Slot, component$ } from "@builder.io/qwik";

export type Props = {
  type: "wide" | "narrow"
}

export const Container = component$(({ type }: Props) => {
  const maxWidth = type === "wide" ? "max-w-7xl" : "max-w-xl"
  return <div class={`mx-auto px-2 ${maxWidth}`}><Slot /></div>
})