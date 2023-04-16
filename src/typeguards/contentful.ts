import type {
  ParsedCabin,
  ParsedCabinReferences,
  ParsedContent,
  ParsedFAQsSection,
  ParsedFiftyFiftySection,
  ParsedForm,
  ParsedHero,
  ParsedInfoCards,
  ParsedMap,
  ParsedPage,
  ParsedPageOrCabin,
  ParsedSection,
} from "~/parsers/contentful";
import type {
  EntryHero,
  Section,
  EntryCabinReferences,
  EntryMapSection,
  EntryFormSection,
  EntryInfoCardsSection,
  EntryFAQsSection,
  EntryFiftyFiftySection,
  EntryContent,
  EntryPage,
  EntryCabin,
} from "~/types/Contentful";

export const isEntryPage = (entry: EntryContent): entry is EntryPage => {
  return entry.sys.contentType.sys.id === "page";
};

export const isEntryCabin = (entry: EntryContent): entry is EntryCabin => {
  return entry.sys.contentType.sys.id === "cabin";
};

export const isEntryHeroSection = (section: Section): section is EntryHero => {
  return section.sys.contentType.sys.id === "hero";
};

export const isHeroSection = (
  section: ParsedSection
): section is ParsedHero => {
  return section.type === "hero";
};

export const isEntryCabinReferencesSection = (
  section: Section
): section is EntryCabinReferences => {
  return section.sys.contentType.sys.id === "cabinReferences";
};

export const isCabinReferencesSection = (
  section: ParsedSection
): section is ParsedCabinReferences => {
  return section.type === "cabinReferences";
};

export const isEntryMapSection = (
  section: Section
): section is EntryMapSection => {
  return section.sys.contentType.sys.id === "map";
};

export const isEntryFormSection = (
  section: Section
): section is EntryFormSection => {
  return section.sys.contentType.sys.id === "form";
};

export const isEntryInfoCardsSection = (
  section: Section
): section is EntryInfoCardsSection => {
  return section.sys.contentType.sys.id === "infoCards";
};

export const isEntryContentSection = (
  section: Section
): section is EntryInfoCardsSection => {
  return section.sys.contentType.sys.id === "content";
};

export const isEntryFAQsSection = (
  section: Section
): section is EntryFAQsSection => {
  return section.sys.contentType.sys.id === "faqs";
};

export const isEntryFiftyFiftySection = (
  section: Section
): section is EntryFiftyFiftySection => {
  return section.sys.contentType.sys.id === "fiftyFifty";
};

export const isParsedPage = (
  parsedPageOrCabin: ParsedPageOrCabin
): parsedPageOrCabin is ParsedPage => {
  return parsedPageOrCabin.type === "page";
};

export const isParsedCabin = (
  parsedPageOrCabin: ParsedPageOrCabin
): parsedPageOrCabin is ParsedCabin => {
  return parsedPageOrCabin.type === "cabin";
};

export const isMapSection = (section: ParsedSection): section is ParsedMap => {
  return section.type === "map";
};

export const isFormSection = (
  section: ParsedSection
): section is ParsedForm => {
  return section.type === "form";
};

export const isInfoCardsSection = (
  section: ParsedSection
): section is ParsedInfoCards => {
  return section.type === "infoCards";
};

export const isContentSection = (
  section: ParsedSection
): section is ParsedContent => {
  return section.type === "content";
};

export const isFAQsSection = (
  section: ParsedSection
): section is ParsedFAQsSection => {
  return section.type === "faqs";
};

export const isFiftyFiftySection = (
  section: ParsedSection
): section is ParsedFiftyFiftySection => {
  return section.type === "fiftyFifty";
};
