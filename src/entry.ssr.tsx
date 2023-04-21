/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import { appContentful } from "./factories/contentful";
import { parseTranslations } from "./parsers/contentful";

export default async function (opts: RenderToStreamOptions) {
  const translations = await appContentful
    .getTranslations()
    .then(parseTranslations)
    .catch(() => {
      process.exit(1)
    })
  return renderToStream(<Root translations={translations} />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "fi-FI",
      ...opts.containerAttributes,
    },
  });
}
