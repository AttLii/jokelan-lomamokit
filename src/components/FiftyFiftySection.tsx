import { component$ } from "@builder.io/qwik";
import type { ParsedFiftyFiftySection } from "~/parsers/contentful";

type Props = ParsedFiftyFiftySection
export const FiftyFiftySection = component$((props: Props) => {
  return (
    <section>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </section>
  )
})