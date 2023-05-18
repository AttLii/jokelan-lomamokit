import type { EntryFieldTypes, Entry } from "contentful";

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
  };
};

export type CabinSkeleton = {
  contentTypeId: "cabin";
  fields: {
    path: EntryFieldTypes.Text;
    name: EntryFieldTypes.Text;
    seoFields: EntrySeoFields;
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
export type EntryContent = EntryPage | EntryCabin;
