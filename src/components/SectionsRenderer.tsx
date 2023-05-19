import { FC, Fragment } from "react";
import { ParsedSections } from "../parsers/contentful";
import { isParsedHero } from "../typeguards/contentful";
import { Hero } from "./sections/Hero";

type Props = {
  sections: ParsedSections
}
export const SectionsRenderer: FC<Props> = ({ sections }) => {
  return (
    <>
      {sections.map((section, i) => {
        if (isParsedHero(section)) {
          return <Hero key={i} section={section} />
        } else {
          console.warn(`unrecognized section ${section}`)
          return <Fragment key={i} />
        }
      })}
    </>
  )

}