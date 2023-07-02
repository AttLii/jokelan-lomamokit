"use client";
import { useContext } from "react";
import { UiContext } from "../contexts/ui";

export default function useUi() {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error("useUiContext must be within UiContext.Provider");
  }
  return context;
}