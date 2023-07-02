"use client";
import type { PropsWithChildren } from "react";
import { StringTranslationContext } from "../contexts/stringTranslations";
import stringTranslations from "../prevals/stringTranslations.preval";

export default function StringTranslations({ children }: PropsWithChildren) {
  return (
    <StringTranslationContext.Provider value={stringTranslations}>
      {children}
    </StringTranslationContext.Provider>
  );
}