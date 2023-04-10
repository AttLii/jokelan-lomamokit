import { component$, Fragment } from "@builder.io/qwik"
import { HeroSection } from "./HeroSection"
import { CabinReferencesSection } from "./CabinReferencesSection"
import { MapSection } from "./MapSection"
import { FormSection } from "./FormSection"
import { InfoCardsSection } from "./InfoCardsSection"
import { ContentSection } from "./ContentSection"
import { isCabinReferencesSection, isContentSection, isFormSection, isHeroSection, isInfoCardsSection, isMapSection } from "~/typeguards/contentful"
import type { ParsedSection } from "~/parsers/contentful"

type Props = {
  sections: ParsedSection[]
}
export const SectionsSelector = component$(({ sections }: Props) => {
  return (
    <>
      {sections.map((section, i) => {
        if (isHeroSection(section)) {
          return <HeroSection key={i} {...section} />
        } else if (isCabinReferencesSection(section)) {
          return <CabinReferencesSection key={i} {...section} />
        } else if (isMapSection(section)) {
          return <MapSection key={i} {...section} />
        } else if (isFormSection(section)) {
          return <FormSection key={i} {...section} />
        } else if (isInfoCardsSection(section)) {
          return <InfoCardsSection key={i} {...section} />
        } else if (isContentSection(section)) {
          return <ContentSection key={i} {...section} />
        } else {
          console.warn(section)
          return <Fragment key={i} />
        }
      })}
    </>
  )
})