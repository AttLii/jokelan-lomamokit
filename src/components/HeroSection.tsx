import { component$ } from "@builder.io/qwik"
import type { ParsedHero } from "~/parsers/contentful"
import { Carousel } from "./Carousel"
import { RichText } from "./RichText"

type Props = ParsedHero
export const HeroSection = component$(({ gallery, richText }: Props) => {
  return (
    <section class="relative overflow-hidden aspect-[9/16] sm:aspect-[16/9]">
      <Carousel images={gallery} />
      <RichText
        _class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
        dangerouslySetInnerHTML={richText}
      />
    </section>
  )
})