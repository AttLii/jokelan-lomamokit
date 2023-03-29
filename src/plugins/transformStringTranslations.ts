import type { PluginOption } from "vite";

export async function transformStringTranslations(): Promise<PluginOption> {
  return {
    name: "transform-file",
    transform(content) {
      return content.replace("nav.open", "avaa");
    },
  };
}
