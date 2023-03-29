import type { PluginOption } from "vite";
import { Contentful } from "../repositories/contentful";

export async function transformStringTranslations(): Promise<PluginOption> {
  const contentful = new Contentful(
    process.env.VITE_CONTENTFUL_ACCESS_TOKEN || "",
    process.env.VITE_CONTENTFUL_SPACE || ""
  );

  const _translations = await contentful.getTranslations();

  const translations = _translations.reduce(
    (acc, { fields: { slug, translation } }) => {
      acc[slug] = translation;
      return acc;
    },
    {} as Record<string, string>
  );

  const regex = new RegExp(Object.keys(translations).join("|"), "g");
  return {
    name: "transform-file",
    transform(content) {
      return content.replace(regex, (match) => translations[match]);
    },
  };
}
