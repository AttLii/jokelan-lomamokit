import type { FC } from "react";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import type { ParsedSections } from "../parsers/contentful";
import { isParsedCabinReferences, isParsedContent, isParsedFaqs, isParsedFiftyFifty, isParsedForm, isParsedHero, isParsedMap } from "../typeguards/contentful";

const Hero = dynamic(() => import("./sections/Hero"));
const FiftyFifty = dynamic(() => import("./sections/FiftyFifty"));
const Map = dynamic(() => import("./sections/Map"));
const CabinReferences = dynamic(() => import("./sections/CabinReferences"));
const Form = dynamic(() => import("./sections/Form"));
const Content = dynamic(() => import("./sections/Content"));
const Faqs = dynamic(() => import("./sections/Faqs"));

type Props = {
  sections: ParsedSections
}
const SectionsRenderer: FC<Props> = ({ sections }) => {
  return (
    <>
      {sections.map((section, i) => {
        if (isParsedHero(section)) {
          return <Hero key={i} section={section} />;
        } else if (isParsedFiftyFifty(section)) {
          return <FiftyFifty key={i} section={section} />;
        } else if (isParsedMap(section)) {
          return <Map key={i} section={section} />;
        } else if (isParsedCabinReferences(section)) {
          return <CabinReferences key={i} section={section} />;
        } else if (isParsedForm(section)) {
          return <Form key={i} section={section} />;
        } else if (isParsedContent(section)) {
          return <Content key={i} section={section} />;
        } else if (isParsedFaqs(section)) {
          return <Faqs key={i} section={section} />;
        } else {
          return <Fragment key={i} />;
        }
      })}
    </>
  );

};

export default SectionsRenderer;