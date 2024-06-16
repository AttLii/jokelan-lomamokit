import type { ParsedForm } from '../../parsers/contentful';
import SectionWithRichText from '../SectionWithRichText';
import ContactForm from '../ContactForm';

type Props = {
  section: ParsedForm;
};
export default function Form({ section: { richText, form } }: Props) {
  return (
    <SectionWithRichText richText={richText} type='narrow'>
      {form === 'Contact' && <ContactForm />}
    </SectionWithRichText>
  );
}
