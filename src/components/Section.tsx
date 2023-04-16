import { Slot, component$ } from "@builder.io/qwik"

export const Section = component$(() => {
  return (
    <section class="py-10 bg-[#f7f7f7]">
      <Slot />
    </section>
  )
})