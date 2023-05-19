import type { EntryFields } from "contentful";
import type { EntryAddress, EntryLocalBusiness } from "../types/contentful";
import {
  ParsedEntryCabin,
  ParsedEntryPage,
  ParsedFaqs,
  parseUrlFromAsset,
} from "./contentful";
import { isParsedFaqs, isParsedPage } from "../typeguards/contentful";
import { buildLocalUrlFromRelativePath } from "../utils/seo";
import { scrapeReviews } from "../repositories/lomarengas";
import { Reviews } from "../repositories/lomarengas";

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

const composeFAQPageJsonLD = (content: ParsedEntryPage) => {
  const {
    path,
    seoFields: { title, description, keywords },
    sections,
  } = content;
  const url = buildLocalUrlFromRelativePath(path);
  const mainEntity = sections
    .filter(isParsedFaqs)
    .flatMap((x) => x.faqs)
    .map(({ answer, question }) => {
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    });

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "fi",
    id: url,
    url,
    name: title,
    description,
    keywords,
    mainEntity,
  };
};
export type FAQPageJsonLD = ReturnType<typeof composeFAQPageJsonLD>;

const parseAggregatedRating = (
  name: string,
  { averageRating: { average, count } }: Reviews
) => {
  return {
    "@type": "AggregateRating",
    ratingValue: average / 2, // lomarengas returns the average from 0-10, json-ld expects 0-5
    reviewCount: count,
    itemReviewed: name,
  };
};

export const composeWebPageJsonLD = (content: ParsedEntryPage) => {
  const {
    seoFields: { title, description, keywords },
    path,
  } = content;
  const url = buildLocalUrlFromRelativePath(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    id: url,
    url,
    inLanguage: "fi",
    name: title,
    description,
    keywords,
  };
};
export type WebPageJsonLD = ReturnType<typeof composeWebPageJsonLD>;

export const composeApartmentJsonLD = (
  {
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
    seoFields: { title, description, image },
    location: { lat, lon },
    address,
    smokingAllowed,
    path,
  }: ParsedEntryCabin,
  reviews: Reviews | null
) => {
  const [minValue, maxValue] = occupancy.split("-").map(Number);
  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    url: buildLocalUrlFromRelativePath(path),
    name: title,
    description,
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
    address,
    latitude: lat,
    longitude: lon,
    smokingAllowed,
    ...(image && { image: image.src }),
    ...(reviews && { aggregateRating: parseAggregatedRating(title, reviews) }),
  };
};
export type ApartmentJsonLD = ReturnType<typeof composeApartmentJsonLD>;

export const composeJsonLDfromContent = async (
  content: ParsedEntryPage | ParsedEntryCabin
) => {
  if (isParsedPage(content)) {
    if (content.sections.some((s) => s.type === "faqs")) {
      return composeFAQPageJsonLD(content);
    } else {
      return composeWebPageJsonLD(content);
    }
  } else {
    const reviews = content.tourBookingPage
      ? await scrapeReviews(content.tourBookingPage)
      : null;
    return composeApartmentJsonLD(content, reviews);
  }
};
