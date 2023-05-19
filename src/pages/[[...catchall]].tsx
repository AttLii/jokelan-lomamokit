import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { FC } from "react";
import type { ParsedEntryPage, ParsedEntryCabin } from "../parsers/contentful";
import allContent from "../prevals/allContent.preval";
import { notEmpty } from "../utils/typescript";
import { ContentHead } from "../components/ContentHead";
import { ApartmentJsonLD, FAQPageJsonLD, WebPageJsonLD, composeJsonLDfromContent } from "../parsers/seo";
import { SectionsRenderer } from "../components/SectionsRenderer";
import { CabinContent } from "../components/CabinContent";

type PageProps = {
  content: ParsedEntryPage;
  jsonld: WebPageJsonLD | FAQPageJsonLD;
}

type CabinPageProps = {
  content: ParsedEntryCabin,
  jsonld: ApartmentJsonLD
}

const isPageProps = (props: Props): props is PageProps => props.content.type === "page"

type Props = CabinPageProps | PageProps;

const Catchall: FC<Props> = (props) => {
  const { content, jsonld } = props
  return (
    <>
      <ContentHead content={content} jsonld={jsonld} />
      {isPageProps(props)
        ? <SectionsRenderer sections={props.content.sections} />
        : <CabinContent content={props.content} jsonld={props.jsonld} />
      }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allContent.map(content => ({
    params: {
      catchall: content.path.split("/").filter(notEmpty)
    }
  }))
  return {
    paths,
    fallback: false,
  };
}

interface IParams extends ParsedUrlQuery {
  catchall: string[]
}
export const getStaticProps: GetStaticProps<{}, IParams> = async (context) => {
  const path = `/${context.params?.catchall ? context.params.catchall.join("/") : ""}`

  let content = allContent.find(content => content.path === path)
  if (!content) {
    return {
      notFound: true
    }
  }

  const jsonld = await composeJsonLDfromContent(content)

  return {
    props: {
      content,
      jsonld
    }
  }
}

export default Catchall
