import type { EntryFields } from "contentful";
import type { EntryAddress, EntryLocalBusiness } from "../types/contentful";
import { parseUrlFromAsset } from "./contentful";

export const parseLocationToType = ({ lat, lon }: EntryFields.Location) => {
  return {
    "@type": "GeoCoordinates",
    latitude: lat,
    longitude: lon,
  };
};

export const parseEntryAddressToType = (address: EntryAddress) => {
  const {
    addressCountry,
    addressLocality,
    addressRegion,
    postalCode,
    streetAddress,
  } = address.fields;
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
  } = entry.fields;

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
    geo: parseLocationToType(geo),
    address: address ? parseEntryAddressToType(address) : undefined,
    image: image ? parseUrlFromAsset(image) : undefined,
    logo: logo ? parseUrlFromAsset(logo) : undefined,
  };
};
