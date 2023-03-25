import { component$ } from "@builder.io/qwik"
import type { ParsedSection } from "~/parsers/contentful"
import { HeroSection } from "./HeroSection"

const typeForComponent = {
  "hero": HeroSection
}


type Props = {
  sections: ParsedSection[]
}
export const SectionsSelector = component$(({ sections }: Props) => {
  return (
    <>
      {sections.map((section, i) => {
        const Component = typeForComponent[section.type]
        return <Component key={i} {...section} />
      })}
    </>
  )
})