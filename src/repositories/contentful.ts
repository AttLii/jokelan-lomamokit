import type { ContentfulClientApi } from "contentful";
import contentful from "contentful";
import type {
  GlobalContent,
  Page,
  EntryMenu,
  MenuItem,
  EntryGlobalContent,
} from "~/types/Contentful";

export class Contentful {
  private client: ContentfulClientApi;
  constructor(accessToken: string, space: string) {
    this.client = contentful.createClient({ accessToken, space });
  }

  public async getPageContent() {
    return this.client
      .getEntries<Page>({
        content_type: "page",
      })
      .then((r) => r.items);
  }

  public async getContentByPath(path: string) {
    const pageResults = await this.client.getEntries<Page>({
      content_type: "page",
      "fields.path": path,
    });

    if (pageResults.items.length === 0) {
      return null;
    }

    return pageResults.items[0];
  }

  public getEntryById<T>(id: string) {
    return this.client.getEntry<T>(id);
  }

  public async getGlobalContent(): Promise<EntryGlobalContent | null> {
    const response = await this.client.getEntries<GlobalContent>({
      content_type: "globalContent",
    });

    if (response.items.length === 0) {
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

    const content = response.items[0];

    content.fields.headerMenu = await populateMenuItems(
      content.fields.headerMenu
    );
    content.fields.footerMenu = await populateMenuItems(
      content.fields.footerMenu
    );

    return content;
  }
}
