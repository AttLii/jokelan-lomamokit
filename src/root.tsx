import { component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/RouterHead";
import type { ParsedTranslationsContent } from "./parsers/contentful";

import "./global.scss";

export type UiStore = {
  nav: boolean
}
export const UiContext = createContextId<UiStore>('ui');
export const TranslationContext = createContextId<ParsedTranslationsContent>('translations');

type Props = {
  translations: ParsedTranslationsContent;
}
export default component$<Props>(({ translations }) => {
  const uiStore = useStore<UiStore>({ nav: false });
  useContextProvider(UiContext, uiStore);

  const translationStore = useStore<ParsedTranslationsContent>(translations)
  useContextProvider(TranslationContext, translationStore);

  const scrollLockClass = uiStore.nav ? "overflow-hidden sm:overflow-auto" : ""
  return (
    <QwikCityProvider>
      <head>
        <RouterHead />
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,700;1,400;1,700&family=PT+Sans:wght@700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,700;1,400;1,700&family=PT+Sans:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body class={`${scrollLockClass} min-h-screen bg-[#f7f7f7] flex flex-col`}>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
