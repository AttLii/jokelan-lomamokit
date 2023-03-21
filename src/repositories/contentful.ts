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
