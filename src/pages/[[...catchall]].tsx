import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { FC } from "react";
import type { ParsedEntryPage, ParsedEntryCabin } from "../parsers/contentful";
import allContent from "../prevals/allContent.preval";
import { notEmpty } from "../utils/typescript";
import { ContentHead } from "../components/ContentHead";
import { isParsedPage } from "../typeguards/contentful";
import { SectionsRenderer } from "../components/SectionsRenderer";
import { composeJsonLDfromContent } from "../parsers/seo";
import { CabinContent } from "../components/CabinContent";

type Props = {
  content: ParsedEntryPage | ParsedEntryCabin,
  jsonld: ReturnType<typeof composeJsonLDfromContent>
}
const Catchall: FC<Props> = (props) => {
  return (
    <>
      <ContentHead content={props.content} jsonld={props.jsonld} />
      {isParsedPage(props.content)
        ? <SectionsRenderer sections={props.content.sections} />
        : <CabinContent content={props.content} />}
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

  const jsonld = composeJsonLDfromContent(content)

  return {
    props: {
      content,
      jsonld
    }
  }
}

export default Catchall
