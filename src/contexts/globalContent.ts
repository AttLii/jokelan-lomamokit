import { createContext, useContext } from "react";
import type { ParsedGlobalContent } from "../parsers/contentful";

export const GlobalContentContext = createContext<
  undefined | ParsedGlobalContent
>(undefined);

export const useGlobalContentContext = () => {
  const context = useContext(GlobalContentContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be within GlobalContentContext.Provider"
    );
  }

  return context;
};
