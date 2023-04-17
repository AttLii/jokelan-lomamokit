import { component$ } from "@builder.io/qwik";
import { RichText } from "./RichText";
import { HiEnvelope, HiMapPin, HiPhone } from "@qwikest/icons/heroicons";

export type Props = {
  email: string;
  telephone: string;
  location: string;
}
export const FooterInfoList = component$(({ email, telephone, location }: Props) => {
  if (email === "" && telephone === "" && location === "") return null;
  return (
    <div>
      <h2 class="text-2xl font-display font-bold mb-2">Jokelan Lomamökit</h2>
      <ul class="flex flex-col gap-1">
        {telephone && (
          <li class="flex gap-2 items-start">
            <HiPhone class="mt-1" variant="solid" />
            <RichText dangerouslySetInnerHTML={telephone} />
          </li>
        )}
        {email && (
          <li class="flex gap-2 items-start">
            <HiEnvelope class="mt-1" variant="solid" />
            <RichText dangerouslySetInnerHTML={email} />
          </li>
        )}
        {location && (
          <li class="flex gap-2 items-start">
            <HiMapPin class="mt-1" variant="solid" />
            <RichText dangerouslySetInnerHTML={location} />
          </li>
        )}
      </ul>
    </div>
  )
}) 