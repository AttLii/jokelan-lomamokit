import type { EntryCabin, EntryContent, EntryPage } from "../types/contentful";

export const isEntryPage = (entry: EntryContent): entry is EntryPage =>
  entry.sys.contentType.sys.id === "page";

export const isEntryCabin = (entry: EntryContent): entry is EntryCabin =>
  entry.sys.contentType.sys.id === "cabin";
