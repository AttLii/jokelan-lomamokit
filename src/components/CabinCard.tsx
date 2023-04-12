import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReference } from "~/parsers/contentful";
import { IconLink } from "./IconLink";
import { translations } from "~/constants/translations";
import { AssetImage } from "./AssetImage";
import { Link } from "@builder.io/qwik-city";

type Props = {
  cabinReference: ParsedCabinReference
}
export const CabinCard = component$(({ cabinReference: { path, title, image: { src, ...imageRest } } }: Props) => {
  return (
    <article class="bg-slate-100 border-black border-2 rounded-md overflow-hidden">
      <Link href={path} aria-label={translations.genericReadMore}>
        <AssetImage {...imageRest} loading="lazy"
          src={`${src}&w=608&h=456&fit=fill`} />
      </Link>
      <div class="p-4">
        <h3 class="mb-2">{title}</h3>
        <IconLink href={path}>{translations.genericReadMore}</IconLink>
      </div>
    </article>
  )
}) 