import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReference } from "~/parsers/contentful";
import { ButtonLink } from "./ButtonLink";
import { translations } from "~/constants/translations";

type Props = {
  cabinReference: ParsedCabinReference
}
export const CabinCard = component$(({ cabinReference: { path } }: Props) => {
  return (
    <article class="p-2 border-black bg-slate-400 rounded-xl">
      <ButtonLink href={path}>{translations.genericReadMore}</ButtonLink>
    </article>
  )
}) 