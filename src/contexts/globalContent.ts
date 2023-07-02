import { createContext } from "react";
import type { ParsedGlobalContent } from "../parsers/contentful";

export const GlobalContentContext = createContext<
  undefined | ParsedGlobalContent
>(undefined);
