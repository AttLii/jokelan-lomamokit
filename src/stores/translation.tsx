import { createContextId, useContext } from "@builder.io/qwik";
import { z } from "zod";

export const translationsSchema = z.object({
  "nav.open": z.string(),
  "nav.close": z.string(),
  "sub.menu.toggle": z.string(),
  "seo.title": z.string(),
  "404.page.title": z.string(),
  "404.page.link": z.string(),
  "404.title": z.string(),
  "404.content": z.string(),
  "404.description": z.string(),
  "generic.read.more": z.string(),
  "generic.form.submit": z.string(),
  "generic.form.privacy.policy": z.string(),
  "generic.logo.link": z.string(),
  "generic.skip.to.content": z.string(),
  "generic.meter.squared": z.string(),
  "generic.back.to.top": z.string(),
  "contact.form.name": z.string(),
  "contact.form.email": z.string(),
  "contact.form.phonenumber": z.string(),
  "contact.form.message": z.string(),
  "contact.form.submit.success": z.string(),
  "contact.form.submit.client.error": z.string(),
  "contact.form.submit.server.error": z.string(),
  "cabin.map.location": z.string(),
  "cabin.action.link.text": z.string(),
  "cabin.action.link.disabled.help": z.string(),
  "cabin.pets.allowed": z.string(),
  "cabin.pets.not.allowed": z.string(),
  "cabin.number.of.rooms": z.string(),
  "cabin.number.of.bedrooms": z.string(),
  "cabin.year.built": z.string(),
  "cabin.smoking.allowed": z.string(),
  "cabin.smoking.not.allowed": z.string(),
  "cabin.occupancy": z.string(),
  "aria.label.breadcrumbs": z.string(),
  "cabin.gallery.go.to": z.string(),
  "cabin.information.title": z.string(),
  "cabin.location.title": z.string(),
  "cabin.reviews.average": z.string(),
  "cabin.reviews.count": z.string(),
  "cabin.review.recommendation": z.string()
});


export type TranslationStore = z.infer<typeof translationsSchema>
export const translationContext = createContextId<TranslationStore>("translations");
export type TranslationKey = keyof TranslationStore
export const t = (id: TranslationKey) => {
  const context = useContext(translationContext)
  return context[id] ?? id
}