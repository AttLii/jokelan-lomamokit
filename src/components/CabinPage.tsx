import { component$ } from "@builder.io/qwik";
import { LuBedDouble, LuBox, LuCigarette, LuCigaretteOff, LuCircleSlashed, LuDog, LuHammer, LuLayoutGrid, LuPhone, LuThumbsUp, LuUsers } from "@qwikest/icons/lucide";
import { Container } from "./Container";
import { OpenStreetMapEmbed } from "./OpenStreetMapEmbed";
import { Section } from "./Section";
import { CabinGallery } from "./CabinGallery";
import { TourBookingPageLink } from "./TourBookingPageLink";
import { StarRating } from "./StarRating";
import { parsedCabinToApartmentJsonLD } from "~/utils/seo";
import { translations } from "~/constants/translations";
import type { ParsedCabin } from "~/parsers/contentful";
import type { Reviews } from "~/repositories/lomarengas";

type Props = {
  content: ParsedCabin
  reviews: Reviews | null
}
export const CabinPage = component$(({
  content,
  reviews
}: Props) => {
  const jsonLD = parsedCabinToApartmentJsonLD(content, reviews)
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
          <div class="w-full">
            <h1 class="text-6xl font-display font-bold">{name}</h1>
            {reviews && reviews.averageRating.count > 0 && (
              <div class="flex gap-2 items-center">
                <StarRating rating={reviews.averageRating.average} />
                <span class="sr-only">
                  {translations.cabinReviewsAverage}
                  {reviews.averageRating.average}
                </span>
                <p>
                  <span class="sr-only">
                    {translations.cabinReviewsCount}
                  </span>
                  {" "}
                  ({reviews.averageRating.count})
                </p>
              </div>
            )}
          </div>
          <div class="w-full md:w-9/12 flex flex-col gap-4">
            <CabinGallery gallery={gallery} />
            <h2 class="text-4xl font-display font-bold">{translations.cabinInformationTitle}</h2>
            <ul class="flex flex-col gap-1">
              {reviews && (
                <li class="flex flex-nowrap items-center gap-2">
                  <LuThumbsUp />
                  {Math.round(reviews.recommendsCount / reviews.totalCountRecommendations * 100)}%
                  {" "}
                  {translations.cabinReviewRecommendation}
                </li>
              )}
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

            <h2 class="text-4xl font-display font-bold">{translations.cabinLocationTitle}</h2>
            <OpenStreetMapEmbed
              title={translations.cabinMapLocation}
              location={location}
            />
          </div>
          <aside class="h-auto relative">
            <TourBookingPageLink _class="sticky left-0 top-16" tourBookingPage={tourBookingPage} name={name} />
          </aside>
        </Container>
      </Section>
    </>
  )
})