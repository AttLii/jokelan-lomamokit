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

export const composeJsonLDfromContent = (
  content: ParsedEntryPage | ParsedEntryCabin
) => {
  if (isParsedPage(content)) {
    if (content.sections.some((s) => s.type === "faqs")) {
      return composeFAQPageJsonLD(content);
    } else {
      return composeWebPageJsonLD(content);
    }
  }

  return null;
};
