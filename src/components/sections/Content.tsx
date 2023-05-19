import { FC } from "react"
import { ParsedContent } from "../../parsers/contentful"
import { SectionWithRichText } from "../SectionWithRichText"

type Props = {
  section: ParsedContent
}
export const Content: FC<Props> = ({ section: { richText } }) => {
  return <SectionWithRichText richText={richText} type="narrow" />
}