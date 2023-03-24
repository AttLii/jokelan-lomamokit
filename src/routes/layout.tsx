import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { parseGlobalContent } from "~/parsers/contentful";
import type { ParsedGlobalContent } from "~/parsers/contentful";
import { getGlobalContent } from "~/repositories/contentful";

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
  const hi = useGlobalContent()
  return (
    <>
      <header>
      </header>
      <main>
        {JSON.stringify(hi.value, null, 2)}
        <Slot />
      </main>
      <footer>
      </footer>
    </>
  );
});
