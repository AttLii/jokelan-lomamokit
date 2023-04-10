import { component$ } from "@builder.io/qwik";
import { SectionWithRichText } from "./SectionWithRichText";
import type { ParsedContent } from "~/parsers/contentful";

type Props = ParsedContent
export const ContentSection = component$(({ richText }: Props) => {
  return <SectionWithRichText richText={richText} type="narrow" />
})