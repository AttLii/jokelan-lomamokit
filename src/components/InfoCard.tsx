import type { ParsedInfoCard } from "~/parsers/contentful"
import { RichText } from "./RichText"
import { $, component$, useSignal } from "@builder.io/qwik"
import { AssetImage } from "./AssetImage"

type Props = {
  infoCard: ParsedInfoCard
}
export const InfoCard = component$(({ infoCard: { image, richText, title } }: Props) => {
  const open = useSignal(false)
  const onClick = $(() => open.value = !open.value)
  const rotate = open.value ? "rotate-y-180" : "rotate-y-0"

  const cardFace = "absolute h-full w-full top-0 left-0 text-white backface-hidden flex items-center justify-center p-4"
  return (
    <button onClick$={onClick} class="relative w-full aspect-square border-2 border-black rounded-md bg-black">
      <AssetImage
        _class="absolute w-full h-full object-cover object-center opacity-80"
        loading="lazy"
        {...image}
        src={`${image.src}&h=619&w=619&fit=fill`}
        alt=""
      />
      <div class={`relative w-full h-full transition-transform ${rotate} duration-500 transform-style-preserve-3d`}>
        <div class={cardFace}>
          <span>{title}</span>
        </div>
        <div class={`${cardFace} rotate-y-180`}>
          <RichText dangerouslySetInnerHTML={richText} />
        </div>
      </div>
    </button>
  )
})