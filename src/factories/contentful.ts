import contentful from "contentful";
import { Contentful } from "~/repositories/contentful";

const client = contentful.createClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || "",
  space: import.meta.env.VITE_CONTENTFUL_SPACE || "",
});
export const appContentful = new Contentful(client);
