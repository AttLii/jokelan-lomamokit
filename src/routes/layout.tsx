import { component$, Slot, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { SkipToContent } from "~/components/SkipToContent";
import { GlobalContentContext, UiContext } from "~/root";

export default component$(() => {
  const { structuredData } = useContext(GlobalContentContext)
  const main = useSignal<HTMLElement>()
  const ui = useContext(UiContext);
  const location = useLocation();

  // close nav on path change
  useVisibleTask$(({ track }) => {
    track(() => location.url)
    ui.nav = false;
    (document.activeElement as HTMLElement)?.blur()
  })

  return (
    <>
      <SkipToContent focusElement={main} />
      <Header />
      <main tabIndex={-1} ref={main} class="pt-14 flex-1">
        <Slot />
      </main>
      <Footer />
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={structuredData} />
      )}
    </>
  );
});
