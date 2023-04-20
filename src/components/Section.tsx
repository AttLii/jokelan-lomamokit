import { Slot, component$ } from "@builder.io/qwik"

export const Section = component$(() => {
  return (
    <section class="py-10">
      <Slot />
    </section>
  )
})