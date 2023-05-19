import { Container } from "./Container";
import { RichText } from "./RichText";
import { Section } from "./Section";
import type { Props as ContainerProps } from "./Container";
import { FC } from "react";

type Props = ContainerProps & {
  richText: string
}
export const SectionWithRichText: FC<Props> = (({ richText, type, children }) => {
  return (
    <Section>
      <Container type={type} className="flex flex-col gap-4">
        <RichText html={richText} />
        {children}
      </Container>
    </Section>
  );
});