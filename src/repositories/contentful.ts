import * as contentful from "contentful";
import type { EntrySkeletonType } from "contentful";
import type {
  CabinSkeleton,
  GlobalContentSkeleton,
  PageSkeleton,
  StringTranslationSkeleton,
} from "../types/contentful";

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE,
}).withoutUnresolvableLinks;

const getEntries = async <T extends EntrySkeletonType>(
  query?: contentful.EntriesQueries<T, undefined> | undefined
) => {
  return client.getEntries(query).then((r) => r.items);
};

export const getAllContent = () => {
  return Promise.all([
    getEntries<PageSkeleton>({ content_type: "page", include: 10 }),
    getEntries<CabinSkeleton>({ content_type: "cabin", include: 10 }),
  ]).then((content) => [...content[0], ...content[1]]);
};

export const getContentByPath = async (path: string) => {
  const pages = await getEntries<PageSkeleton>({
    content_type: "page",
    "fields.path": path,
  });
  if (pages.length > 0) {
    return pages[0];
  }

  const cabins = await getEntries<CabinSkeleton>({
    content_type: "cabin",
    "fields.path": path,
  });
  if (cabins.length > 0) {
    return cabins[0];
  }

  return null;
};

export const getStringTranslations = () => {
  return getEntries<StringTranslationSkeleton>({
    content_type: "stringTranslation",
  });
};

export const getGlobalContent = async () => {
  const globalContents = await getEntries<GlobalContentSkeleton>({
    content_type: "globalContent",
    include: 10,
  });

  if (globalContents.length === 0) {
    throw new Error("Couldn't find any global content");
  }

  return globalContents[0];
};
