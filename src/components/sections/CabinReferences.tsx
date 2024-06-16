import type { ParsedCabinReferences } from '../../parsers/contentful';
import SectionWithRichText from '../SectionWithRichText';
import CabinReferenceList from '../CabinReferenceList';

type Props = {
  section: ParsedCabinReferences;
};
export default function CabinReferencesSection({
  section: { richText, cabinReferences },
}: Props) {
  return (
    <SectionWithRichText richText={richText} type='wide'>
      <CabinReferenceList cabinReferences={cabinReferences} />
    </SectionWithRichText>
  );
}
