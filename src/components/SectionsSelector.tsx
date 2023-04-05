import { component$, Fragment } from "@builder.io/qwik"
import type { ParsedSection } from "~/parsers/contentful"
import { HeroSection } from "./HeroSection"
import { CabinReferencesSection } from "./CabinReferencesSection"
import { isCabinReferencesSection, isFormSection, isHeroSection, isMapSection } from "~/typeguards/contentful"
import { MapSection } from "./MapSection"
import { FormSection } from "./FormSection"

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
        } else {
          console.warn(section)
          return <Fragment key={i} />
        }
      })}
    </>
  )
})