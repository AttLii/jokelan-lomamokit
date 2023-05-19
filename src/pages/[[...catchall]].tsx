import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { FC } from "react";
import type { ParsedEntryPage, ParsedEntryCabin } from "../parsers/contentful";
import allContent from "../prevals/allContent.preval";
import { notEmpty } from "../utils/typescript";
import { ContentHead } from "../components/ContentHead";
import { isParsedPage } from "../typeguards/contentful";
import { SectionsRenderer } from "../components/SectionsRenderer";

type Props = {
  content: ParsedEntryPage | ParsedEntryCabin
}
const Catchall: FC<Props> = (props) => {
  return (
    <>
      <ContentHead content={props.content} />
      {isParsedPage(props.content) && (
        <SectionsRenderer sections={props.content.sections} />
      )}
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

  return {
    props: {
      content
    }
  }
}

export default Catchall
