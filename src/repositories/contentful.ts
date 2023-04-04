import type { ContentfulClientApi } from "contentful";
import type {
  GlobalContent,
  Page,
  Cabin,
  EntryMenu,
  MenuItem,
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

  public getEntryById<T>(id: string) {
    return this.client.getEntry<T>(id);
  }

  public async getGlobalContent(): Promise<EntryGlobalContent | null> {
    const globalContents = await this.getEntries<GlobalContent>({
      content_type: "globalContent",
    });

    if (globalContents.length === 0) {
      return null;
    }

    // nested references are minimized after two layers.
    const populateMenuItems = async (menu: EntryMenu): Promise<EntryMenu> => {
      const populatedMenuItems = await Promise.all(
        menu.fields.menuItems.map((menuItem) =>
          this.getEntryById<MenuItem>(menuItem.sys.id)
        )
      );
      return {
        ...menu,
        fields: {
          ...menu.fields,
          menuItems: populatedMenuItems,
        },
      };
    };

    const content = globalContents[0];

    content.fields.headerMenu = await populateMenuItems(
      content.fields.headerMenu
    );
    content.fields.footerMenu = await populateMenuItems(
      content.fields.footerMenu
    );

    return content;
  }

  public async getTranslations() {
    return this.getEntries<Translation>({
      content_type: "stringTranslation",
    });
  }
}
