import type { Asset, EntryFields } from "contentful";
import type { Breadcrumb, ParsedCabin } from "~/parsers/contentful";
import type { Reviews } from "~/repositories/lomarengas";
import type { EntryAddress, EntryLocalBusiness } from "~/types/Contentful";

const parseAggregatedRating = (
  { averageRating: { average, count } }: Reviews,
  name: string
) => {
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

export const parseAssetToUrl = (asset: Asset) => {
  if (!asset) return undefined;
  const { url } = asset.fields.file;
  return url.startsWith("//") ? `https://${url.substring(2)}` : url;
};

export const parseLocationToType = (location: EntryFields.Location) => {
  if (!location) return undefined;

  const { lat, lon } = location;
  return {
    "@type": "GeoCoordinates",
    latitude: lat,
    longitude: lon,
  };
};

export const parseEntryAddressToType = (entry: EntryAddress) => {
  if (!entry) return undefined;

  const {
    addressCountry,
    addressLocality,
    addressRegion,
    postalCode,
    streetAddress,
  } = entry.fields;
  return {
    "@type": "PostalAddress",
    addressLocality,
    addressRegion,
    streetAddress,
    postalCode,
    addressCountry,
  };
};

export const parseEntryLocalBusinessToType = (entry: EntryLocalBusiness) => {
  if (!entry) return undefined;

  const {
    fields: {
      address,
      description,
      geo,
      id,
      image,
      logo,
      name,
      priceRange,
      telephone,
      url,
    },
  } = entry;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": id,
    url,
    name,
    description,
    telephone,
    priceRange,
    address: parseEntryAddressToType(address),
    geo: parseLocationToType(geo),
    image: parseAssetToUrl(image),
    logo: parseAssetToUrl(logo),
  };
};
