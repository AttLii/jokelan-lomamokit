import * as contentful from "contentful";
import Contentful from "../repositories/contentful";

const previewClient = new Contentful(
  contentful.createClient({
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    space: process.env.CONTENTFUL_SPACE,
    host: "preview.contentful.com",
  }).withoutUnresolvableLinks
);

export default previewClient;
