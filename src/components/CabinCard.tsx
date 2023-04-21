import { component$ } from "@builder.io/qwik";
import { IconLink } from "./IconLink";
import { AssetImage } from "./AssetImage";
import { t } from "~/stores/translation";
import type { ParsedCabinReference } from "~/parsers/contentful";

type Props = {
  cabinReference: ParsedCabinReference
}
export const CabinCard = component$(({ cabinReference: { path, title, image: { src, ...imageRest } } }: Props) => {
  return (
    <article class="bg-slate-100 border-black border-2 rounded-md overflow-hidden">
      <AssetImage
        {...imageRest}
        alt=""
        width="608"
        height="456"
        loading="lazy"
        src={`${src}&w=608&h=456&fit=fill`}
      />
      <div class="p-4 border-black border-t-2">
        <h3 class="text-2xl font-bold mb-2">{title}</h3>
        <IconLink href={path}>{t('generic.read.more')}</IconLink>
      </div>
    </article>
  )
}) 