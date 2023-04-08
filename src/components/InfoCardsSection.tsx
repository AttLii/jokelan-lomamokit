import { component$ } from "@builder.io/qwik"
import { SectionWithRichText } from "./SectionWithRichText"
import type { ParsedInfoCards } from "~/parsers/contentful"

type Props = ParsedInfoCards
export const InfoCardsSection = component$(({ richText, infoCards }: Props) => {
  return (
    <SectionWithRichText richText={richText} type="wide">
      foo
    </SectionWithRichText>
  )
})