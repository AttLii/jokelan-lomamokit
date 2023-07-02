"use client";
import type { ReactNode } from "react";
import { StringTranslationContext } from "../contexts/stringTranslations";
import stringTranslations from "../prevals/stringTranslations.preval";

type Props = {
  children: ReactNode;
}
export default function StringTranslations({ children }: Props) {
  return (
    <StringTranslationContext.Provider value={stringTranslations}>
      {children}
    </StringTranslationContext.Provider>
  );
}