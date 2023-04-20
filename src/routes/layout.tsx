import { component$, Slot, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SkipToContent } from "~/components/SkipToContent";
import ErrorPage from "~/routes/404";
import { parseGlobalContent } from "~/parsers/contentful";
import { appContentful } from "~/factories/contentful";
import { UiContext } from "~/root";
import type { ParsedGlobalContent } from "~/parsers/contentful";

export const useGlobalContent = routeLoader$(async () => {
  let globalContent: null | ParsedGlobalContent = null
  try {
    const _globalContent = await appContentful.getGlobalContent()
    if (!_globalContent) return null

    globalContent = parseGlobalContent(_globalContent)
  } catch {
    console.log("Error: Couldn't load global content")
  }

  return globalContent
});

export default component$(() => {
  // casting type to ParsedGlobalContent
  // Qwik doesn't recognize that calling exit stops the build
  const globalContent = useGlobalContent()
  if (!globalContent.value) {
    return <ErrorPage />
  }

  const main = useSignal<HTMLElement>()
  const ui = useContext(UiContext);
  const location = useLocation()

  // close nav on path change
  useVisibleTask$(({ track }) => {
    track(() => location.url)
    ui.nav = false
  })

  const { headerMenu, footerMenu, structuredData, email, location: _location, telephone } = globalContent.value
  return (
    <>
      <SkipToContent focusElement={main} />
      <Header menu={headerMenu} />
      <main tabIndex={-1} ref={main} class="pt-14 flex-1">
        <Slot />
      </main>
      <Footer menu={footerMenu} email={email} location={_location} telephone={telephone} />
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={structuredData} />
      )}
    </>
  );
});
