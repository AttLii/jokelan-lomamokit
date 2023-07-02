import type { MetadataRoute } from "next";
import allContent from "../prevals/allContent.preval";
import { buildLocalUrlFromRelativePath } from "../utils/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return allContent.map((content) => {
    return {
      url: buildLocalUrlFromRelativePath(content.path),
    };
  });
}
