import type { MetadataRoute } from "next";
import { buildLocalUrlFromRelativePath } from "../utils/seo";
import allContent from "../prevals/allContent.preval";

export default function robots(): MetadataRoute.Robots {
  const disallow: string[] = [];
  for (const content of allContent) {
    if (
      content.seoFields.robots.includes("noindex") ||
      content.seoFields.robots.includes("nofollow")
    ) {
      disallow.push(content.path);
    }
  }

  return {
    rules: {
      userAgent: "*",
      disallow,
    },
    sitemap: buildLocalUrlFromRelativePath("/sitemap.xml"),
  };
}
