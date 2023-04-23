import type { Asset, Entry, EntryFields } from "contentful";
import type { Document } from "@contentful/rich-text-types";

export type SeoFields = {
  title: string;
  description: string;
  image: Asset;
  robots: string;
  keywords: string;
};
export type EntrySeoFields = Entry<SeoFields>;

export type Hero = {
  gallery: Asset[];
  richText: Document;
};
export type EntryHeroSection = Entry<Hero>;
export type CabinReferences = {
  richText: Document;
  cabinReferences: EntryCabin[];
};
export type EntryCabinReferencesSection = Entry<CabinReferences>;
export type Map = {
  title: string;
  richText: Document;
  location: EntryFields.Location;
};
export type EntryMapSection = Entry<Map>;

export type Form = {
  richText: Document;
  form: "Contact";
};
export type EntryFormSection = Entry<Form>;

export type InfoCard = {
  title: string;
  image: Asset;
  richText: Document;
};
export type EntryInfoCard = Entry<InfoCard>;
export type InfoCards = {
  richText: Document;
  infoCards: EntryInfoCard[];
};

export type EntryInfoCardsSection = Entry<InfoCards>;

export type Content = {
  richText: Document;
};
export type EntryContentSection = Entry<Content>;

export type FAQ = {
  question: string;
  answer: Document;
};
export type EntryFAQ = Entry<FAQ>;
export type FAQs = {
  richText: Document;
  faqs: EntryFAQ[];
};
export type EntryFAQsSection = Entry<FAQs>;

export type FiftyFiftyOrder = "Text-Image" | "Image-Text";
export type FiftyFifty = {
  richText: Document;
  image: Asset;
  order: FiftyFiftyOrder;
};
export type EntryFiftyFiftySection = Entry<FiftyFifty>;

export type Section =
  | EntryHeroSection
  | EntryCabinReferencesSection
  | EntryMapSection
  | EntryFormSection
  | EntryInfoCardsSection
  | EntryFAQsSection
  | EntryFiftyFiftySection
  | EntryContentSection;

export type Page = {
  name: string;
  path: string;
  seoFields: EntrySeoFields;
  sections?: Section[];
};
export type Cabin = {
  path: string;
  seoFields: EntrySeoFields;
  gallery: Asset[];
  sections?: Section[];
  referenceImage: Asset;
  name: string;
  description: string;
  numberOfRooms: number;
  occupancy: string;
  floorLevel: number;
  floorSize: number;
  numberOfBathroomsTotal: number;
  numberOfBedrooms: number;
  petsAllowed: boolean;
  tourBookingPage?: string;
  yearBuilt: number;
  telephone: number;
  addressCountry: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
  location: EntryFields.Location;
  smokingAllowed: boolean;
};

export type EntryPage = Entry<Page>;
export type EntryCabin = Entry<Cabin>;
export type EntryContent = EntryPage | EntryCabin;

export type MenuItem = {
  title: string;
  content: EntryContent;
  subItems?: EntryMenuItem[];
};
export type EntryMenuItem = Entry<MenuItem>;

export type Menu = {
  title: string;
  menuItems: EntryMenuItem[];
};
export type EntryMenu = Entry<Menu>;

export type Address = {
  addressLocality: string;
  addressRegion: string;
  streetAddress: string;
  postalCode: string;
  addressCountry: string;
};
export type EntryAddress = Entry<Address>;
export type LocalBusiness = {
  name: string;
  description: string;
  telephone: string;
  geo: EntryFields.Location;
  image: Asset;
  logo: Asset;
  url: string;
  id: string;
  priceRange: string;
  address: EntryAddress;
  email: string;
};
export type EntryLocalBusiness = Entry<LocalBusiness>;

export type GlobalContent = {
  headerMenu: EntryMenu;
  footerMenu: EntryMenu;
  localBusiness: EntryLocalBusiness;
};
export type EntryGlobalContent = Entry<GlobalContent>;

export type Translation = {
  slug: string;
  translation: string;
};
export type EntryTranslation = Entry<Translation>;
