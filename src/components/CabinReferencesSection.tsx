import { component$ } from "@builder.io/qwik";
import { RichText } from "./RichText";
import { Container } from "./Container";
import type { ParsedCabinReferences } from "~/parsers/contentful";

type Props = ParsedCabinReferences
export const CabinReferencesSection = component$(({ richText, ...CabinReferencesSection }: Props) => {
  return (
    <section class="">
      <Container>
        <RichText dangerouslySetInnerHTML={richText} />
        {JSON.stringify(CabinReferencesSection)}
      </Container>
    </section>
  )
}) 