import type { ParsedFaq } from '../parsers/contentful';
import RichText from './RichText';

type Props = {
  faq: ParsedFaq;
};
export default function FAQ({ faq: { answer, question } }: Props) {
  return (
    <details className='overflow-hidden rounded-md border-2 border-black bg-slate-100'>
      <summary className='cursor-pointer p-4 font-display font-bold'>
        {question}
      </summary>
      <RichText className='p-4 pt-0' html={answer} />
    </details>
  );
}
