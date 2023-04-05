import { Slot, component$ } from "@builder.io/qwik";
import { Container } from "./Container";
import { RichText } from "./RichText";
import type { Props as ContainerProps } from "./Container";

type Props = ContainerProps & {
  richText: string
}
export const SectionWithRichText = component$(({ richText, type }: Props) => {
  return (
    <section class="py-14 bg-white">
      <Container type={type}>
        <RichText dangerouslySetInnerHTML={richText} _class="mb-2" />
        <Slot />
      </Container>
    </section>
  )
})