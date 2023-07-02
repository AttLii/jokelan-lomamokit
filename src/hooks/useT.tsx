"use client";
import type { StringTranslationSchema } from "../contexts/stringTranslations";
import { useContext } from "react";
import { StringTranslationContext } from "../contexts/stringTranslations";

export default function useT(translation: keyof StringTranslationSchema) {
  const context = useContext(StringTranslationContext);
  if (context === undefined) {
    throw new Error("useT must be within StringTranslationContext.Provider");
  }

  return context[translation];
}