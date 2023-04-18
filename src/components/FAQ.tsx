import { component$ } from "@builder.io/qwik";
import type { ParsedFAQ } from "~/parsers/contentful";
import { RichText } from "./RichText";

type Props = {
  faq: ParsedFAQ;
}
export const FAQ = component$(({ faq: { answer, question } }: Props) => {
  return (
    <details class="bg-slate-100 border-black border-2 rounded-md overflow-hidden">
      <summary class="p-4 cursor-pointer font-display font-bold">{question}</summary>
      <RichText _class="p-4 pt-0" dangerouslySetInnerHTML={answer} />
    </details>
  )
})