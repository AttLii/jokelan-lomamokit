import { component$ } from "@builder.io/qwik";
import { RichText } from "./RichText";
import { Container } from "./Container";
import type { ParsedCabinReferences } from "~/parsers/contentful";
import { CabinReferenceList } from "./CabinReferenceList";

type Props = ParsedCabinReferences
export const CabinReferencesSection = component$(({ richText, cabinReferences }: Props) => {
  return (
    <section class="py-14 bg-white">
      <Container>
        <RichText dangerouslySetInnerHTML={richText} _class="mb-2" />
        <CabinReferenceList cabinReferences={cabinReferences} />
      </Container>
    </section>
  )
}) 