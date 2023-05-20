import type { FC} from "react";
import { Fragment } from "react";
import type { ParsedSections } from "../parsers/contentful";
import { isParsedCabinReferences, isParsedContent, isParsedFaqs, isParsedFiftyFifty, isParsedForm, isParsedHero, isParsedMap } from "../typeguards/contentful";
import { Hero } from "./sections/Hero";
import { FiftyFifty } from "./sections/FiftyFifty";
import { Map } from "./sections/Map";
import { CabinReferencesSection } from "./sections/CabinReferences";
import { Form } from "./sections/Form";
import { Content } from "./sections/Content";
import { FAQs } from "./sections/Faqs";

type Props = {
  sections: ParsedSections
}
export const SectionsRenderer: FC<Props> = ({ sections }) => {
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
          return <CabinReferencesSection key={i} section={section} />;
        } else if (isParsedForm(section)) {
          return <Form key={i} section={section} />;
        } else if (isParsedContent(section)) {
          return <Content key={i} section={section} />;
        } else if (isParsedFaqs(section)) {
          return <FAQs key={i} section={section} />;
        } else {
          return <Fragment key={i} />;
        }
      })}
    </>
  );

};