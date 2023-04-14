import { component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/RouterHead";

import "./global.css";

export type UiStore = {
  nav: boolean
}
export const UiContext = createContextId<UiStore>('ui');

export default component$(() => {
  const uiStore = useStore<UiStore>({ nav: false });
  useContextProvider(UiContext, uiStore);
  return (
    <QwikCityProvider>
      <head>
        <RouterHead />
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,700;1,400;1,700&family=PT+Sans:wght@700&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,700;1,400;1,700&family=PT+Sans:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body class={uiStore.nav ? "overflow-hidden" : ""}>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
