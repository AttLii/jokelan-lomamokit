import { component$ } from "@builder.io/qwik"
import type { ParsedMap } from "~/parsers/contentful"
import { SectionWithRichText } from "./SectionWithRichText"
import { OpenStreetMapEmbed } from "./OpenStreetMapEmbed"

type Props = ParsedMap
export const MapSection = component$(({ title, richText, location }: Props) => {
  return (
    <SectionWithRichText richText={richText} type="wide">
      <OpenStreetMapEmbed title={title} location={location} />
    </SectionWithRichText>
  )
})