import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { FC } from "react";
import type { ParsedEntryPage, ParsedEntryCabin } from "../parsers/contentful";
import { parseEntryCabin, parseEntryPage } from "../parsers/contentful";
import { getContentByPath, getContentPaths } from "../repositories/contentful";
import { isEntryCabin, isEntryPage } from "../typeguards/contentful";
import { notEmpty } from "../utils/typescript";
import { ContentHead } from "../components/ContentHead";
import { useT } from "../contexts/stringTranslations";

type Props = {
  content: ParsedEntryPage | ParsedEntryCabin
}
const Catchall: FC<Props> = (props) => {
  const hi = useT("cabin.information.title")
  return (
    <main>
      <ContentHead content={props.content} />
      {hi}
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const contentPaths = await getContentPaths()
  const paths = contentPaths.map(path => ({
    params: {
      catchall: path.split("/").filter(notEmpty)
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
  let path = `/${context.params?.catchall ? context.params.catchall.join("/") : ""}`

  let content
  try {
    const rawContent = await getContentByPath(path)
    if (!rawContent) throw new Error('content not found')

    if (isEntryCabin(rawContent)) {
      content = parseEntryCabin(rawContent)
    } else if (isEntryPage(rawContent)) {
      content = parseEntryPage(rawContent)
    }
  } catch {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      content
    }
  };
}

export default Catchall
