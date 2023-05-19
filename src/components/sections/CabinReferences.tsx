import { FC } from "react";
import { ParsedCabinReferences } from "../../parsers/contentful";
import { SectionWithRichText } from "../SectionWithRichText";
import { CabinReferenceList } from "../CabinReferenceList";

type Props = {
  section: ParsedCabinReferences
}
export const CabinReferencesSection: FC<Props> = ({ section: { richText, cabinReferences } }: Props) => {
  return (
    <SectionWithRichText richText={richText} type="wide">
      <CabinReferenceList cabinReferences={cabinReferences} />
    </SectionWithRichText>
  );
};