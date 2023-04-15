import type { Asset, EntryFields } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type {
  EntryPage,
  SeoFields,
  Section,
  EntryHero,
  EntryGlobalContent,
  EntryMenu,
  EntryMenuItem,
  EntryContent,
  EntryCabinReferences,
  EntryCabin,
  EntryMapSection,
  EntryFormSection,
  EntryInfoCardsSection,
  EntryInfoCard,
  EntryContentSection,
  EntryFAQsSection,
  EntryFAQ,
} from "~/types/Contentful";
import {
  isEntryCabinReferencesSection,
  isEntryContentSection,
  isEntryFAQsSection,
  isEntryFormSection,
  isEntryHeroSection,
  isEntryInfoCardsSection,
  isEntryMapSection,
} from "~/typeguards/contentful";
import { nonNullable } from "~/utils/typescript";

const parseImageAsset = ({
  fields: {
    title,
    file: { url },
  },
}: Asset) => {
  return {
    alt: title,
    src: `${url}?fm=webp`,
  };
};

export type ParsedImageAsset = ReturnType<typeof parseImageAsset>;

export type ParsedSeoFields = Omit<SeoFields, "image"> & {
  image: ParsedImageAsset;
};

export type ParsedHero = {
  type: "hero";
  richText: string;
  gallery: ParsedImageAsset[];
};
export const parseHeroSection = ({
  fields: { richText, gallery },
}: EntryHero): ParsedHero => {
  return {
    type: "hero",
    richText: documentToHtmlString(richText),
    gallery: gallery.map(parseImageAsset),
  };
};

export type ParsedCabinReferences = {
  type: "cabinReferences";
  richText: string;
  cabinReferences: ParsedCabinReference[];
};
export const parseCabinReferencesSection = ({
  fields: { richText, cabinReferences },
}: EntryCabinReferences): ParsedCabinReferences => {
  return {
    type: "cabinReferences",
    richText: documentToHtmlString(richText),
    cabinReferences: cabinReferences.map(parseCabinReference), // todo
  };
};

export type ParsedMap = {
  type: "map";
  title: string;
  richText: string;
  location: EntryFields.Location;
};
export const parseMapSection = ({
  fields: { richText, location, title },
}: EntryMapSection): ParsedMap => {
  return {
    type: "map",
    richText: documentToHtmlString(richText),
    title,
    location,
  };
};

export type ParsedForm = {
  type: "form";
  richText: string;
  form: "Contact";
};
export const parseFormSection = ({
  fields: { richText, form },
}: EntryFormSection): ParsedForm => {
  return {
    type: "form",
    richText: documentToHtmlString(richText),
    form,
  };
};

export type ParsedInfoCard = {
  title: string;
  image: ParsedImageAsset;
  richText: string;
};
export const parseInfoCard = (entryInfoCard: EntryInfoCard): ParsedInfoCard => {
  const { title, image, richText } = entryInfoCard.fields;
  return {
    title,
    image: parseImageAsset(image),
    richText: documentToHtmlString(richText),
  };
};

export type ParsedInfoCards = {
  type: "infoCards";
  richText: string;
  infoCards: ParsedInfoCard[];
};
export const parseInfoCardsSection = (
  section: EntryInfoCardsSection
): ParsedInfoCards => {
  const { infoCards, richText } = section.fields;
  return {
    type: "infoCards",
    richText: documentToHtmlString(richText),
    infoCards: infoCards.map(parseInfoCard),
  };
};

export type ParsedContent = {
  type: "content";
  richText: string;
};
export const parseContentSection = (
  section: EntryContentSection
): ParsedContent => {
  const { richText } = section.fields;
  return {
    type: "content",
    richText: documentToHtmlString(richText),
  };
};

export type ParsedFaq = {
  question: string;
  answer: string;
};
export const parseFaq = (faq: EntryFAQ): ParsedFaq => {
  const { answer, question } = faq.fields;
  return {
    question,
    answer: documentToHtmlString(answer),
  };
};

