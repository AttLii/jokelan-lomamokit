import type { ParsedFaqs } from "../../parsers/contentful";
import SectionWithRichText from "../SectionWithRichText";
import FAQ from "../FAQCard";

type Props = {
  section: ParsedFaqs
}
export default function FAQs({ section: { richText, faqs } }: Props) {
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
}