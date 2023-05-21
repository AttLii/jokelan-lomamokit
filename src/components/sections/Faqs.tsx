import type { FC } from "react";
import type { ParsedFaqs } from "../../parsers/contentful";
import SectionWithRichText from "../SectionWithRichText";
import FAQ from "../FAQCard";

type Props = {
  section: ParsedFaqs
}
const FAQs: FC<Props> = ({ section: { richText, faqs } }) => {
  return (
    <SectionWithRichText type="narrow" richText={richText}>
      <ul className="flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <li key={i}>
            <FAQ faq={faq} />
          </li>
        ))}
      </ul>
    </SectionWithRichText>
  );
};
export default FAQs;