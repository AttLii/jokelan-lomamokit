import type { FC } from "react";
import type { ParsedCabinReferences } from "../../parsers/contentful";
import SectionWithRichText from "../SectionWithRichText";
import CabinReferenceList from "../CabinReferenceList";

type Props = {
  section: ParsedCabinReferences
}
const CabinReferencesSection: FC<Props> = ({ section: { richText, cabinReferences } }: Props) => {
  return (
    <SectionWithRichText richText={richText} type="wide">
      <CabinReferenceList cabinReferences={cabinReferences} />
    </SectionWithRichText>
  );
};
export default CabinReferencesSection;