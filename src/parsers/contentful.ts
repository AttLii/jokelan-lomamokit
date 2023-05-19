import type { Asset } from "contentful";
import type {
  EntryCabin,
  EntryContent,
  EntryFiftyFifty,
  EntryGlobalContent,
  EntryHero,
  EntryMap,
  EntryMenu,
  EntryMenuItem,
  EntryPage,
  EntrySection,
  EntrySeoFields,
  EntryStringTranslation,
  EntrySubMenuItem,
} from "../types/contentful";
import type { Document } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { notEmpty } from "../utils/typescript";
import { parseEntryLocalBusinessToType } from "./seo";
import {
  isEntryCabin,
  isEntryFiftyFifty,
  isEntryHero,
  isEntryMap,
  isEntryPage,
} from "../typeguards/contentful";

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

export const fixAssetUrl = (url: string) => {
  if (!url.startsWith("//")) return url;
  return `https:${url}?fm=webp`;
};
export const parseUrlFromAsset = (asset: Asset<undefined, string>) => {
  const { file } = asset.fields;
  return file?.url ? fixAssetUrl(file.url) : "";
};

export const parseAssetImage = (image: Asset<undefined, string>) => {
  const { title, file } = image.fields;
  return {
    alt: title + "",
    src: file ? fixAssetUrl(file.url) : "",
  };
};
export type ParsedAssetImage = ReturnType<typeof parseAssetImage>;

export const parseSeoFields = (seoFields: EntrySeoFields) => {
  const { title, description, keywords, robots, image } = seoFields.fields;
  return {
    title,
    description,
    keywords,
    robots,
    image: image ? parseAssetImage(image) : null,
  };
};

export const parseHero = (hero: EntryHero) => {
  const { gallery, richText } = hero.fields;
  return {
    type: "hero",
    gallery: gallery.filter(notEmpty).map(parseAssetImage),
    richText: documentToHtml(richText),
  };
};
export type ParsedHero = ReturnType<typeof parseHero>;

export const parseFiftyFifty = (section: EntryFiftyFifty) => {
  const { image, order, richText } = section.fields;
  return {
    type: "fiftyFifty",
    order,
    image: image ? parseAssetImage(image) : null,
    richText: documentToHtml(richText),
  };
};
export type ParsedFiftyFifty = ReturnType<typeof parseFiftyFifty>;

export const parseMap = (section: EntryMap) => {
  const { title, richText, location } = section.fields;
  return {
    type: "map",
    title,
    richText: documentToHtml(richText),
    location,
  };
};
export type ParsedMap = ReturnType<typeof parseMap>;

export const parseSection = (section: EntrySection) => {
  if (isEntryHero(section)) {
    return parseHero(section);
  } else if (isEntryFiftyFifty(section)) {
    return parseFiftyFifty(section);
  } else if (isEntryMap(section)) {
    return parseMap(section);
  } else {
    console.log(JSON.stringify(section, null, 2));
    return {
      type: "noop",
    };
  }
};

export type ParsedSection = ReturnType<typeof parseSection>;

export const parseSections = (sections: (EntrySection | undefined)[]) => {
  return sections.filter(notEmpty).map(parseSection);
};
export type ParsedSections = ReturnType<typeof parseSections>;

export const parseEntryPage = (page: EntryPage) => {
  const { name, path, seoFields, sections } = page.fields;
  return {
    name,
    path,
    seoFields: parseSeoFields(seoFields),
    sections: sections ? parseSections(sections) : [],
  };
};
export type ParsedEntryPage = ReturnType<typeof parseEntryPage>;

export const parseEntryCabin = (page: EntryCabin) => {
  const { name, path, seoFields } = page.fields;
  return {
    name,
    path,
    seoFields: parseSeoFields(seoFields),
  };
};
export type ParsedEntryCabin = ReturnType<typeof parseEntryCabin>;

export const parseContent = (content: EntryContent) => {
  if (isEntryCabin(content)) {
    return parseEntryCabin(content);
  } else if (isEntryPage(content)) {
    return parseEntryPage(content);
  } else {
    return null;
  }
};

export const reduceStringTranslationsToObject = (
  stringTranslations: EntryStringTranslation[]
) => {
  return stringTranslations.reduce((acc, t) => {
    const { slug, translation } = t.fields;
    acc[slug] = translation;
    return acc;
  }, {} as Record<string, string>);
};

export const parseEntrySubMenuItem = (subMenuItem: EntrySubMenuItem) => {
  const { content, title } = subMenuItem.fields;
  return {
    title,
    path: content?.fields.path || "",
  };
};

export const parseEntryMenuItem = (menuItem: EntryMenuItem) => {
  const { content, title, subItems } = menuItem.fields;
  return {
    title,
    path: content?.fields.path || "",
    subItems:
      subItems && Array.isArray(subItems)
        ? subItems.filter(notEmpty).map(parseEntrySubMenuItem)
        : [],
  };
};

export const parseEntryMenu = (menu: EntryMenu) => {
  const { title, menuItems } = menu.fields;
  return {
    title,
    menuItems:
      menuItems && Array.isArray(menuItems)
        ? menuItems.filter(notEmpty).map(parseEntryMenuItem)
        : [],
  };
};

export const parseEntryGlobalContent = (globalContent: EntryGlobalContent) => {
  const { headerMenu, footerMenu, localBusiness } = globalContent.fields;
  return {
    headerMenu: headerMenu ? parseEntryMenu(headerMenu) : null,
    footerMenu: footerMenu ? parseEntryMenu(footerMenu) : null,
    localBusiness: localBusiness
      ? parseEntryLocalBusinessToType(localBusiness)
      : null,
  };
};

export type ParsedGlobalContent = ReturnType<typeof parseEntryGlobalContent>;
