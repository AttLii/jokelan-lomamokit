import type { Asset, RichTextContent } from "contentful";
import type {
  EntryPage,
  Hero,
  SeoFields,
  Section,
  EntryHero,
} from "~/types/Contentful";
import { isHeroSection } from "~/utils/contentful";
import { nonNullable } from "~/utils/typescript";

const parseImageAsset = ({
  fields: {
    title,
    file: {
      url,
      details: { image },
    },
  },
}: Asset) => {
  return {
    alt: title,
    src: url,
    width: `${image?.width || 0}`,
    height: `${image?.height || 0}`,
  };
};

export type ParsedImageAsset = ReturnType<typeof parseImageAsset>;

export type ParsedSeoFields = Omit<SeoFields, "image"> & {
  image: ParsedImageAsset;
};

export type ParsedHero = {
  type: "hero";
  richText: RichTextContent;
  gallery: ParsedImageAsset[];
};
export const parseHeroSection = ({
  fields: { richText, gallery },
}: EntryHero): ParsedHero => {
  return {
    type: "hero",
    richText,
    gallery: gallery.map(parseImageAsset),
  };
};

export type ParsedSection = ParsedHero;
export const parseSections = (sections: Section[]): ParsedSection[] => {
  return sections
    .map((section) => {
      if (isHeroSection(section)) {
        return parseHeroSection(section);
      } else {
        return null;
      }
    })
    .filter(nonNullable);
};

export type ParsedPage = {
  seoFields: ParsedSeoFields;
  sections: ParsedSection[];
};
export const parseContent = (page: EntryPage): ParsedPage => {
  const {
    sections,
    seoFields: {
      fields: { image, ...seoFields },
    },
  } = page.fields;

  return {
    seoFields: {
      ...seoFields,
      image: parseImageAsset(image),
    },
    sections: parseSections(sections),
  };
};
