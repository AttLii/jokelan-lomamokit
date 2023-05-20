import type {
  ParsedCabinReferences,
  ParsedContent,
  ParsedEntryCabin,
  ParsedEntryPage,
  ParsedFaqs,
  ParsedFiftyFifty,
  ParsedForm,
  ParsedHero,
  ParsedMap,
  ParsedSection,
} from "../parsers/contentful";
import type {
  EntryCabin,
  EntryCabinReferences,
  EntryForPage,
  EntryFiftyFifty,
  EntryForm,
  EntryHero,
  EntryMap,
  EntryPage,
  EntrySection,
  EntryContent,
  EntryFaqs,
} from "../types/contentful";

export const isEntryPage = (entry: EntryForPage): entry is EntryPage => {
  return entry.sys.contentType.sys.id === "page";
};

export const isEntryCabin = (entry: EntryForPage): entry is EntryCabin => {
  return entry.sys.contentType.sys.id === "cabin";
};

export const isEntryHero = (entry: EntrySection): entry is EntryHero => {
  return entry.sys.contentType.sys.id === "hero";
};

export const isEntryFiftyFifty = (
  entry: EntrySection
): entry is EntryFiftyFifty => {
  return entry.sys.contentType.sys.id === "fiftyFifty";
};

export const isEntryMap = (entry: EntrySection): entry is EntryMap => {
  return entry.sys.contentType.sys.id === "map";
};

export const isEntryCabinReferences = (
  entry: EntrySection
): entry is EntryCabinReferences => {
  return entry.sys.contentType.sys.id === "cabinReferences";
};

export const isEntryForm = (entry: EntrySection): entry is EntryForm => {
  return entry.sys.contentType.sys.id === "form";
};

export const isEntryContent = (entry: EntrySection): entry is EntryContent => {
  return entry.sys.contentType.sys.id === "content";
};

export const isEntryFaqs = (entry: EntrySection): entry is EntryFaqs => {
  return entry.sys.contentType.sys.id === "faqs";
};

export const isParsedPage = (
  content: ParsedEntryPage | ParsedEntryCabin
): content is ParsedEntryPage => {
  return "sections" in content;
};

export const isParsedHero = (section: ParsedSection): section is ParsedHero => {
  return section.type === "hero";
};

export const isParsedFiftyFifty = (
  section: ParsedSection
): section is ParsedFiftyFifty => {
  return section.type === "fiftyFifty";
};

export const isParsedMap = (section: ParsedSection): section is ParsedMap => {
  return section.type === "map";
};

export const isParsedCabinReferences = (
  section: ParsedSection
): section is ParsedCabinReferences => {
  return section.type === "cabinReferences";
};
export const isParsedForm = (section: ParsedSection): section is ParsedForm => {
  return section.type === "form";
};
export const isParsedContent = (
  section: ParsedSection
): section is ParsedContent => {
  return section.type === "content";
};
export const isParsedFaqs = (section: ParsedSection): section is ParsedFaqs => {
  return section.type === "faqs";
};
