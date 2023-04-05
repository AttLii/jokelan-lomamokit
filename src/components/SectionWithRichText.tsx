import { Slot, component$ } from "@builder.io/qwik";
import { Container } from "./Container";
import { RichText } from "./RichText";

type Props = {
  richText: string
}
export const SectionWithRichText = component$(({ richText }: Props) => {
  return (
    <section class="py-14 bg-white">
      <Container>
        <RichText dangerouslySetInnerHTML={richText} _class="mb-2" />
        <Slot />
      </Container>
    </section>
  )
})