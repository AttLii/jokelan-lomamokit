import { component$ } from "@builder.io/qwik";
import type { ParsedCabin } from "~/parsers/contentful";
import { parsedCabinToApartmentJsonLD } from "~/utils/seo";

type Props = {
  content: ParsedCabin
}
export const CabinPage = component$(({
  content
}: Props) => {
  const jsonLD = parsedCabinToApartmentJsonLD(content)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={JSON.stringify(jsonLD)} />
    </>
  )
})