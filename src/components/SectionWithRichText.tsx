import { Slot, component$ } from "@builder.io/qwik";
import { Container } from "./Container";
import { RichText } from "./RichText";
import type { Props as ContainerProps } from "./Container";
import { Section } from "./Section";

type Props = ContainerProps & {
  richText: string
}
export const SectionWithRichText = component$(({ richText, type }: Props) => {
  return (
    <Section>
      <Container type={type} class="flex flex-col gap-4">
        <RichText dangerouslySetInnerHTML={richText} />
        <Slot />
      </Container>
    </Section>
  )
})