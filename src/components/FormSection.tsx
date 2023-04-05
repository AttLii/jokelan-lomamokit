import { SectionWithRichText } from "./SectionWithRichText"
import { component$ } from "@builder.io/qwik"
import type { ParsedForm } from "~/parsers/contentful"
import { ContactForm } from "./ContactForm"

type Props = ParsedForm
export const FormSection = component$(({ richText, form }: Props) => {
  return (
    <SectionWithRichText richText={richText} type="narrow">
      {form === "Contact" && (
        <ContactForm />
      )}
    </SectionWithRichText>
  )
})