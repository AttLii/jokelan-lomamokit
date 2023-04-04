import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReference } from "~/parsers/contentful";

type Props = {
  cabinReference: ParsedCabinReference
}
export const CabinCard = component$(({ cabinReference }: Props) => {
  return (
    <article>{JSON.stringify(cabinReference, null, 2)}</article>
  )
}) 