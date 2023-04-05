import type { Asset, Entry, EntryFields } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export type SeoFields = {
  title: string;
  description: string;
  image: Asset;
  robots: string;
  keywords: string;
};
export type EntrySeoFields = Entry<SeoFields>;

export type Hero = {
  gallery: Asset[];
  richText: Document;
};
export type EntryHero = Entry<Hero>;
export type CabinReferences = {
  richText: Document;
  cabinReferences: EntryCabin[];
};
export type EntryCabinReferences = Entry<CabinReferences>;
export type Map = {
  richText: Document;
  location: EntryFields.Location;
};
export type EntryMapSection = Entry<Map>;

export type Section = EntryHero | EntryCabinReferences | EntryMapSection;

export type Page = {
  path: string;
  seoFields: EntrySeoFields;
  sections?: Section[];
};
export type Cabin = {
  path: string;
  seoFields: EntrySeoFields;
  sections?: Section[];
  referenceImage: Asset;
  name: string;
};

export type EntryPage = Entry<Page>;
export type EntryCabin = Entry<Cabin>;
export type EntryContent = EntryPage | EntryCabin;

export type MenuItem = {
  title: string;
  content: EntryPage;
};
export type EntryMenuItem = Entry<MenuItem>;

export type Menu = {
  title: string;
  menuItems: EntryMenuItem[];
};
export type EntryMenu = Entry<Menu>;

export type GlobalContent = {
  headerMenu: EntryMenu;
  footerMenu: EntryMenu;
};
export type EntryGlobalContent = Entry<GlobalContent>;

export type Translation = {
  slug: string;
  translation: string;
};
export type EntryTranslation = Entry<Translation>;
