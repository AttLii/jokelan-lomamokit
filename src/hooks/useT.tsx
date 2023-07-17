"use client";
import type { StringTranslationsSchema } from "../stores/stringTranslations";
import useStringTranslationStore from "../stores/stringTranslations";


export default function useT(translation: keyof StringTranslationsSchema) {
  const t = useStringTranslationStore((store) => store.t);
  return t(translation);
}