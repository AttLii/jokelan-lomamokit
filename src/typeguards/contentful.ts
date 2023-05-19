import {
  ParsedEntryCabin,
  ParsedEntryPage,
  ParsedFiftyFifty,
  ParsedHero,
  ParsedSection,
} from "../parsers/contentful";
import type {
  EntryCabin,
  EntryContent,
  EntryFiftyFifty,
  EntryHero,
  EntryPage,
  EntrySection,
} from "../types/contentful";

export const isEntryPage = (entry: EntryContent): entry is EntryPage =>
  entry.sys.contentType.sys.id === "page";

export const isEntryCabin = (entry: EntryContent): entry is EntryCabin =>
  entry.sys.contentType.sys.id === "cabin";

export const isEntryHero = (entry: EntrySection): entry is EntryHero => {
  return entry.sys.contentType.sys.id === "hero";
};

export const isFiftyFifty = (entry: EntrySection): entry is EntryFiftyFifty => {
  return entry.sys.contentType.sys.id === "fiftyFifty";
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
