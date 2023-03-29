import type { PluginOption } from "vite";
import { Contentful } from "../repositories/contentful";
import * as contentful from "contentful";

export async function transformStringTranslations(): Promise<PluginOption> {
  const client = contentful.createClient({
    accessToken: process.env.VITE_CONTENTFUL_ACCESS_TOKEN || "",
    space: process.env.VITE_CONTENTFUL_SPACE || "",
  });
  const api = new Contentful(client);
  const _translations = await api.getTranslations();

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
