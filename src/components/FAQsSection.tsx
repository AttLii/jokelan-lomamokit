import { component$ } from "@builder.io/qwik";
import { SectionWithRichText } from "./SectionWithRichText";
import type { ParsedFAQsSection } from "~/parsers/contentful";

type Props = ParsedFAQsSection
export const FAQsSection = component$(({ richText }: Props) => {
  return (
    <SectionWithRichText type="wide" richText={richText}>
      foo
    </SectionWithRichText>
  )
})