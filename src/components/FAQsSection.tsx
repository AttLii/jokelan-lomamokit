import { component$ } from "@builder.io/qwik";
import { SectionWithRichText } from "./SectionWithRichText";
import { FAQ } from "./FAQ";
import type { ParsedFAQ, ParsedFAQsSection } from "~/parsers/contentful";

const composeJSONLDfromParsedFaqs = (faqs: ParsedFAQ[]) => {
  const obj = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ answer, question }) => {
      return {
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      }
    })
  }

  return obj
}

type Props = ParsedFAQsSection
export const FAQsSection = component$(({ richText, faqs }: Props) => {
  const faqPageJsonLD = composeJSONLDfromParsedFaqs(faqs)
  return (
    <SectionWithRichText type="narrow" richText={richText}>
      <ul class="flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <li key={i}>
            <FAQ faq={faq} />
          </li>
        ))}
      </ul>
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(faqPageJsonLD)} />
    </SectionWithRichText>
  )
})