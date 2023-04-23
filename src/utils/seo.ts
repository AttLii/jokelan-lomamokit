import type { Asset, EntryFields } from "contentful";
import type {
  Breadcrumb,
  ParsedAddress,
  ParsedCabin,
} from "~/parsers/contentful";
import { parseAddress } from "~/parsers/contentful";
import type { Reviews } from "~/repositories/lomarengas";
import type { EntryLocalBusiness } from "~/types/Contentful";

const parseAggregatedRating = (name: string, reviews: Reviews | null) => {
  if (!reviews) return undefined;

  const {
    averageRating: { average, count },
  } = reviews;
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
    seoFields,
    location: { lat, lon },
    address,
    smokingAllowed,
  }: ParsedCabin,
  reviews: Reviews | null
) => {
  const [minValue, maxValue] = occupancy.split("-").map(Number);
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
    address: parseEntryAddressToType(address),
    latitude: lat,
    longitude: lon,
    smokingAllowed,
    aggregateRating: parseAggregatedRating(name, reviews),
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
  const { url } = asset.fields.file;
  return url.startsWith("//") ? `https://${url.substring(2)}` : url;
};

export const parseLocationToType = (location: EntryFields.Location) => {
  const { lat, lon } = location;
  return {
    "@type": "GeoCoordinates",
    latitude: lat,
    longitude: lon,
  };
};

export const parseEntryAddressToType = ({
  addressCountry,
  addressLocality,
  addressRegion,
  postalCode,
  streetAddress,
}: ParsedAddress) => {
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
      email,
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
    email,
    address: parseEntryAddressToType(parseAddress(address)),
    geo: parseLocationToType(geo),
    image: parseAssetToUrl(image),
    logo: parseAssetToUrl(logo),
  };
};
