import { component$ } from "@builder.io/qwik";
import { Input } from "./Input";
import { translations } from "~/constants/translations";
import { Textarea } from "./Textarea";

export const ContactForm = component$(() => {
  return (
    <form class="flex flex-col gap-2 p-4 border-black border-2 rounded-md">
      <Input type="text" required placeholder={translations.contactFormName} />
      <Input type="email" required placeholder={translations.contactFormEmail} />
      <Input type="tel" placeholder={translations.contactFormPhonenumber} />
      <Textarea required placeholder={translations.contactFormMessage} />
      <input class="cursor-pointer mt-4 bg-slate-300 p-2 border-black border-2 hover:bg-slate-400 focus:bg-slate-400" type="submit" value={translations.genericFormSubmit} />
    </form>
  )
})