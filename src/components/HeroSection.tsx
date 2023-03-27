import { component$ } from "@builder.io/qwik"
import type { ParsedHero } from "~/parsers/contentful"
import { AssetImage } from "./AssetImage"

type Props = ParsedHero
export const HeroSection = component$(({ gallery, richText }: Props) => {
  return (
    <section class="relative overflow-hidden aspect-[9/16] sm:aspect-[16/9]">
      <ul class="flex h-full">
        {gallery.map(({ src, ...rest }, i) => (
          <li class="min-w-full relative" key={i}>
            <AssetImage
              {...rest}
              _class="w-full h-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
              src={`${src}?w=639&h=1136`}
              srcSet={{
                '(min-width: 640px)': `${src}?w=1920&h=1080`
              }}
            />
          </li>
        ))}
      </ul>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" dangerouslySetInnerHTML={richText} />
    </section>
  )
})