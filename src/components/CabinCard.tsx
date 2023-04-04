import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReference } from "~/parsers/contentful";
import { ButtonLink } from "./ButtonLink";
import { translations } from "~/constants/translations";
import { AssetImage } from "./AssetImage";

type Props = {
  cabinReference: ParsedCabinReference
}
export const CabinCard = component$(({ cabinReference: { path, title, image: { src, ...imageRest } } }: Props) => {
  return (
    <article class="bg-slate-400 rounded-xl overflow-hidden">
      <AssetImage {...imageRest} loading="lazy"
        src={`${src}?w=608&h=342`} />
      <div class="p-2">
        <h3 class="mb-2">{title}</h3>
        <ButtonLink href={path}>{translations.genericReadMore}</ButtonLink>
      </div>
    </article>
  )
}) 