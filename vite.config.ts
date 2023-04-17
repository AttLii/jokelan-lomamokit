import * as dotenv from 'dotenv'
dotenv.config()
import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { transformStringTranslations } from "./src/plugins/transformStringTranslations"
import tsconfigPaths from 'vite-tsconfig-paths';
import legacy from "@vitejs/plugin-legacy"

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({
        trailingSlash: false
      }),
      qwikVite(),
      tsconfigPaths(),
      transformStringTranslations(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
    ],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
