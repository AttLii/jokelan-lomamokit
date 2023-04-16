import { component$ } from "@builder.io/qwik";
import { translations } from "~/constants/translations";
import type { ParsedCabin } from "~/parsers/contentful";
import { parsedCabinToApartmentJsonLD } from "~/utils/seo";
import { ActionLink } from "./ActionLink";
import { Container } from "./Container";
import { OpenStreetMapEmbed } from "./OpenStreetMapEmbed";
import { Section } from "./Section";
import { LuBedDouble, LuBox, LuCigarette, LuCigaretteOff, LuCircleSlashed, LuDog, LuHammer, LuLayoutGrid, LuPhone, LuUsers } from "@qwikest/icons/lucide";

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
  } = content
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLD)} />
      <Section>
        <Container type="wide" _class="flex flex-nowrap flex-col md:flex-row gap-4, ">
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
            <ul class="flex flex-col gap-1">
              <li class="flex flex-nowrap items-center gap-2">
                <LuHammer />
                {yearBuilt} {translations.cabinYearBuilt}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuUsers />
                {occupancy} {translations.cabinOccupancy}
              </li>

              <li class="flex flex-nowrap items-center gap-2">
                <LuBox />
                {floorSize} {translations.genericMeterSquared}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuLayoutGrid />
                {numberOfRooms} {translations.cabinNumberOfRooms}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuBedDouble />
                {numberOfBedrooms} {translations.cabinNumberOfBedrooms}
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