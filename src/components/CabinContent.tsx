import type { FC } from "react";
import type { ParsedEntryCabin } from "../parsers/contentful";
import type { ApartmentJsonLD } from "../parsers/seo";
import { useT } from "../contexts/stringTranslations";
import { Ban, Box, Cigarette, CigaretteOff, Dog, DoubleBed, Hammer, LayoutGrid, Phone, Users } from "./icons/lucide";
import Section from "./Section";
import Container from "./Container";
import CabinGallery from "./CabinGallery";
import OpenStreetMapEmbed from "./OpenStreetMapEmbed";
import StarRating from "./StarRating";
import ActionLink from "./ActionLink";

type Props = {
  content: ParsedEntryCabin,
  jsonld: ApartmentJsonLD
}
const CabinContent: FC<Props> = ({
  content: {
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
  },
  jsonld
}) => {
  const averageLabel = useT('cabin.reviews.average');
  const countLabel = useT('cabin.reviews.count');
  const titleLabel = useT('cabin.information.title');
  const builtLabel = useT('cabin.year.built');
  const occupancyLabel = useT('cabin.occupancy');
  const squaredLabel = useT('generic.meter.squared');
  const roomsLabel = useT('cabin.number.of.rooms');
  const bedroomsLabel = useT('cabin.number.of.bedrooms');
  const petsAllowedLabel = useT('cabin.pets.allowed');
  const petsNotAllowedLabel = useT('cabin.pets.not.allowed');
  const smokingAllowedLabel = useT('cabin.smoking.allowed');
  const smokingNotAllowedLabel = useT('cabin.smoking.not.allowed');
  const locationTitleLabel = useT('cabin.location.title');
  const locationLabel = useT('cabin.map.location');
  const actionLinkLabel = useT('cabin.action.link.text');
  const actionLinkDisabledLabel = useT('cabin.action.link.disabled.help');
  return (
    <>
      <Section>
        <Container type="wide" className="flex flex-wrap flex-col md:flex-row gap-4 relative">
          <div className="w-full">
            <h1 className="text-6xl font-display font-bold">{name}</h1>
            {jsonld.aggregateRating && (
              <div className="flex gap-2 items-center font-sans">
                <StarRating rating={jsonld.aggregateRating.ratingValue} />
                <span className="sr-only">
                  {averageLabel}
                  {jsonld.aggregateRating.ratingValue}
                </span>
                <p>
                  <span className="sr-only">
                    {countLabel}
                  </span>
                  {" "}
                  ({jsonld.aggregateRating.reviewCount})
                </p>
              </div>
            )}
          </div>
          <div className="w-full md:w-9/12 flex flex-col gap-4">
            <CabinGallery key={name} gallery={gallery} />
            <h2 className="text-4xl font-display font-bold">
              {titleLabel}
            </h2>
            <ul className="flex flex-col gap-1 font-sans">
              <li className="flex flex-nowrap items-center gap-2">
                <Hammer />
                {builtLabel} {yearBuilt}
              </li>
              <li className="flex flex-nowrap items-center gap-2">
                <Users />
                {occupancyLabel} {occupancy}
              </li>

              <li className="flex flex-nowrap items-center gap-2">
                <Box />
                {floorSize} {squaredLabel}
              </li>
              <li className="flex flex-nowrap items-center gap-2">
                <LayoutGrid />
                {roomsLabel} {numberOfRooms}
              </li>
              <li className="flex flex-nowrap items-center gap-2">
                <DoubleBed />
                {bedroomsLabel} {numberOfBedrooms}
              </li>
              <li className="flex flex-nowrap items-center gap-2">
                {petsAllowed
                  ? (
                    <>
                      <Dog />
                      {petsAllowedLabel}
                    </>
                  ) : (
                    <>
                      <Ban />
                      {petsNotAllowedLabel}
                    </>
                  )}
              </li>
              <li className="flex flex-nowrap items-center gap-2">
                {smokingAllowed
                  ? (
                    <>
                      <Cigarette />
                      {smokingAllowedLabel}
                    </>
                  ) : (
                    <>
                      <CigaretteOff />
                      {smokingNotAllowedLabel}
                    </>
                  )}
              </li>
              <li className="flex flex-nowrap items-center gap-2">
                <Phone />
                <a className="underline hover:no-underline focus:no-underline" href={`tel:${telephone}`}>{telephone}</a>
              </li>
            </ul>

            <h2 className="text-4xl font-display font-bold">
              {locationTitleLabel}
            </h2>
            <OpenStreetMapEmbed
              key={name}
              title={locationLabel}
              location={location}
            />
          </div>
          <aside className="h-auto relative">
            <div className="sticky left-0 top-16">
              <ActionLink href={tourBookingPage ?? ""}>
                {actionLinkLabel} {name}
              </ActionLink>
              {!tourBookingPage && (
                <p className="font-sans text-sm mt-1">{actionLinkDisabledLabel}</p>
              )}
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
};

export default CabinContent;