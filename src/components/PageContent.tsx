import { component$, Fragment } from "@builder.io/qwik"
import { HeroSection } from "./HeroSection"
import { CabinReferencesSection } from "./CabinReferencesSection"
import { MapSection } from "./MapSection"
import { FormSection } from "./FormSection"
import { InfoCardsSection } from "./InfoCardsSection"
import { ContentSection } from "./ContentSection"
import { FAQsSection } from "./FAQsSection"
import { FiftyFiftySection } from "./FiftyFiftySection"
import { isCabinReferencesSection, isContentSection, isFAQsSection, isFiftyFiftySection, isFormSection, isHeroSection, isInfoCardsSection, isMapSection } from "~/typeguards/contentful"
import type { ParsedPage } from "~/parsers/contentful"

type Props = {
  content: ParsedPage
}
export const PageContent = component$(({ content }: Props) => {
  return (
    <>
      {content.sections.map((section, i) => {
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
        } else if (isFAQsSection(section)) {
          return <FAQsSection key={i} {...section} />
        } else if (isFiftyFiftySection(section)) {
          return <FiftyFiftySection key={i} {...section} />
        } else {
          console.warn(section)
          return <Fragment key={i} />
        }
      })}
    </>
  )
})