import { component$, useVisibleTask$ } from "@builder.io/qwik";

export const HCaptcha = component$(() => {
  useVisibleTask$(() => {
    if (document.querySelector(`#vanilla-hcaptcha`)) return;
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/vanilla-hcaptcha"
    script.id = "vanilla-hcaptcha"
    document.body.appendChild(script)
  })
  return (
    <h-captcha
      site-key={import.meta.env.VITE_HCAPTCHA_SITE_KEY + ""}
      size="normal"
      tabindex="0"
    />
  )
}) 