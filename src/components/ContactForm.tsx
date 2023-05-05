import { useSignal } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { RichText } from "./RichText";
import { HCaptcha } from "./HCaptcha";
import { t } from "~/stores/translation";
import type { QwikSubmitEvent } from "@builder.io/qwik";

export const ContactForm = component$(() => {
  const successMessage = t('contact.form.submit.success')
  const serverErrorMessage = t('contact.form.submit.server.error')
  const clientErrorMessage = t('contact.form.submit.client.error')

  const submitting = useSignal(false)
  const message = useSignal("")
  const useSubmit = $(async (_: QwikSubmitEvent<HTMLFormElement>, form: HTMLFormElement) => {
    submitting.value = true;
    message.value = ""
    const formData = new FormData(form)

    try {
      const { status } = await fetch((import.meta.env.VITE_ENDPOINT_ORIGIN || "") + "/api/contact-form", {
        body: JSON.stringify(Object.fromEntries(formData)),
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      console.log(status, clientErrorMessage)

      if (status === 201) {
        message.value = successMessage
        form.reset()
      } else if (status === 404 || status >= 500 && status < 600) {
        message.value = serverErrorMessage
      } else if (status >= 400 && status < 500) {
        message.value = clientErrorMessage
      }
    } catch (e) {
      console.log(e)
      // error if endpoint is not setup properly
      message.value = serverErrorMessage
    } finally {
      submitting.value = false
    }
  })

  return (
    <form preventdefault:submit onSubmit$={useSubmit} class="flex flex-col gap-4 p-4 bg-slate-100 border-black border-2 rounded-md">
      <Input type="text" name="name" required label={t('contact.form.name')} disabled={submitting.value} />
      <Input type="email" name="email" required label={t('contact.form.email')} disabled={submitting.value} />
      <Input type="tel" name="tel" label={t('contact.form.phonenumber')} disabled={submitting.value} />
      <Textarea name="message" required label={t('contact.form.message')} disabled={submitting.value} />
      <RichText dangerouslySetInnerHTML={t('generic.form.privacy.policy')} />
      <HCaptcha />
      <input class="enabled:cursor-pointer color-black disabled:text-slate-500 disabled:cursor-default mt-4 bg-slate-300 p-2 border-black disabled:border-slate-500 border-2 hover:enabled:bg-slate-400 focus:enabled:bg-slate-400" type="submit" value={t('generic.form.submit')} disabled={submitting.value} />
      {(message.value !== "") && <p class="font-bold">{message}</p>}
    </form>
  )
})