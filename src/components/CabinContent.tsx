import { component$ } from "@builder.io/qwik";
import { LuBedDouble, LuBox, LuCigarette, LuCigaretteOff, LuCircleSlashed, LuDog, LuHammer, LuLayoutGrid, LuPhone, LuThumbsUp, LuUsers } from "@qwikest/icons/lucide";
import { Container } from "./Container";
import { OpenStreetMapEmbed } from "./OpenStreetMapEmbed";
import { Section } from "./Section";
import { CabinGallery } from "./CabinGallery";
import { TourBookingPageLink } from "./TourBookingPageLink";
import { StarRating } from "./StarRating";
import { parsedCabinToApartmentJsonLD } from "~/utils/seo";
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

  const count = reviews?.averageRating?.count
  const average = reviews?.averageRating?.average
  const recommendsCount = reviews?.recommendsCount
  const totalCountRecommendations = reviews?.totalCountRecommendations
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLD)} />
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
                  <LuThumbsUp />
                  {Math.round(recommendsCount / totalCountRecommendations * 100)}%
                  {" "}
                  {t('cabin.review.recommendation')}
                </li>
              )}
              <li class="flex flex-nowrap items-center gap-2">
                <LuHammer />
                {t('cabin.year.built')} {yearBuilt}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuUsers />
                {t('cabin.occupancy')} {occupancy}
              </li>

              <li class="flex flex-nowrap items-center gap-2">
                <LuBox />
                {floorSize} {t('generic.meter.squared')}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuLayoutGrid />
                {t('cabin.number.of.rooms')} {numberOfRooms}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuBedDouble />
                {t('cabin.number.of.bedrooms')} {numberOfBedrooms}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                {petsAllowed
                  ? (
                    <>
                      <LuDog />
                      {t('cabin.pets.allowed')}
                    </>
                  ) : (
                    <>
                      <LuCircleSlashed />
                      {t('cabin.pets.not.allowed')}
                    </>
                  )}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                {smokingAllowed
                  ? (
                    <>
                      <LuCigarette />
                      {t('cabin.smoking.allowed')}
                    </>
                  ) : (
                    <>
                      <LuCigaretteOff />
                      {t('cabin.smoking.not.allowed')}
                    </>
                  )}
              </li>
              <li class="flex flex-nowrap items-center gap-2">
                <LuPhone />
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