import { component$ } from "@builder.io/qwik";
import { LuBedDouble, LuBox, LuCigarette, LuCigaretteOff, LuCircleSlashed, LuDog, LuHammer, LuLayoutGrid, LuPhone, LuUsers } from "@qwikest/icons/lucide";
import { Container } from "./Container";
import { OpenStreetMapEmbed } from "./OpenStreetMapEmbed";
import { Section } from "./Section";
import { CabinGallery } from "./CabinGallery";
import { TourBookingPageLink } from "./TourBookingPageLink";
import { parsedCabinToApartmentJsonLD } from "~/utils/seo";
import { translations } from "~/constants/translations";
import type { ParsedCabin } from "~/parsers/contentful";

type Props = {
  content: ParsedCabin
}
export const CabinPage = component$(({
  content
}: Props) => {
  const jsonLD = parsedCabinToApartmentJsonLD(content)
  const {
    name,
    location,
    tourBookingPage,
    floorSize,
    petsAllowed,
    numberOfRooms,
    numberOfBedrooms,
    yearBuilt,
    smokingAllowed,
    occupancy,
    telephone,
    gallery
  } = content
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLD)} />
      <Section>
        <Container type="wide" _class="flex flex-wrap flex-col md:flex-row gap-4 relative">
          <h1 class="w-full text-6xl font-display">{name}</h1>
          <div class="w-full md:w-9/12 flex flex-col gap-4">
            <CabinGallery gallery={gallery} />
            <h2 class="text-4xl font-display">{translations.cabinInformationTitle}</h2>
            <ul class="flex flex-col gap-1">
              <li class="flex flex-nowrap items-center gap-2">
                <LuHammer />
                {translations.cabinYearBuilt} {yearBuilt}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuUsers />
                {translations.cabinOccupancy} {occupancy}
              </li>

              <li class="flex flex-nowrap items-center gap-2">
                <LuBox />
                {floorSize} {translations.genericMeterSquared}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuLayoutGrid />
                {translations.cabinNumberOfRooms} {numberOfRooms}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuBedDouble />
                {translations.cabinNumberOfBedrooms} {numberOfBedrooms}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                {petsAllowed
                  ? (
                    <>
                      <LuDog />
                      {translations.cabinPetsAllowed}
                    </>
                  ) : (
                    <>
                      <LuCircleSlashed />
                      {translations.cabinPetsNotAllowed}
                    </>
                  )}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                {smokingAllowed
                  ? (
                    <>
                      <LuCigarette />
                      {translations.cabinSmokingAllowed}
                    </>
                  ) : (
                    <>
                      <LuCigaretteOff />
                      {translations.cabinSmokingNotAllowed}
                    </>
                  )}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuPhone />
                <a class="underline hover:no-underline focus:no-underline" href={`tel:${telephone}`}>{telephone}</a>
              </li>
            </ul>

            <h2 class="text-4xl font-display">{translations.cabinLocationTitle}</h2>
            <OpenStreetMapEmbed
              title={translations.cabinMapLocation}
              location={location}
            />
          </div>
          <aside class="w-auto">
            <TourBookingPageLink tourBookingPage={tourBookingPage} name={name} />
          </aside>
        </Container>
      </Section>
    </>
  )
})