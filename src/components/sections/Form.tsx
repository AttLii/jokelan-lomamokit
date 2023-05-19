import { FC } from "react";
import { ParsedForm } from "../../parsers/contentful";
import { SectionWithRichText } from "../SectionWithRichText";
import { ContactForm } from "../ContactForm";

type Props = {
  section: ParsedForm
}
export const Form: FC<Props> = ({ section: { richText, form } }) => {
  return (
    <SectionWithRichText richText={richText} type="narrow">
      {form === "Contact" && (
        <ContactForm />
      )}
    </SectionWithRichText>
  );
};