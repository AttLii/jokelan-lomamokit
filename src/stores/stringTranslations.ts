import z from 'zod';
import { create } from 'zustand';
import stringTranslations from '../prevals/stringTranslations.preval';

export const stringTranslationsSchema = z.object({
  'generic.read.more': z.string(),
  '404.description': z.string(),
  '404.content': z.string(),
  '404.page.link': z.string(),
  '404.page.title': z.string(),
  'cabin.reviews.count': z.string(),
  'cabin.reviews.average': z.string(),
  'cabin.location.title': z.string(),
  'cabin.information.title': z.string(),
  'cabin.gallery.go.to': z.string(),
  'cabin.number.of.bedrooms': z.string(),
  'cabin.number.of.rooms': z.string(),
  'cabin.year.built': z.string(),
  'aria.label.breadcrumbs': z.string(),
  'cabin.pets.allowed': z.string(),
  'cabin.pets.not.allowed': z.string(),
  'cabin.smoking.allowed': z.string(),
  'cabin.smoking.not.allowed': z.string(),
  'cabin.occupancy': z.string(),
  'generic.meter.squared': z.string(),
  'cabin.action.link.text': z.string(),
  'cabin.action.link.disabled.help': z.string(),
  'cabin.map.location': z.string(),
  'sub.menu.toggle': z.string(),
  'generic.skip.to.content': z.string(),
  'generic.back.to.top': z.string(),
  'generic.logo.link': z.string(),
  'generic.form.privacy.policy': z.string(),
  'contact.form.submit.server.error': z.string(),
  'contact.form.submit.client.error': z.string(),
  'contact.form.submit.success': z.string(),
  'generic.form.submit': z.string(),
  'contact.form.message': z.string(),
  'contact.form.phonenumber': z.string(),
  'contact.form.email': z.string(),
  'contact.form.name': z.string(),
  '404.title': z.string(),
  'seo.title': z.string(),
  'nav.close': z.string(),
  'nav.open': z.string(),
  'cabin.gallery.dialog.open': z.string(),
  'cabin.gallery.dialog.close': z.string(),
  'cabin.distances.title': z.string(),
  'cabin.distances.description': z.string(),
  'cabin.distances.link.suffix': z.string(),
});

export type StringTranslationsSchema = z.infer<typeof stringTranslationsSchema>;

type StringTranslationState = {
  stringTranslations: StringTranslationsSchema;
  t: (text: keyof StringTranslationsSchema) => string;
};

const useStringTranslationStore = create<StringTranslationState>(() => ({
  stringTranslations,
  t: (text: keyof StringTranslationsSchema) => stringTranslations[text],
}));

export default useStringTranslationStore;
