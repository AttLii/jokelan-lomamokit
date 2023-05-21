import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { FC } from "react";
import type { ParsedEntryPage, ParsedEntryCabin } from "../parsers/contentful";
import type { ApartmentJsonLD, FAQPageJsonLD, WebPageJsonLD } from "../parsers/seo";
import { composeJsonLDfromContent } from "../parsers/seo";
import dynamic from 'next/dynamic';
import allContent from "../prevals/allContent.preval";
import { notEmpty } from "../utils/typescript";
import ContentHead from "../components/ContentHead";
const SectionsRenderer = dynamic(() => import('../components/SectionsRenderer'));
const CabinContent = dynamic(() => import('../components/CabinContent'));

type PageProps = {
  content: ParsedEntryPage;
  jsonld: WebPageJsonLD | FAQPageJsonLD;
}
type CabinPageProps = {
  content: ParsedEntryCabin,
  jsonld: ApartmentJsonLD
}
const isPageProps = (props: Props): props is PageProps => props.content.type === "page";

type Props = CabinPageProps | PageProps;

const Catchall: FC<Props> = (props) => {
  const { content, jsonld } = props;
  return (
    <>
      <ContentHead content={content} jsonld={jsonld} />
      {isPageProps(props)
        ? <SectionsRenderer sections={props.content.sections} />
        : <CabinContent content={props.content} jsonld={props.jsonld} />
      }
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allContent.map(content => ({
    params: {
      catchall: content.path.split("/").filter(notEmpty)
    }
  }));
  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  catchall: string[]
}
export const getStaticProps: GetStaticProps<object, IParams> = async (context) => {
  const path = `/${context.params?.catchall ? context.params.catchall.join("/") : ""}`;

  const content = allContent.find(content => content.path === path);
  if (!content) {
    return {
      notFound: true
    };
  }

  const jsonld = await composeJsonLDfromContent(content);

  return {
    props: {
      content,
      jsonld
    }
  };
};

export default Catchall;
