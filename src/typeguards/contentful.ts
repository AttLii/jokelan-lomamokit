import type {
  ParsedCabinReferences,
  ParsedHero,
  ParsedSection,
} from "~/parsers/contentful";
import type {
  EntryHero,
  Section,
  EntryCabinReferences,
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
