import { component$, Slot, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { appContentful } from "~/factories/contentful";
import { parseGlobalContent } from "~/parsers/contentful";
import { UiContext } from "~/root";
import type { ParsedGlobalContent } from "~/parsers/contentful";
import type { Signal } from "@builder.io/qwik";
import { SkipToContent } from "~/components/SkipToContent";

export const useGlobalContent = routeLoader$(async ({ exit }) => {
  let globalContent: null | ParsedGlobalContent = null
  try {
    const _globalContent = await appContentful.getGlobalContent()
    if (!_globalContent) {
      exit() // TODO: better solution?
      return
    }

    globalContent = parseGlobalContent(_globalContent)
  } catch {
    exit()
    return
  }

  return globalContent
});

export default component$(() => {
  // casting type to ParsedGlobalContent
  // Qwik doesn't recognize that calling exit stops the build
  const globalContent = useGlobalContent() as Readonly<Signal<ParsedGlobalContent>>
  const main = useSignal<HTMLElement>()

  const ui = useContext(UiContext);
  const location = useLocation()

  // close nav on path change
  useVisibleTask$(({ track }) => {
    track(location)
    ui.nav = false
  })

  const { headerMenu, footerMenu, contactInformation, structuredData } = globalContent.value
  return (
    <>
      <SkipToContent focusElement={main} />
      <Header menu={headerMenu} />
      <main tabIndex={-1} ref={main} class="min-h-screen pt-14">
        <Slot />
      </main>
      <Footer menu={footerMenu} contactInformation={contactInformation} />
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={structuredData} />
      )}
    </>
  );
});
