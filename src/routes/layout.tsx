import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { getGlobalContent } from "~/repositories/contentful";
import { parseGlobalContent } from "~/parsers/contentful";
import type { ParsedGlobalContent } from "~/parsers/contentful";
import type { Signal } from "@builder.io/qwik";

export const useGlobalContent = routeLoader$(async ({ exit }) => {
  let globalContent: null | ParsedGlobalContent = null
  try {
    const _globalContent = await getGlobalContent()

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
  return (
    <>
      <Header menu={globalContent.value.headerMenu} />
      <main class="min-h-screen max-w-7xl mx-auto px-2 pt-6">
        <Slot />
      </main>
      <Footer menu={globalContent.value.footerMenu} />
    </>
  );
});
