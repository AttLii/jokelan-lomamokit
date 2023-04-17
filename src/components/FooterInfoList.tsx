import { component$ } from "@builder.io/qwik";
import { RichText } from "./RichText";
import { LuMail, LuMapPin, LuPhone } from "@qwikest/icons/lucide";

export type Props = {
  email: string;
  telephone: string;
  location: string;
}
export const FooterInfoList = component$(({ email, telephone, location }: Props) => {
  if (email === "" && telephone === "" && location === "") return null;
  return (
    <div>
      <h2 class="text-2xl font-display font-bold mb-1.5">Jokelan Lomamökit</h2>
      <ul class="flex flex-col gap-0.5">
        {telephone && (
          <li class="flex gap-2 items-start">
            <LuPhone class="mt-2" />
            <RichText dangerouslySetInnerHTML={telephone} />
          </li>
        )}
        {email && (
          <li class="flex gap-2 items-start">
            <LuMail class="mt-2" />
            <RichText dangerouslySetInnerHTML={email} />
          </li>
        )}
        {location && (
          <li class="flex gap-2 items-start">
            <LuMapPin class="mt-2" />
            <RichText dangerouslySetInnerHTML={location} />
          </li>
        )}
      </ul>
    </div>
  )
}) 