import type * as contentful from "contentful";
import type { EntrySkeletonType } from "contentful";
import type {
  CabinSkeleton,
  GlobalContentSkeleton,
  PageSkeleton,
  StringTranslationSkeleton,
} from "../types/contentful";

class Contentful {
  constructor(
    private client: contentful.ContentfulClientApi<"WITHOUT_UNRESOLVABLE_LINKS">
  ) {}

  private getEntries = async <T extends EntrySkeletonType>(
    query?: contentful.EntriesQueries<T, undefined> | undefined
  ) => {
    return this.client.getEntries(query).then((r) => r.items);
  };

  public getAllContent = async () => {
    return Promise.all([
      this.getEntries<PageSkeleton>({ content_type: "page", include: 10 }),
      this.getEntries<CabinSkeleton>({ content_type: "cabin", include: 10 }),
    ]).then((content) => [...content[0], ...content[1]]);
  };

  public getContentByPath = async (path: string) => {
    const pages = await this.getEntries<PageSkeleton>({
      content_type: "page",
      "fields.path": path,
    });
    if (pages.length > 0) {
      return pages[0];
    }

    const cabins = await this.getEntries<CabinSkeleton>({
      content_type: "cabin",
      "fields.path": path,
    });
    if (cabins.length > 0) {
      return cabins[0];
    }

    return null;
  };

  public getStringTranslations = () => {
    return this.getEntries<StringTranslationSkeleton>({
      content_type: "stringTranslation",
    });
  };

  public getGlobalContent = async () => {
    const globalContents = await this.getEntries<GlobalContentSkeleton>({
      content_type: "globalContent",
      include: 10,
    });

    if (globalContents.length === 0) {
      throw new Error("Couldn't find any global content");
    }

    return globalContents[0];
  };
}

export default Contentful;
