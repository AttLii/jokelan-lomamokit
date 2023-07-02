"use client";
import { useContext } from "react";
import { GlobalContentContext } from "../contexts/globalContent";

export default function useGlobalContent() {
  const context = useContext(GlobalContentContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be within GlobalContentContext.Provider"
    );
  }

  return context;
}
