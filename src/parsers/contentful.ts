import type { Asset } from "contentful";
import type { Options } from "@contentful/rich-text-html-renderer";
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
} from "~/types/Contentful";
import {
  isEntryCabinReferencesSection,
  isEntryHeroSection,
} from "~/typeguards/contentful";
import { nonNullable } from "~/utils/typescript";
import { INLINES, BLOCKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

const documentToHtmlStringOpts: Partial<Options> = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, next) =>
      `<h1 class="prose-2xl font-bold">${next(node.content)}</h1>`,
    [BLOCKS.HEADING_2]: (node, next) =>
      `<h2 class="prose-1xl font-bold">${next(node.content)}</h2>`,
    [BLOCKS.PARAGRAPH]: (node, next) =>
      `<p class="prose-base font-normal">${next(node.content)}</p>`,
    [INLINES.HYPERLINK]: (node, next) =>
      `<a class="prose-base font-normal underline" href="${
        node.data.uri
      }">${next(node.content)}</a>`,
  },
};
const documentToString = (document: Document) => {
  return documentToHtmlString(document, documentToHtmlStringOpts);
};

const parseImageAsset = ({
  fields: {
    title,
    file: {
      url,
      details: { image },
    },
  },
}: Asset) => {
  return {
    alt: title,
    src: url,
    width: `${image?.width || 0}`,
    height: `${image?.height || 0}`,
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
    richText: documentToString(richText),
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
    richText: documentToString(richText),
    cabinReferences: cabinReferences.map(parseCabinReference), // todo
  };
};

export type ParsedSection = ParsedHero | ParsedCabinReferences;
export const parseSections = (sections: Section[]): ParsedSection[] => {
  return sections
    .map((section) => {
      if (isEntryHeroSection(section)) {
        return parseHeroSection(section);
      } else if (isEntryCabinReferencesSection(section)) {
        return parseCabinReferencesSection(section);
      } else {
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
};
export const parseCabinReference = (
  cabin: EntryCabin
): ParsedCabinReference => {
  return {
    id: cabin.sys.id,
    path: cabin.fields.path,
  };
};

export type ParsedMenuItem = {
  title: string;
  content: ParsedPageReference;
};
export const parseMenuItem = (menuItem: EntryMenuItem): ParsedMenuItem => {
  const { title, content } = menuItem.fields;
  return {
    title,
    content: parsePageReference(content),
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
};
export const parseGlobalContent = (
  globalContent: EntryGlobalContent
): ParsedGlobalContent => {
  const { headerMenu, footerMenu } = globalContent.fields;
  return {
    headerMenu: parseMenu(headerMenu),
    footerMenu: parseMenu(footerMenu),
  };
};
