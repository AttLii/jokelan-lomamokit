import { component$, Slot, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { appContentful } from "~/factories/contentful";
import { parseGlobalContent } from "~/parsers/contentful";
import { UiContext } from "~/root";
import { SkipToContent } from "~/components/SkipToContent";
import type { ParsedGlobalContent } from "~/parsers/contentful";
import type { Signal } from "@builder.io/qwik";

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

  const { headerMenu, footerMenu, structuredData, email, location: _location, telephone } = globalContent.value

  return (
    <>
      <SkipToContent focusElement={main} />
      <Header menu={headerMenu} />
      <main tabIndex={-1} ref={main} class="min-h-screen pt-14">
        <Slot />
      </main>
      <Footer menu={footerMenu} email={email} location={_location} telephone={telephone} />
      {structuredData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={structuredData} />
      )}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Apartment",
          "name": "227  Lynn Street - Medium apartment",
          "description": "Great downtown accommodation for family or group of friends.",
          "numberOfRooms": 3,
          "occupancy": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 4
          },
          "floorLevel": 5,
          "floorSize": {
            "@type": "QuantitativeValue",
            "value": 81,
            "unitCode": "MTK"
          },
          "numberOfBathroomsTotal": 2,
          "numberOfBedrooms": 2,
          "petsAllowed": true,
          "tourBookingPage": "http://example.com",
          "yearBuilt": 2005,
          "telephone": "+1-617-312-9783",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US",
            "addressLocality": "West Roxbury",
            "addressRegion": "MA",
            "postalCode": "02132",
            "streetAddress": "227  Lynn Street"
          },
          "latitude": 42.2742,
          "longitude": -71.1430
        })}
      </script>
    </>
  );
});
