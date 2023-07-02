import type { ParsedFaq } from "../parsers/contentful";
import RichText from "./RichText";

type Props = {
  faq: ParsedFaq;
}
export default function FAQ({ faq: { answer, question } }: Props) {
  return (
    <details className="bg-slate-100 border-black border-2 rounded-md overflow-hidden">
      <summary className="p-4 cursor-pointer font-display font-bold">{question}</summary>
      <RichText className="p-4 pt-0" html={answer} />
    </details>
  );
}