import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReferences } from "~/parsers/contentful";

type Props = ParsedCabinReferences
export const CabinReferencesSection = component$((props: Props) => {
  console.log(JSON.stringify(props.cabinReferences[0], null, 2))
  return <section>HelloWorld</section>
}) 