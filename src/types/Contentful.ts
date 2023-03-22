import type { Entry, Asset, RichTextContent } from "contentful";
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
  richText: RichTextContent;
};
export type EntryHero = Entry<Hero>;
export type Section = EntryHero;

export type Page = {
  path: string;
  seoFields: EntrySeoFields;
  sections: Section[];
};

export type EntryPage = Entry<Page>;
