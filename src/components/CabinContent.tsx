'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import type { ParsedEntryCabin } from '../parsers/contentful';
import {
  Ban,
  Box,
  Cigarette,
  CigaretteOff,
  Dog,
  DoubleBed,
  Hammer,
  LayoutGrid,
  Phone,
  Users,
} from './icons/lucide';
import Section from './Section';
import Container from './Container';
import CabinGallery from './CabinGallery';
import OpenStreetMapEmbed from './OpenStreetMapEmbed';
import ActionLink from './ActionLink';
import useT from '../hooks/useT';
import globalContent from '../prevals/globalContent.preval';

type Props = {
  content: ParsedEntryCabin;
};
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
    gallery,
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
  const cabinDistancesTitle = useT('cabin.distances.title');
  const cabinDistancesDescription = useT('cabin.distances.description');
  const cabinDistancesLinkSuffix = useT('cabin.distances.link.suffix');

  const infoItems = useMemo(
    () => [
      {
        Icon: <Hammer />,
        Content: (
          <>
            {builtLabel} {yearBuilt}
          </>
        ),
      },
      {
        Icon: <Users />,
        Content: (
          <>
            {occupancyLabel} {occupancy}
          </>
        ),
      },
      {
        Icon: <Box />,
        Content: (
          <>
            {floorSize} {squaredLabel}
          </>
        ),
      },
      {
        Icon: <LayoutGrid />,
        Content: (
          <>
            {roomsLabel} {numberOfRooms}
          </>
        ),
      },
      {
        Icon: <DoubleBed />,
        Content: (
          <>
            {bedroomsLabel} {numberOfBedrooms}
          </>
        ),
      },
      {
        Icon: petsAllowed ? <Dog /> : <Ban />,
        Content: petsAllowed ? (
          <>{petsAllowedLabel}</>
        ) : (
          <>{petsNotAllowedLabel}</>
        ),
      },
      {
        Icon: smokingAllowed ? <Cigarette /> : <CigaretteOff />,
        Content: smokingAllowed ? (
          <>{smokingAllowedLabel}</>
        ) : (
          <>{smokingNotAllowedLabel}</>
        ),
      },
      {
        Icon: <Phone />,
        Content: (
          <a
            className='underline hover:no-underline focus:no-underline'
            href={`tel:${telephone}`}
          >
            {telephone}
          </a>
        ),
      },
    ],
    [
      bedroomsLabel,
      builtLabel,
      floorSize,
      numberOfBedrooms,
      numberOfRooms,
      occupancy,
      occupancyLabel,
      petsAllowed,
      petsAllowedLabel,
      petsNotAllowedLabel,
      roomsLabel,
      smokingAllowed,
      smokingAllowedLabel,
      smokingNotAllowedLabel,
      squaredLabel,
      telephone,
      yearBuilt,
    ]
  );
  return (
    <>
      <Section>
        <Container
          type='wide'
          className='relative flex flex-col flex-wrap gap-4 md:flex-row'
        >
          <h1 className='w-full font-display text-6xl font-bold'>{name}</h1>
          <div className='flex w-full flex-col gap-4 md:w-9/12'>
            <CabinGallery gallery={gallery} />
            <h2 className='font-display text-4xl font-bold'>{titleLabel}</h2>
            <ul className='flex flex-col gap-1 font-sans'>
              {infoItems.map(({ Content, Icon }, i) => (
                <li key={i} className='flex flex-nowrap items-center gap-2'>
                  {Icon} {Content}
                </li>
              ))}
            </ul>
            {globalContent.cabinsPage && (
              <div className='rich-text'>
                <h2 className='font-display text-4xl font-bold'>
                  {cabinDistancesTitle}
                </h2>
                <p>
                  {cabinDistancesDescription}{' '}
                  <Link href={globalContent.cabinsPage.path}>
                    {globalContent.cabinsPage.title}
                  </Link>
                  {cabinDistancesLinkSuffix}
                </p>
              </div>
            )}
            <h2 className='font-display text-4xl font-bold'>
              {locationTitleLabel}
            </h2>
            <OpenStreetMapEmbed title={locationLabel} location={location} />
          </div>
          <aside className='relative h-auto'>
            <div className='sticky left-0 top-16'>
              <ActionLink href={tourBookingPage ?? ''}>
                {actionLinkLabel} {name}
              </ActionLink>
              {!tourBookingPage && (
                <p className='mt-1 font-sans text-sm'>
                  {actionLinkDisabledLabel}
                </p>
              )}
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
