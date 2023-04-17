import type { ContentfulClientApi } from "contentful";
import type {
  GlobalContent,
  Page,
  Cabin,
  EntryGlobalContent,
  Translation,
  EntryContent,
} from "~/types/Contentful";

export class Contentful {
  constructor(private client: ContentfulClientApi) {}

  private getEntries<T>(query: any) {
    return this.client.getEntries<T>(query).then((r) => r.items);
  }

  public async getPageContent() {
    return Promise.all([
      this.getEntries<Page>({ content_type: "page" }),
      this.getEntries<Cabin>({ content_type: "cabin" }),
    ]).then((results) => results.flat());
  }

  public async getContentByPath(path: string): Promise<EntryContent | null> {
    const pages = await this.getEntries<Page>({
      content_type: "page",
      "fields.path": path,
      include: 2,
    });

    if (pages.length > 0) {
      return pages[0];
    }

    const cabins = await this.getEntries<Cabin>({
      content_type: "cabin",
      "fields.path": path,
      include: 2,
    });

    return cabins.length > 0 ? cabins[0] : null;
  }

  public async getBreadcrumbs(path: string): Promise<EntryContent[]> {
    const entryBreadcrumbs: EntryContent[] = [];
    if (path === "/" || path === "") return entryBreadcrumbs;

    while (path !== "") {
      const entry = await this.getContentByPath(path);
      if (entry) entryBreadcrumbs.unshift(entry);

      path = path.substring(0, path.lastIndexOf("/"));
    }

    const frontpageEntry = await this.getContentByPath("/");
    if (frontpageEntry) entryBreadcrumbs.unshift(frontpageEntry);

    return entryBreadcrumbs;
  }

  public getEntryById<T>(id: string) {
    return this.client.getEntry<T>(id);
  }

  public async getGlobalContent(): Promise<EntryGlobalContent | null> {
    const globalContents = await this.getEntries<GlobalContent>({
      content_type: "globalContent",
      include: 4,
    });

    if (globalContents.length === 0) {
      return null;
    }

    return globalContents[0];
  }

  public async getTranslations() {
    return this.getEntries<Translation>({
      content_type: "stringTranslation",
    });
  }
}
