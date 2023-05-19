import {
  ParsedCabinReferences,
  ParsedEntryCabin,
  ParsedEntryPage,
  ParsedFiftyFifty,
  ParsedForm,
  ParsedHero,
  ParsedMap,
  ParsedSection,
} from "../parsers/contentful";
import type {
  EntryCabin,
  EntryCabinReferences,
  EntryContent,
  EntryFiftyFifty,
  EntryForm,
  EntryHero,
  EntryMap,
  EntryPage,
  EntrySection,
} from "../types/contentful";

export const isEntryPage = (entry: EntryContent): entry is EntryPage => {
  return entry.sys.contentType.sys.id === "page";
};

export const isEntryCabin = (entry: EntryContent): entry is EntryCabin => {
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
