import { component$, Fragment } from "@builder.io/qwik"
import type { ParsedSection } from "~/parsers/contentful"
import { HeroSection } from "./HeroSection"
import { CabinReferencesSection } from "./CabinReferencesSection"
import { isCabinReferencesSection, isHeroSection } from "~/typeguards/contentful"

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
        } else {
          return <Fragment key={i} />
        }
      })}
    </>
  )
})