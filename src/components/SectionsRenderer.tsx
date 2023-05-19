import { FC, Fragment } from "react";
import { ParsedSections } from "../parsers/contentful";
import { isParsedFiftyFifty, isParsedHero } from "../typeguards/contentful";
import { Hero } from "./sections/Hero";
import { FiftyFifty } from "./sections/FiftyFifty";

type Props = {
  sections: ParsedSections
}
export const SectionsRenderer: FC<Props> = ({ sections }) => {
  return (
    <>
      {sections.map((section, i) => {
        if (isParsedHero(section)) {
          return <Hero key={i} section={section} />
        } else if (isParsedFiftyFifty(section)) {
          return <FiftyFifty key={i} section={section} />
        } else {
          console.warn(`unrecognized section ${section}`)
          return <Fragment key={i} />
        }
      })}
    </>
  )

}