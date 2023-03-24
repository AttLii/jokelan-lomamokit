import contentful from "contentful";
import type {
  GlobalContent,
  Page,
  EntryMenu,
  MenuItem,
  EntryGlobalContent,
} from "~/types/Contentful";

const client = contentful.createClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || "",
  space: import.meta.env.VITE_CONTENTFUL_SPACE || "",
});

export const getPageContent = () => {
  return client
    .getEntries<Page>({
      content_type: "page",
    })
    .then((r) => r.items);
};

export const getContentByPath = async (path: string) => {
  const pageResults = await client.getEntries<Page>({
    content_type: "page",
    "fields.path": path,
  });

  if (pageResults.items.length === 0) {
    return null;
  }

  return pageResults.items[0];
};

export function getEntryById<T>(id: string) {
  return client.getEntry<T>(id);
}

export const getGlobalContent =
  async (): Promise<EntryGlobalContent | null> => {
    const response = await client.getEntries<GlobalContent>({
      content_type: "globalContent",
    });

    if (response.items.length === 0) {
      return null;
    }

    // nested references are minimized after two layers.
    const populateMenuItems = async (menu: EntryMenu): Promise<EntryMenu> => {
      const populatedMenuItems = await Promise.all(
        menu.fields.menuItems.map((menuItem) =>
          getEntryById<MenuItem>(menuItem.sys.id)
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
  };
