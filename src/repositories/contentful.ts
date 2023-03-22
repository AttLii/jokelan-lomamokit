import contentful from "contentful";
import type { Page } from "~/types/Contentful";

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
    "fields.path[match]": path,
  });

  if (pageResults.items.length === 0) {
    return null;
  }

  return pageResults.items[0];
};
