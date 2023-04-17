import { component$ } from "@builder.io/qwik";
import type { ParsedFAQ } from "~/parsers/contentful";
import { RichText } from "./RichText";

type Props = {
  faq: ParsedFAQ;
}
export const FAQ = component$(({ faq: { answer, question } }: Props) => {
  return (
    <details class="bg-slate-100 border-black border-2 rounded-md overflow-hidden p-4">
      <summary class="cursor-pointer font-display font-bold">{question}</summary>
      <RichText _class="mt-4" dangerouslySetInnerHTML={answer} />
    </details>
  )
})