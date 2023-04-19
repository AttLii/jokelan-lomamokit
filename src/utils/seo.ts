import type { Breadcrumb, ParsedCabin } from "~/parsers/contentful";
import type { Reviews } from "~/repositories/lomarengas";

const parseAggregatedRating = ({ average, count }: Reviews, name: string) => {
  return {
    "@type": "AggregateRating",
    ratingValue: average / 2, // lomarengas returns the average from 0-10, json-ld expects 0-5
    reviewCount: count,
    itemReviewed: name,
  };
};

export const parsedCabinToApartmentJsonLD = (
  {
    name,
    description,
    numberOfRooms,
    occupancy,
    floorLevel,
    floorSize,
    numberOfBathroomsTotal,
    numberOfBedrooms,
    petsAllowed,
    tourBookingPage,
    yearBuilt,
    telephone,
    addressCountry,
    addressLocality,
    addressRegion,
    postalCode,
    streetAddress,
    seoFields,
    location: { lat, lon },
    smokingAllowed,
  }: ParsedCabin,
  reviews: Reviews | null
) => {
  const [minValue, maxValue] = occupancy.split("-").map(Number);
  const aggregateRating = reviews
    ? parseAggregatedRating(reviews, name)
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name,
    description,
    image: seoFields.image.src,
    numberOfRooms,
    occupancy: {
      "@type": "QuantitativeValue",
      minValue,
      maxValue,
    },
    floorLevel,
    floorSize: {
      "@type": "QuantitativeValue",
      value: floorSize,
      unitCode: "MTK",
    },
    numberOfBathroomsTotal,
    numberOfBedrooms,
    petsAllowed,
    tourBookingPage,
    yearBuilt,
    telephone,
    address: {
      "@type": "PostalAddress",
      contactType: "customer service",
      addressCountry,
      addressLocality,
      addressRegion,
      postalCode,
      streetAddress,
    },
    latitude: lat,
    longitude: lon,
    smokingAllowed,
    aggregateRating,
  };
};

export const parseBreadcrumbsToJsonLD = (breadcrumbs: Breadcrumb[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(({ name, path }, i) => {
      const item = import.meta.env.VITE_ORIGIN + (path === "/" ? "" : path);
      return {
        "@type": "ListItem",
        position: i + 1,
        name,
        item,
      };
    }),
  };
};
