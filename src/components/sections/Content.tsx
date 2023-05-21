import type { FC } from "react";
import type { ParsedContent } from "../../parsers/contentful";
import SectionWithRichText from "../SectionWithRichText";

type Props = {
  section: ParsedContent
}
const Content: FC<Props> = ({ section: { richText } }) => {
  return <SectionWithRichText richText={richText} type="narrow" />;
};
export default Content;