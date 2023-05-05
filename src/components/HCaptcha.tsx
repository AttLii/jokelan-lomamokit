import type { Signal } from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

type Props = {
  verified: Signal<boolean>
}
export const HCaptcha = component$<Props>(({ verified }) => {
  const ref = useSignal<HTMLDivElement>()
  useVisibleTask$(async () => {
    let script = document.querySelector<HTMLScriptElement>(`#vanilla-hcaptcha`)
    if (!script) {
      script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/vanilla-hcaptcha"
      script.id = "vanilla-hcaptcha"
      document.body.appendChild(script)
    }
  })

  useVisibleTask$(async ({ track }) => {
    track(ref)
    if (!ref.value) return

    ref.value.addEventListener('verified', () => verified.value = true)
    ref.value.addEventListener('error', () => verified.value = false)
  })

  return (
    <h-captcha
      ref={ref}
      site-key={import.meta.env.VITE_HCAPTCHA_SITE_KEY + ""}
      size="normal"
      tabindex="0"
    />
  )
}) 