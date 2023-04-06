import type { QwikSubmitEvent } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import { Input } from "./Input";
import { translations } from "~/constants/translations";
import { Textarea } from "./Textarea";

export const ContactForm = component$(() => {
  const onSubmit = $((_: QwikSubmitEvent<HTMLFormElement>, form: HTMLFormElement) => {
    fetch("/api/contact-form", {
      body: new FormData(form),
      method: "post",
    })
  })
  return (
    <form preventdefault:submit onSubmit$={onSubmit} class="flex flex-col gap-2 p-4 border-black border-2 rounded-md">
      <Input type="text" name="name" required placeholder={translations.contactFormName} />
      <Input type="email" name="email" required placeholder={translations.contactFormEmail} />
      <Input type="tel" name="tel" placeholder={translations.contactFormPhonenumber} />
      <Textarea name="message" required placeholder={translations.contactFormMessage} />
      <input class="cursor-pointer mt-4 bg-slate-300 p-2 border-black border-2 hover:bg-slate-400 focus:bg-slate-400" type="submit" value={translations.genericFormSubmit} />
    </form>
  )
})