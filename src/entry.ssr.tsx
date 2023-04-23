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
import { parseGlobalContent, parseTranslations } from "./parsers/contentful";
import { translationsSchema } from "./stores/translation";

export default async function (opts: RenderToStreamOptions) {
  const [translations, globalContent] = await Promise.all([
    appContentful.getTranslations().then(parseTranslations).then(translationsSchema.parse),
    appContentful.getGlobalContent().then(r => {
      if (!r) throw new Error('Error happened while fetching global content failed')
      return parseGlobalContent(r)
    })
  ])
    .catch(() => {
      process.exit(1)
    })

  return renderToStream(<Root translations={translations} globalContent={globalContent} />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "fi",
      ...opts.containerAttributes,
    },
  });
}
