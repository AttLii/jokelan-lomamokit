import type { EntryFieldTypes, Entry } from "contentful";

export type HeroSkeleton = {
  contentTypeId: "hero";
  fields: {
    gallery: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    richText: EntryFieldTypes.RichText;
  };
};
export type FiftyFiftySkeleton = {
  contentTypeId: "fiftyFifty";
  fields: {
    richText: EntryFieldTypes.RichText;
    image: EntryFieldTypes.AssetLink;
    order: EntryFieldTypes.Text;
  };
};
export type MapSkeleton = {
  contentTypeId: "map";
  fields: {
    title: EntryFieldTypes.Text;
    richText: EntryFieldTypes.RichText;
    location: EntryFieldTypes.Location;
  };
};
export type CabinReferencesSkeleton = {
  contentTypeId: "cabinReferences";
  fields: {
    richText: EntryFieldTypes.RichText;
    cabinReferences: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<CabinSkeleton>
    >;
  };
};
export type FormSkeleton = {
  contentTypeId: "form";
  fields: {
    richText: EntryFieldTypes.RichText;
    form: EntryFieldTypes.Text;
  };
};
export type ContentSkeleton = {
  contentTypeId: "content";
  fields: {
    richText: EntryFieldTypes.RichText;
  };
};
export type FaqSkeleton = {
  contentTypeId: "faq";
  fields: {
    question: EntryFieldTypes.Text;
    answer: EntryFieldTypes.RichText;
  };
};
export type FaqsSkeleton = {
  contentTypeId: "faqs";
  fields: {
    richText: EntryFieldTypes.RichText;
    faqs: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<FaqSkeleton>>;
  };
};

export type AddressSkeleton = {
  contentTypeId: "address";
  fields: {
    addressLocality: EntryFieldTypes.Text;
    addressRegion: EntryFieldTypes.Text;
    streetAddress: EntryFieldTypes.Text;
    postalCode: EntryFieldTypes.Text;
    addressCountry: EntryFieldTypes.Text;
  };
};

export type LocalBusinessSkeleton = {
  contentTypeId: "localBusiness";
  fields: {
    name: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    telephone: EntryFieldTypes.Text;
    email: EntryFieldTypes.Text;
    geo: EntryFieldTypes.Location;
    image: EntryFieldTypes.AssetLink;
    logo: EntryFieldTypes.AssetLink;
    url: EntryFieldTypes.Text;
    id: EntryFieldTypes.Text;
    priceRange: EntryFieldTypes.Text;
    address: EntryFieldTypes.EntryLink<AddressSkeleton>;
  };
};

export type MenuSubItemSkeleton = {
  contentTypeId: "menuSubItem";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.EntryLink<PageSkeleton | CabinSkeleton>;
  };
};

export type MenuItemSkeleton = {
  contentTypeId: "menuItem";
  fields: {
    title: EntryFieldTypes.Text;
    content: EntryFieldTypes.EntryLink<PageSkeleton | CabinSkeleton>;
    subItems: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<MenuSubItemSkeleton>
    >;
  };
};

export type MenuSkeleton = {
  contentTypeId: "menu";
  fields: {
    title: EntryFieldTypes.Text;
    menuItems: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<MenuItemSkeleton>
    >;
  };
};

export type GlobalContentSkeleton = {
  contentTypeId: "globalContent";
  fields: {
    title: EntryFieldTypes.Text;
    headerMenu: EntryFieldTypes.EntryLink<MenuSkeleton>;
    footerMenu: EntryFieldTypes.EntryLink<MenuSkeleton>;
    localBusiness: EntryFieldTypes.EntryLink<LocalBusinessSkeleton>;
  };
};

export type StringTranslationSkeleton = {
  contentTypeId: "stringTranslation";
  fields: {
    slug: EntryFieldTypes.Text;
    translation: EntryFieldTypes.Text;
  };
};

export type SeoFieldsSkeleton = {
  contentTypeId: "seoFields";
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    robots: EntryFieldTypes.Text;
    keywords: EntryFieldTypes.Text;
    image: EntryFieldTypes.AssetLink;
  };
};

export type PageSkeleton = {
  contentTypeId: "page";
  fields: {
    path: EntryFieldTypes.Text;
    name: EntryFieldTypes.Text;
    seoFields: EntrySeoFields;
    sections?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<HeroSkeleton>>;
  };
};

export type CabinSkeleton = {
  contentTypeId: "cabin";
  fields: {
    path: EntryFieldTypes.Text;
    name: EntryFieldTypes.Text;
    seoFields: EntrySeoFields;
    referenceImage: EntryFieldTypes.AssetLink;
    gallery: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    description: EntryFieldTypes.Text;
    numberOfRooms: EntryFieldTypes.Number;
    occupancy: EntryFieldTypes.Text;
    floorLevel: EntryFieldTypes.Number;
    floorSize: EntryFieldTypes.Number;
    numberOfBathroomsTotal: EntryFieldTypes.Number;
    numberOfBedrooms: EntryFieldTypes.Number;
    petsAllowed: EntryFieldTypes.Boolean;
    yearBuilt: EntryFieldTypes.Number;
    telephone: EntryFieldTypes.Text;
    location: EntryFieldTypes.Location;
    smokingAllowed: EntryFieldTypes.Boolean;
    address: EntryFieldTypes.EntryLink<AddressSkeleton>;
    tourBookingPage?: EntryFieldTypes.Text;
  };
};

export type EntryStringTranslation = Entry<
  StringTranslationSkeleton,
  undefined,
  string
>;
export type EntrySubMenuItem = Entry<
  MenuSubItemSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryMenuItem = Entry<
  MenuItemSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryMenu = Entry<
  MenuSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryGlobalContent = Entry<
  GlobalContentSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryLocalBusiness = Entry<
  LocalBusinessSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryAddress = Entry<
  AddressSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntrySeoFields = Entry<
  SeoFieldsSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryPage = Entry<
  PageSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryCabin = Entry<
  CabinSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryForPage = EntryPage | EntryCabin;

export type EntryHero = Entry<
  HeroSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryFiftyFifty = Entry<
  FiftyFiftySkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryMap = Entry<MapSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
export type EntryCabinReferences = Entry<
  CabinReferencesSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryForm = Entry<
  FormSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryContent = Entry<
  ContentSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntryFaq = Entry<FaqSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>;
export type EntryFaqs = Entry<
  FaqsSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS",
  string
>;
export type EntrySection =
  | EntryHero
  | EntryFiftyFifty
  | EntryMap
  | EntryCabinReferences
  | EntryForm
  | EntryContent
  | EntryFaqs;
