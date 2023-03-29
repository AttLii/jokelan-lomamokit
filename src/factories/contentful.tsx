import { Contentful } from "~/repositories/contentful";

export const appContentful = new Contentful(
  import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || "",
  import.meta.env.VITE_CONTENTFUL_SPACE || ""
);