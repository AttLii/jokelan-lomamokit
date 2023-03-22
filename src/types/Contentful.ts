import type { Entry, Asset } from "contentful";
export type SeoFields = {
  title: string;
  description: string;
  file: Asset;
  robots: string;
  keywords: string;
};
export type EntrySeoFields = Entry<SeoFields>;

export type Page = {
  path: string;
  seoFields: EntrySeoFields;
};

export type EntryPage = Entry<Page>;
