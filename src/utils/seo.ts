import type { ParsedCabin } from "~/parsers/contentful";

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
  location: { lat, lon },
}: ParsedCabin) => {
  const [minValue, maxValue] = occupancy.split("-").map(Number);
  return {
    "@context": "https://schema.org",
    "@type": "Apartment",
    name,
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
  };
};
