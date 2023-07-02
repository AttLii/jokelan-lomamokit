import type { Props as ContainerProps } from "./Container";
import Container from "./Container";
import RichText from "./RichText";
import Section from "./Section";

type Props = ContainerProps & {
  richText: string
}
export default function SectionWithRichText({ richText, type, children }: Props) {
  return (
    <Section>
      <Container type={type} className="flex flex-col gap-4">
        <RichText html={richText} />
        {children}
      </Container>
    </Section>
  );
}