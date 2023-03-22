import type { Asset } from "contentful";
import type { EntryPage, SeoFields } from "~/types/Contentful";

export type ParsedSeoFields = Omit<SeoFields, "image"> & {
  image: ReturnType<typeof parseImageAsset>;
};

export type ParsedPage = {
  seoFields: ParsedSeoFields;
};

const parseImageAsset = (asset: Asset) => {
  const {
    title,
    file: {
      url,
      details: { image },
    },
  } = asset.fields;
  return {
    alt: title,
    src: url,
    width: `${image?.width || 0}`,
    height: `${image?.height || 0}`,
  };
};

export const parseContent = (page: EntryPage): ParsedPage => {
  const { image, ...seoFields } = page.fields.seoFields.fields;
  return {
    seoFields: {
      ...seoFields,
      image: parseImageAsset(image),
    },
  };
};
