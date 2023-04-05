import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReference } from "~/parsers/contentful";
import { ButtonLink } from "./ButtonLink";
import { translations } from "~/constants/translations";
import { AssetImage } from "./AssetImage";
import { Link } from "@builder.io/qwik-city";

type Props = {
  cabinReference: ParsedCabinReference
}
export const CabinCard = component$(({ cabinReference: { path, title, image: { src, ...imageRest } } }: Props) => {
  return (
    <article class="bg-slate-200 border-black border-2 rounded-md overflow-hidden">
      <Link href={path} aria-label={translations.genericReadMore}>
        <AssetImage {...imageRest} loading="lazy"
          src={`${src}&w=608&h=342`} />
      </Link>
      <div class="p-2">
        <h3 class="mb-2">{title}</h3>
        <ButtonLink href={path}>{translations.genericReadMore}</ButtonLink>
      </div>
    </article>
  )
}) 