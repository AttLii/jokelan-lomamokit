"use client";
import { useMemo } from "react";
import type { ParsedEntryCabin } from "../parsers/contentful";
import { Ban, Box, Cigarette, CigaretteOff, Dog, DoubleBed, Hammer, LayoutGrid, Phone, Users } from "./icons/lucide";
import Section from "./Section";
import Container from "./Container";
import CabinGallery from "./CabinGallery";
import OpenStreetMapEmbed from "./OpenStreetMapEmbed";
import ActionLink from "./ActionLink";
import useT from "../hooks/useT";

type Props = {
  content: ParsedEntryCabin,
}
export default function CabinContent({
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
}: Props) {
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

  const infoItems = useMemo(() => [
    {
      Icon: <Hammer />,
      Content: <>{builtLabel} {yearBuilt}</>
    },
    {
      Icon: <Users />,
      Content: <>{occupancyLabel} {occupancy}</>,
    },
    {
      Icon: <Box />,
      Content: <>{floorSize} {squaredLabel}</>,
    },
    {
      Icon: <LayoutGrid />,
      Content: <>{roomsLabel} {numberOfRooms}</>,
    },
    {
      Icon: <DoubleBed />,
      Content: <>{bedroomsLabel} {numberOfBedrooms}</>,
    },
    {
      Icon: petsAllowed ? <Dog /> : <Ban />,
      Content: petsAllowed ? <>{petsAllowedLabel}</> : <>{petsNotAllowedLabel}</>
    },
    {
      Icon: smokingAllowed ? <Cigarette /> : <CigaretteOff />,
      Content: smokingAllowed ? <>{smokingAllowedLabel}</> : <>{smokingNotAllowedLabel}</>
    },
    {
      Icon: <Phone />,
      Content:
        <a className="underline hover:no-underline focus:no-underline" href={`tel:${telephone}`}>
          {telephone}
        </a>
    },
  ], [bedroomsLabel, builtLabel, floorSize, numberOfBedrooms, numberOfRooms, occupancy, occupancyLabel, petsAllowed, petsAllowedLabel, petsNotAllowedLabel, roomsLabel, smokingAllowed, smokingAllowedLabel, smokingNotAllowedLabel, squaredLabel, telephone, yearBuilt]);
  return (
    <>
      <Section>
        <Container type="wide" className="flex flex-wrap flex-col md:flex-row gap-4 relative">
          <h1 className="w-full text-6xl font-display font-bold">{name}</h1>
          <div className="w-full md:w-9/12 flex flex-col gap-4">
            <CabinGallery gallery={gallery} />
            <h2 className="text-4xl font-display font-bold">
              {titleLabel}
            </h2>
            <ul className="flex flex-col gap-1 font-sans">
              {infoItems.map(({ Content, Icon }, i) => (
                <li key={i} className="flex flex-nowrap items-center gap-2">
                  {Icon} {Content}
                </li>
              ))}
            </ul>
            <h2 className="text-4xl font-display font-bold">
              {locationTitleLabel}
            </h2>
            <OpenStreetMapEmbed
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
}