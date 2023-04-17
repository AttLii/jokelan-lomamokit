import { $, component$, useSignal } from "@builder.io/qwik";
import type { ParsedImageAsset } from "~/parsers/contentful";
import { AssetImage } from "./AssetImage";
import { translations } from "~/constants/translations";

type Props = {
  gallery: ParsedImageAsset[]
}
export const CabinGallery = component$(({ gallery }: Props) => {
  const index = useSignal(0)
  const onClick = $((i: number) => index.value = i)
  return (
    <div class="flex flex-col gap-2">
      <div>
        <div class="border-2 border-black rounded-md overflow-hidden">

          <ul class="flex flex-nowrap transition-transform duration-1000" style={{
            transform: `translateX(${index.value === 0 ? 0 : index.value * 100 * -1}%)`
          }}>
            {gallery.map(({ src }, i) => (
              <li key={i} class="min-w-full">
                <AssetImage alt="" loading={i === 0 ? "eager" : "lazy"} width="936" height="527" src={`${src}&w=936&h=527`} />
              </li>
            ))}
          </ul>
        </div>
        <p class="mt-1 text-center">{gallery[index.value].alt}</p>
      </div>

      <ul class="flex flex-nowrap gap-4 overflow-x-scroll snap-x pb-2">
        {gallery.map(({ src }, i) => (
          <li key={i} class="min-w-[17.5%] snap-start">
            <button onclick$={() => onClick(i)} class={`${index.value === i ? "rounded-md overflow-hidden outline-double outline-2 outline-black  -outline-offset-2" : ""}`}>
              <AssetImage alt={`${translations.cabinGalleryGoTo} ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} width="162" height="91" src={`${src}&w=162&h=91`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
})