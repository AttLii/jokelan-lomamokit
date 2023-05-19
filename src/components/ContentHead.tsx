import type { FC } from "react";
import type { ParsedEntryCabin, ParsedEntryPage } from "../parsers/contentful";
import Head from "next/head";
import { buildLocalUrlFromRelativePath } from "../utils/seo";

type Props = {
  content: ParsedEntryCabin | ParsedEntryPage
}
export const ContentHead: FC<Props> = ({ content }) => {
  const {
    path,
    seoFields: {
      description, image, keywords, robots, title,
    }
  } = content
  const href = buildLocalUrlFromRelativePath(path)
  return (
    <Head>
      <title>{title}</title>
      <meta name="og:title" content={title} />

      <meta name="description" content={description} />
      <meta name="og:description" content={description} />

      <link rel="canonical" href={href} />
      <meta name="og:url" content={href} />

      {image && (
        <>
          <meta name="og:image" content={`${image.src}&w=1200&h=630&fit=fill`} />
          <meta name="og:image:alt" content={image.alt} />
          <meta name="og:image:width" content="1200" />
          <meta name="og:image:height" content="630" />
        </>
      )}

      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
    </Head>
  )
}