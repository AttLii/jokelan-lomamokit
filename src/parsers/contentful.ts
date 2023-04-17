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
  FiftyFiftyOrder,
  EntrySeoFields,
} from "~/types/Contentful";
import {
  isEntryCabin,
  isEntryCabinReferencesSection,
  isEntryContentSection,
  isEntryFAQsSection,
  isEntryFiftyFiftySection,
  isEntryFormSection,
  isEntryHeroSection,
  isEntryInfoCardsSection,
  isEntryMapSection,
  isEntryPage,
} from "~/typeguards/contentful";
import { nonNullable } from "~/utils/typescript";
import type { EntryFiftyFiftySection } from "~/types/Contentful";
import type { Document } from "@contentful/rich-text-types";

/**
 * @see https://github.com/contentful/rich-text/issues/122#issue-527478687
 */
const documentToHtml = (document: Document): string => {
  const REGEX_REPLACE_SANITIZED_SHY_TAG = /&amp;shy;/gm;
  return documentToHtmlString(document).replace(
    REGEX_REPLACE_SANITIZED_SHY_TAG,
    "&shy;"
  );
};

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
    richText: documentToHtml(richText),
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
    richText: documentToHtml(richText),
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
    richText: documentToHtml(richText),
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
    richText: documentToHtml(richText),
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
    richText: documentToHtml(richText),
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
    richText: documentToHtml(richText),
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
    richText: documentToHtml(richText),
  };
};

export type ParsedFAQ = {
  question: string;
  answer: string;
};
export const parseFaq = (faq: EntryFAQ): ParsedFAQ => {
  const { answer, question } = faq.fields;
  return {
    question,
    answer: documentToHtml(answer),
  };
};

export type ParsedFAQsSection = {
  type: "faqs";
  richText: string;
  faqs: ParsedFAQ[];
};
export const parseFAQsSection = (
  section: EntryFAQsSection
): ParsedFAQsSection => {
  const { richText, faqs } = section.fields;
  return {
    type: "faqs",
    richText: documentToHtml(richText),
    faqs: faqs.map(parseFaq),
  };
};

export type ParsedFiftyFiftySection = {
  type: "fiftyFifty";
  richText: string;
  image: ParsedImageAsset;
  order: FiftyFiftyOrder;
};
export const parseFiftyFiftySection = (
  section: EntryFiftyFiftySection
): ParsedFiftyFiftySection => {
  const { richText, image, order } = section.fields;
  return {
    type: "fiftyFifty",
    richText: documentToHtml(richText),
    image: parseImageAsset(image),
    order,
  };
};

export type ParsedSection =
  | ParsedHero
  | ParsedCabinReferences
  | ParsedMap
  | ParsedForm
  | ParsedInfoCards
  | ParsedContent
  | ParsedFAQsSection
  | ParsedFiftyFiftySection;
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
      } else if (isEntryFiftyFiftySection(section)) {
        return parseFiftyFiftySection(section);
      } else {
        console.log(JSON.stringify(section, null, 2));
        return null;
      }
    })
    .filter(nonNullable);
};

export type ParsedSeoFields = Omit<SeoFields, "image"> & {
  image: ParsedImageAsset;
};
const parseSeoFields = (seoFields: EntrySeoFields): ParsedSeoFields => {
  const { image, ...rest } = seoFields.fields;
  return {
    ...rest,
    image: parseImageAsset(image),
  };
};

export type ParsedPage = {
  type: "page";
  seoFields: ParsedSeoFields;
  sections: ParsedSection[];
};
export type ParsedCabin = {
  type: "cabin";
  seoFields: ParsedSeoFields;
  gallery: ParsedImageAsset[];
  sections: ParsedSection[];
  name: string;
  description: string;
  numberOfRooms: number;
  occupancy: string;
  floorLevel: number;
  floorSize: number;
  numberOfBathroomsTotal: number;
  numberOfBedrooms: number;
  petsAllowed: boolean;
  tourBookingPage?: string;
  yearBuilt: number;
  telephone: number;
  addressCountry: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
  location: EntryFields.Location;
  smokingAllowed: boolean;
};
export type ParsedPageOrCabin = ParsedPage | ParsedCabin;

const parsePageContent = (page: EntryPage): ParsedPage => {
  const { sections, seoFields } = page.fields;

  return {
    type: "page",
    seoFields: parseSeoFields(seoFields),
    sections: sections ? parseSections(sections) : [],
  };
};

const parseCabinContent = (cabin: EntryCabin): ParsedCabin => {
  const { sections, seoFields, gallery, ...rest } = cabin.fields;

  return {
    type: "cabin",
    seoFields: parseSeoFields(seoFields),
    sections: sections ? parseSections(sections) : [],
    gallery: gallery.map(parseImageAsset),
    ...rest,
  };
};

export const parseContent = (entry: EntryContent): ParsedPageOrCabin | null => {
  if (isEntryPage(entry)) {
    return parsePageContent(entry);
  } else if (isEntryCabin(entry)) {
    return parseCabinContent(entry);
  } else {
    return null;
  }
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
  structuredData?: string;
  email: string;
  location: string;
  telephone: string;
};
export const parseGlobalContent = (
  globalContent: EntryGlobalContent
): ParsedGlobalContent => {
  const { headerMenu, footerMenu, structuredData, email, location, telephone } =
    globalContent.fields;
  return {
    headerMenu: parseMenu(headerMenu),
    footerMenu: parseMenu(footerMenu),
    structuredData,
    email: email || "",
    location: location || "",
    telephone: telephone || "",
  };
};

export type Breadcrumb = {
  name: string;
  path: string;
};
export const parseBreadcrumbs = (entries: EntryContent[]): Breadcrumb[] => {
  return entries.map(({ fields: { name, path } }) => {
    return {
      name,
      path,
    };
  });
};
