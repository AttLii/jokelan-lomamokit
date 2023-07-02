import type { ParsedEntryCabin, ParsedEntryPage } from "../parsers/contentful";

export const isPageProps = (
  props: ParsedEntryPage | ParsedEntryCabin
): props is ParsedEntryPage => props.type === "page";
