import { component$ } from "@builder.io/qwik";
import type { ParsedFiftyFiftySection } from "~/parsers/contentful";
import { Container } from "./Container";
import { Section } from "./Section";
import { AssetImage } from "./AssetImage";
import { RichText } from "./RichText";

type Props = ParsedFiftyFiftySection
export const FiftyFiftySection = component$(({ image, richText, order }: Props) => {
  const orderClass = order === "Image-Text" ? "md:order-first" : "md:order-last"
  return (
    <Section>
      <Container type="wide" class="grid gap-y-4 gap-x-8 grid-cols-1 md:grid-cols-2">
        <div class={`
          my-auto relative border-black border-2 rounded-md overflow-hidden
          aspect-square
          md:aspect-auto md:h-full
          ${orderClass}
        `}>
          <AssetImage
            {...image}
            class="absolute top-0 left-0 w-full h-full object-center object-cover"
            src={`${image.src}&w=616&h=616&fit=fill`}
            loading="lazy"
            height="616"
            width="616"
          />
        </div>
        <div class="my-auto md:py-8">
          <RichText dangerouslySetInnerHTML={richText} />
        </div>
      </Container>
    </Section>
  )
})