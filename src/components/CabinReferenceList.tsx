import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReference } from "~/parsers/contentful";
import { CabinCard } from "./CabinCard";

type Props = {
  cabinReferences: ParsedCabinReference[]
}
export const CabinReferenceList = component$(({ cabinReferences }: Props) => {
  if (cabinReferences.length === 0) return null;
  return (
    <ul class="grid gap-4 sm:grid-cols-2">
      {cabinReferences.map((cabinReference) => {
        return (
          <li key={cabinReference.id}>
            <CabinCard cabinReference={cabinReference} />
          </li>
        )
      })}
    </ul>
  )
})