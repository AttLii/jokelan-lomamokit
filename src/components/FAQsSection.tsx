import { component$ } from "@builder.io/qwik";
import { SectionWithRichText } from "./SectionWithRichText";
import { FAQ } from "./FAQ";
import type { ParsedFAQsSection } from "~/parsers/contentful";


type Props = ParsedFAQsSection
export const FAQsSection = component$(({ richText, faqs }: Props) => {
  return (
    <SectionWithRichText type="narrow" richText={richText}>
      <ul class="flex flex-col gap-2">
        {faqs.map((faq, i) => (
          <li key={i}>
            <FAQ faq={faq} />
          </li>
        ))}
      </ul>
    </SectionWithRichText>
  )
})