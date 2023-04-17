import type { Breadcrumb, ParsedCabin } from "~/parsers/contentful";

export const parsedCabinToApartmentJsonLD = ({
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
}: ParsedCabin) => {
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
    address: {
      "@type": "PostalAddress",
      addressCountry,
      addressLocality,
      addressRegion,
      postalCode,
      streetAddress,
    },
    latitude: lat,
    longitude: lon,
    smokingAllowed,
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