export type ParsedFAQsSection = {
  type: "faqs";
  richText: string;
  faqs: ParsedFaq[];
};
export const parseFAQsSection = (
  section: EntryFAQsSection
): ParsedFAQsSection => {
  const { richText, faqs } = section.fields;
  return {
    type: "faqs",
    richText: documentToHtmlString(richText),
    faqs: faqs.map(parseFaq),
  };
};

export type ParsedSection =
  | ParsedHero
  | ParsedCabinReferences
  | ParsedMap
  | ParsedForm
  | ParsedInfoCards
  | ParsedContent
  | ParsedFAQsSection;
export const parseSections = (sections: Section[]): ParsedSection[] => {
  return sections
    .map((section) => {
      if (isEntryHeroSection(section)) {
        return parseHeroSection(section);
      } else if (isEntryCabinReferencesSection(section)) {
        return parseCabinReferencesSection(section);
      } else if (isEntryMapSection(section)) {
        return parseMapSection(section);
      } else if (isEntryFormSection(section)) {
        return parseFormSection(section);
      } else if (isEntryInfoCardsSection(section)) {
        return parseInfoCardsSection(section);
      } else if (isEntryContentSection(section)) {
        return parseContentSection(section);
      } else if (isEntryFAQsSection(section)) {
        return parseFAQsSection(section);
      } else {
        console.log(JSON.stringify(section, null, 2));
        return null;
      }
    })
    .filter(nonNullable);
};

export type ParsedPage = {
  seoFields: ParsedSeoFields;
  sections: ParsedSection[];
};
export const parseContent = (page: EntryContent): ParsedPage => {
  const {
    sections,
    seoFields: {
      fields: { image, ...seoFields },
    },
  } = page.fields;

  return {
    seoFields: {
      ...seoFields,
      image: parseImageAsset(image),
    },
    sections: sections ? parseSections(sections) : [],
  };
};

export type ParsedPageReference = {
  path: string;
};
export const parsePageReference = (page: EntryPage): ParsedPageReference => {
  return {
    path: page.fields.path,
  };
};

export type ParsedCabinReference = {
  path: string;
  id: string;
  title: string;
  image: ParsedImageAsset;
};
export const parseCabinReference = (
  cabin: EntryCabin
): ParsedCabinReference => {
  return {
    id: cabin.sys.id,
    path: cabin.fields.path,
    title: cabin.fields.name,
    image: parseImageAsset(cabin.fields.referenceImage),
  };
};

export type ParsedMenuItem = {
  title: string;
  content: ParsedPageReference;
  subItems: ParsedMenuItem[];
};
export const parseMenuItem = (menuItem: EntryMenuItem): ParsedMenuItem => {
  const { title, content, subItems } = menuItem.fields;
  return {
    title,
    content: parsePageReference(content),
    subItems: Array.isArray(subItems) ? subItems.map(parseMenuItem) : [],
  };
};

export type ParsedMenu = {
  title: string;
  menuItems: ParsedMenuItem[];
};
export const parseMenu = (menu: EntryMenu): ParsedMenu => {
  const { title, menuItems } = menu.fields;
  return {
    title,
    menuItems: menuItems.map(parseMenuItem),
  };
};

export type ParsedGlobalContent = {
  headerMenu: ParsedMenu;
  footerMenu: ParsedMenu;
  contactInformation: string;
  structuredData?: string;
};
export const parseGlobalContent = (
  globalContent: EntryGlobalContent
): ParsedGlobalContent => {
  const { headerMenu, footerMenu, contactInformation, structuredData } =
    globalContent.fields;
  return {
    headerMenu: parseMenu(headerMenu),
    footerMenu: parseMenu(footerMenu),
    contactInformation: documentToHtmlString(contactInformation),
    structuredData,
  };
};
