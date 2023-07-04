import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { draftMode } from 'next/headers';
import SectionsRenderer from '../../components/SectionsRenderer';
import { composeJsonLDfromContent } from '../../parsers/seo';
import { isPageProps } from '../../typeguards/parser';
import { notEmpty } from "../../utils/typescript";
import { pathParamToPath } from '../../utils/next';
import allContentPreval from "../../prevals/allContent.preval";
import CabinContent from '../../components/CabinContent';
import previewClient from '../../factories/contentfulPreviewClient';
import { parseContent } from '../../parsers/contentful';

type Props = {
  params: {
    catchall: string[] | undefined
  }
}
export default async function Page({ params: { catchall } }: Props) {
  const path = pathParamToPath(catchall);

  let content;
  if (draftMode().isEnabled) {
    content = await previewClient
      .getContentByPath(path)
      .then(content => {
        if (!content) return undefined;
        return parseContent(content);
      });
  } else {
    content = allContentPreval.find(c => c.path === path);
  }

  if (!content) notFound();

  const jsonLd = await composeJsonLDfromContent(content);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {isPageProps(content)
        ? <SectionsRenderer sections={content.sections} />
        : <CabinContent key={content.name} content={content} />
      }
    </>
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const path = pathParamToPath(props.params.catchall);
  const content = allContentPreval.find(c => c.path === path);

  if (!content) {
    return {};
  }

  const {
    seoFields: {
      description, image, keywords, robots, title,
    }
  } = content;
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_ORIGIN),
    title,
    description,
    alternates: {
      canonical: path,
    },
    keywords: keywords,
    robots,
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      ...(image && {
        images: {
          url: `${image.src}&w=1200&h=630&fit=fill`,
          secureUrl: `${image.src}&w=1200&h=630&fit=fill`,
          alt: image.alt,
          width: 1200,
          height: 630,
        }
      })
    },
    twitter: {
      card: "summary",
      title,
      description,
      ...(image && {
        images: {
          url: `${image.src}&w=1200&h=630&fit=fill`,
          width: 1200,
          height: 630,
        }
      })
    },
  };
}

export async function generateStaticParams() {
  return allContentPreval.map((content) => ({
    catchall: content.path.split("/").filter(notEmpty),
  }));
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = false;