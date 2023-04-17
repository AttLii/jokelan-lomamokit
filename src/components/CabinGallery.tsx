import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { ParsedImageAsset } from "~/parsers/contentful";
import { AssetImage } from "./AssetImage";
import { translations } from "~/constants/translations";

type Props = {
  gallery: ParsedImageAsset[]
}
export const CabinGallery = component$(({ gallery }: Props) => {
  const scrollContainer = useSignal<Element>()
  const index = useSignal(0)
  const onClick = $((i: number) => index.value = i)

  useVisibleTask$(({ track }) => {
    track(index)
    track(scrollContainer)

    if (!scrollContainer.value || gallery.length === 0) return

    const child = scrollContainer.value.children[index.value] as HTMLElement
    if (!child) return
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "end" });
  })
  return (
    <div class="flex flex-col gap-2">
      <div>
        <div class="border-2 border-black rounded-md overflow-hidden relative">
          <ul class="flex flex-nowrap transition-transform duration-1000" style={{
            transform: `translateX(${index.value === 0 ? 0 : index.value * 100 * -1}%)`
          }}>
            {gallery.map(({ src }, i) => (
              <li key={i} class="min-w-full">
                <AssetImage alt="" loading={i === 0 ? "eager" : "lazy"} width="936" height="527" src={`${src}&w=936&h=527`} />
              </li>
            ))}
          </ul>
          <span class="absolute bottom-1 right-1 p-1 leading-none bg-slate-100 rounded-md">{index.value + 1} / {gallery.length}</span>
        </div>
        {gallery[index.value] && (
          <p class="mt-1 text-center">{gallery[index.value].alt}</p>
        )}
      </div>

      <ul ref={scrollContainer} class="flex flex-nowrap overflow-x-scroll snap-x pb-2 -mx-1 -md:mx-2">
        {gallery.map(({ src }, i) => (
          <li key={i} class="w-[20%] min-w-[20%] snap-start px-1 -md:mx-2">
            <button onclick$={() => onClick(i)} class={`${index.value === i ? "rounded-md overflow-hidden outline-double outline-2 outline-black  -outline-offset-2" : ""}`}>
              <AssetImage alt={`${translations.cabinGalleryGoTo} ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} width="174" height="100" src={`${src}&w=174&h=100`} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
})