import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReferences } from "~/parsers/contentful";
import { CabinReferenceList } from "./CabinReferenceList";
import { SectionWithRichText } from "./SectionWithRichText";

type Props = ParsedCabinReferences
export const CabinReferencesSection = component$(({ richText, cabinReferences }: Props) => {
  return (
    <SectionWithRichText richText={richText}>
      <CabinReferenceList cabinReferences={cabinReferences} />
    </SectionWithRichText>
  )
}) 