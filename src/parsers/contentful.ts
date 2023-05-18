import type { Asset } from "contentful";
import type {
  EntryCabin,
  EntryGlobalContent,
  EntryMenu,
  EntryMenuItem,
  EntryPage,
  EntrySeoFields,
  EntryStringTranslation,
  EntrySubMenuItem,
} from "../types/contentful";
import { notEmpty } from "../utils/typescript";
import { parseEntryLocalBusinessToType } from "./seo";

export const fixAssetUrl = (url: string) => {
  if (!url.startsWith("//")) return url;
  return `https:${url}`;
};
export const parseUrlFromAsset = (asset: Asset<undefined, string>) => {
  const { file } = asset.fields;
  return file?.url ? fixAssetUrl(file.url) : "";
};

export const parseAssetImage = (image: Asset<undefined, string>) => {
  const { title, file } = image.fields;
  return {
    title,
    url: file ? fixAssetUrl(file.url) : "",
  };
};

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

export const parseEntryPage = (page: EntryPage) => {
  const { name, path, seoFields } = page.fields;
  return {
    name,
    path,
    seoFields: parseSeoFields(seoFields),
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

export const reduceStringTranslationToObject = (
  acc: Record<string, string>,
  t: EntryStringTranslation
) => {
  const { slug, translation } = t.fields;
  acc[slug] = translation;
  return acc;
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
