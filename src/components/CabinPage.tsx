import { component$ } from "@builder.io/qwik";
import { LuBedDouble, LuBox, LuCigarette, LuCigaretteOff, LuCircleSlashed, LuDog, LuHammer, LuLayoutGrid, LuPhone, LuUsers } from "@qwikest/icons/lucide";
import { ActionLink } from "./ActionLink";
import { Container } from "./Container";
import { OpenStreetMapEmbed } from "./OpenStreetMapEmbed";
import { Section } from "./Section";
import { parsedCabinToApartmentJsonLD } from "~/utils/seo";
import { CabinGallery } from "./CabinGallery";
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
        <Container type="wide" _class="flex flex-nowrap flex-col md:flex-row gap-4">
          <div class="hidden md:block md:order-last md:w-3/12">
            {tourBookingPage
              ? <ActionLink href={tourBookingPage}>{translations.cabinActionLinkText} {name}</ActionLink>
              : (
                <>
                  <ActionLink href="#" disabled>{translations.cabinActionLinkText} {name}</ActionLink>
                  <p class="text-sm mt-1">{translations.cabinActionLinkDisabledHelp}</p>
                </>
              )
            }
          </div>
          <div class="md:w-9/12 flex flex-col gap-4">
            <CabinGallery gallery={gallery} />
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
                <a href={`tel:${telephone}`}>{telephone}</a>
              </li>
            </ul>
            <OpenStreetMapEmbed
              title={translations.cabinMapLocation}
              location={location}
            />
          </div>
        </Container>

      </Section>
    </>
  )
})