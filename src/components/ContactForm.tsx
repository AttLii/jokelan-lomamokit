import type { QwikSubmitEvent } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import { Input } from "./Input";
import { translations } from "~/constants/translations";
import { Textarea } from "./Textarea";
import { RichText } from "./RichText";

export const ContactForm = component$(() => {
  const submitting = useSignal(false)
  const message = useSignal("")
  const onSubmit = $(async (_: QwikSubmitEvent<HTMLFormElement>, form: HTMLFormElement) => {
    submitting.value = true;
    message.value = ""

    const formData = new FormData(form)

    const { status } = await fetch((import.meta.env.VITE_ENDPOINT_ORIGIN || "") + "/api/contact-form", {
      body: JSON.stringify(Object.fromEntries(formData)),
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })

    if (status === 201) {
      message.value = translations.contactFormSubmitSuccess
      form.reset()
    } else if (status === 404 || status >= 500 && status < 600) {
      message.value = translations.contactFormSubmitServerError
    } else if (status >= 400 && status < 500) {
      message.value = translations.contactFormSubmitClientError
    }

    submitting.value = false
  })
  return (
    <form preventdefault:submit onSubmit$={onSubmit} class="flex flex-col gap-2 p-4 border-black border-2 rounded-md">
      <Input type="text" name="name" required placeholder={translations.contactFormName} disabled={submitting.value} />
      <Input type="email" name="email" required placeholder={translations.contactFormEmail} disabled={submitting.value} />
      <Input type="tel" name="tel" placeholder={translations.contactFormPhonenumber} disabled={submitting.value} />
      <Textarea name="message" required placeholder={translations.contactFormMessage} disabled={submitting.value} />
      <RichText _class="mt-4" dangerouslySetInnerHTML={translations.genericFormPrivacyPolicy} />
      <input class="enabled:cursor-pointer color-black disabled:text-slate-500 disabled:cursor-default mt-4 bg-slate-300 p-2 border-black disabled:border-slate-500 border-2 hover:enabled:bg-slate-400 focus:enabled:bg-slate-400" type="submit" value={translations.genericFormSubmit} disabled={submitting.value} />
      {(message.value !== "") && <p class="font-bold">{message}</p>}
    </form>
  )
})