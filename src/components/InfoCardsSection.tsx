import { component$ } from "@builder.io/qwik"
import { SectionWithRichText } from "./SectionWithRichText"
import { InfoCard } from "./InfoCard"
import type { ParsedInfoCards } from "~/parsers/contentful"

type Props = ParsedInfoCards
export const InfoCardsSection = component$(({ richText, infoCards }: Props) => {
  return (
    <SectionWithRichText richText={richText} type="wide">
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {infoCards.map((infoCard, i) => (
          <li key={i}>
            <InfoCard infoCard={infoCard} />
          </li>
        ))}
      </ul>
    </SectionWithRichText>
  )
})