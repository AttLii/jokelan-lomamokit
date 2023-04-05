import { component$ } from "@builder.io/qwik"
import type { ParsedMap } from "~/parsers/contentful"

type Props = ParsedMap
export const MapSection = component$((props: Props) => {
  return <div>{JSON.stringify(props, null, 2)}</div>
})