import { component$ } from "@builder.io/qwik";
import type { ParsedCabinReferences } from "~/parsers/contentful";

type Props = ParsedCabinReferences
export const CabinReferencesSection = component$((props: Props) => {
  console.log(props)
  return <section>HelloWorld</section>
}) 