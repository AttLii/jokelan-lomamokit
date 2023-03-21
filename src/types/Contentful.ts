import type { Entry, Asset } from "contentful";
export type Path = {
  path: string;
};
export type EntryPath = Entry<Path>;

export type SeoFields = {
  title: string;
  description: string;
  file: Asset;
  robots: string;
  keywords: string;
};
export type EntrySeoFields = Entry<SeoFields>;

export type Page = {
  path: EntryPath;
  seoFields: EntrySeoFields;
};
