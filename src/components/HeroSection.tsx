import { component$ } from "@builder.io/qwik"
import type { ParsedHero } from "~/parsers/contentful"
import { Carousel } from "./Carousel"
import { RichText } from "./RichText"

type Props = ParsedHero
export const HeroSection = component$(({ gallery, richText }: Props) => {
  return (
    <section class="relative overflow-hidden aspect-[9/16] sm:aspect-[16/9] z-0 max-h-[50rem] w-full border-black border-b-2">
      <Carousel images={gallery} />
      <div class="flex items-center justify-center p-6 absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10">
        <RichText
          _class="h-max w-full max-w-xl text-white"
          dangerouslySetInnerHTML={richText}
        />
      </div>
    </section>
  )
})