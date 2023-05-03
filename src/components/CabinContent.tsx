import { component$ } from "@builder.io/qwik";
import { Container } from "./Container";
import { OpenStreetMapEmbed } from "./OpenStreetMapEmbed";
import { Section } from "./Section";
import { CabinGallery } from "./CabinGallery";
import { TourBookingPageLink } from "./TourBookingPageLink";
import { StarRating } from "./StarRating";
import { DoubleBed } from "./icons/lucide/DoubleBed";
import { Box } from "./icons/lucide/Box";
import { Cigarette } from "./icons/lucide/Cigarette";
import { CigaretteOff } from "./icons/lucide/CigaretteOff";
import { Phone } from "./icons/lucide/Phone";
import { Dog } from "./icons/lucide/Dog";
import { Hammer } from "./icons/lucide/Hammer";
import { Users } from "./icons/lucide/Users";
import { ThumbsUp } from "./icons/lucide/ThumbsUp";
import { LayoutGrid } from "./icons/lucide/LayoutGrid";
import { Ban } from "./icons/lucide/Ban";
import { t } from "~/stores/translation";
import type { ParsedCabin } from "~/parsers/contentful";
import type { Reviews } from "~/repositories/lomarengas";

type Props = {
  content: ParsedCabin
  reviews: Reviews | null
}
export const CabinContent = component$(({
  content,
  reviews
}: Props) => {
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

  const count = reviews?.averageRating?.count
  const average = reviews?.averageRating?.average
  const recommendsCount = reviews?.recommendsCount
  const totalCountRecommendations = reviews?.totalCountRecommendations
  return (
    <>
      <Section>
        <Container type="wide" class="flex flex-wrap flex-col md:flex-row gap-4 relative">
          <div class="w-full">
            <h1 class="text-6xl font-display font-bold">{name}</h1>
            {count && average && (
              <div class="flex gap-2 items-center">
                <StarRating rating={average} />
                <span class="sr-only">
                  {t('cabin.reviews.average')}
                  {average}
                </span>
                <p>
                  <span class="sr-only">
                    {t('cabin.reviews.count')}
                  </span>
                  {" "}
                  ({count})
                </p>
              </div>
            )}
          </div>
          <div class="w-full md:w-9/12 flex flex-col gap-4">
            <CabinGallery gallery={gallery} />
            <h2 class="text-4xl font-display font-bold">{t('cabin.information.title')}</h2>
            <ul class="flex flex-col gap-1">
              {recommendsCount && totalCountRecommendations && (
                <li class="flex flex-nowrap items-center gap-2">
                  <ThumbsUp />
                  {Math.round(recommendsCount / totalCountRecommendations * 100)}%
                  {" "}
                  {t('cabin.review.recommendation')}
                </li>
              )}
              <li class="flex flex-nowrap items-center gap-2">
                <Hammer />
                {t('cabin.year.built')} {yearBuilt}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <Users />
                {t('cabin.occupancy')} {occupancy}
              </li>

              <li class="flex flex-nowrap items-center gap-2">
                <Box />
                {floorSize} {t('generic.meter.squared')}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LayoutGrid />
                {t('cabin.number.of.rooms')} {numberOfRooms}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <DoubleBed />
                {t('cabin.number.of.bedrooms')} {numberOfBedrooms}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                {petsAllowed
                  ? (
                    <>
                      <Dog />
                      {t('cabin.pets.allowed')}
                    </>
                  ) : (
                    <>
                      <Ban />
                      {t('cabin.pets.not.allowed')}
                    </>
                  )}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                {smokingAllowed
                  ? (
                    <>
                      <Cigarette />
                      {t('cabin.smoking.allowed')}
                    </>
                  ) : (
                    <>
                      <CigaretteOff />
                      {t('cabin.smoking.not.allowed')}
                    </>
                  )}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <Phone />
                <a class="underline hover:no-underline focus:no-underline" href={`tel:${telephone}`}>{telephone}</a>
              </li>
            </ul>

            <h2 class="text-4xl font-display font-bold">{t('cabin.location.title')}</h2>
            <OpenStreetMapEmbed
              title={t('cabin.map.location')}
              location={location}
            />
          </div>
          <aside class="h-auto relative">
            <TourBookingPageLink class="sticky left-0 top-16" tourBookingPage={tourBookingPage} name={name} />
          </aside>
        </Container>
      </Section>
    </>
  )
})