import type {
  ParsedCabinReferences,
  ParsedContent,
  ParsedForm,
  ParsedHero,
  ParsedInfoCards,
  ParsedMap,
  ParsedSection,
} from "~/parsers/contentful";
import type {
  EntryHero,
  Section,
  EntryCabinReferences,
  EntryMapSection,
  EntryFormSection,
  EntryInfoCardsSection,
} from "~/types/Contentful";

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
