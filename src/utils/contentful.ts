import type { EntryHero, Section } from "~/types/Contentful";

export const isHeroSection = (section: Section): section is EntryHero => {
  return section.sys.contentType.sys.id === "hero";
};
