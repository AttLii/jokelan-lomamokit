import type { ParsedContent } from "../../parsers/contentful";
import SectionWithRichText from "../SectionWithRichText";

type Props = {
  section: ParsedContent
}
export default function Content({ section: { richText } }: Props) {
  return <SectionWithRichText richText={richText} type="narrow" />;
}