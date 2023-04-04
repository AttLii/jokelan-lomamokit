import { Slot, component$ } from "@builder.io/qwik";

export const Container = component$(() => {
  return <div class="max-w-7xl mx-auto px-2"><Slot /></div>
})