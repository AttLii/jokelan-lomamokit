import type { QwikSubmitEvent } from "@builder.io/qwik";
import { useSignal } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import { Input } from "./Input";
import { translations } from "~/constants/translations";
import { Textarea } from "./Textarea";

export const ContactForm = component$(() => {
  const submitting = useSignal(false)
  const onSubmit = $((_: QwikSubmitEvent<HTMLFormElement>, form: HTMLFormElement) => {
    submitting.value = true;
    fetch("/api/contact-form", {
      body: new FormData(form),
      method: "post",
    })
      .finally(() => {
        form.reset()
        submitting.value = false;
      })
  })
  return (
    <form preventdefault:submit onSubmit$={onSubmit} class="flex flex-col gap-2 p-4 border-black border-2 rounded-md">
      <Input type="text" name="name" required placeholder={translations.contactFormName} disabled={submitting.value} />
      <Input type="email" name="email" required placeholder={translations.contactFormEmail} disabled={submitting.value} />
      <Input type="tel" name="tel" placeholder={translations.contactFormPhonenumber} disabled={submitting.value} />
      <Textarea name="message" required placeholder={translations.contactFormMessage} disabled={submitting.value} />
      <input class="cursor-pointer color-black disabled:text-slate-500 disabled:cursor-default mt-4 bg-slate-300 p-2 border-black disabled:border-slate-500 border-2 hover:enabled:bg-slate-400 focus:enabled:bg-slate-400" type="submit" value={translations.genericFormSubmit} disabled={submitting.value} />
    </form>
  )
})