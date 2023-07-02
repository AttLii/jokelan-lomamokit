import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import allContentPreval from "../../prevals/allContent.preval";
import { notEmpty } from "../../utils/typescript";
import { pathParamToPath } from '../../utils/next';
import { composeJsonLDfromContent } from '../../parsers/seo';

type Props = {
  params: {
    catchall: string[] | undefined
  }
}
export default async function Page({ params: { catchall } }: Props) {
  const path = pathParamToPath(catchall);
  const content = allContentPreval.find(c => c.path === path);

  if (!content) notFound();

  const jsonLd = await composeJsonLDfromContent(content);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
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
      card: "summary"
    },
  };
}

export async function generateStaticParams() {
  return allContentPreval.map((content) => ({
    catchall: content.path.split("/").filter(notEmpty),
  }));
}

export const revalidate = false;
