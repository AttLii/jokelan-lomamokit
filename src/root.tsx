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
      </head>
      <body>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
