import type { ParsedMap } from "../../parsers/contentful";
import SectionWithRichText from "../SectionWithRichText";
import OpenStreetMapEmbed from "../OpenStreetMapEmbed";

type Props = {
  section: ParsedMap
}
export default function Map({ section: { title, richText, location } }: Props) {
  return (
    <SectionWithRichText richText={richText} type="wide">
      <OpenStreetMapEmbed title={title} location={location} />
    </SectionWithRichText>
  );
}