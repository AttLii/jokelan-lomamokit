import { Fragment } from "@builder.io/qwik"
import type { ParsedSection } from "~/parsers/contentful"
import { HeroSection } from "./HeroSection"

const typeForComponent = {
  "hero": HeroSection
}


type Props = {
  sections: ParsedSection[]
}
export const SectionsSelector = ({ sections }: Props) => {
  return (
    <>
      {sections.map((section, i) => {
        const Component = typeForComponent[section.type]
        return <Fragment key={i}><Component {...section} /></Fragment>
      })}
    </>
  )
}