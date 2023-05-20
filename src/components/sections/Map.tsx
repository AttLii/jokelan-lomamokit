import type { FC } from "react";
import type { ParsedMap } from "../../parsers/contentful";
import { SectionWithRichText } from "../SectionWithRichText";
import { OpenStreetMapEmbed } from "../OpenStreetMapEmbed";

type Props = {
  section: ParsedMap
}
export const Map: FC<Props> = ({ section: { title, richText, location } }) => {
  return (
    <SectionWithRichText richText={richText} type="wide">
      <OpenStreetMapEmbed title={title} location={location} />
    </SectionWithRichText>
  );
};