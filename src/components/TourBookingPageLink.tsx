import { component$ } from "@builder.io/qwik";
import { ActionLink } from "./ActionLink";
import { translations } from "~/constants/translations";

type Props = {
  tourBookingPage?: string;
  name: string;
  class?: string;
}
export const TourBookingPageLink = component$(({ tourBookingPage, name, class: _class = "" }: Props) => {
  return (
    <div class={_class}>
      {tourBookingPage
        ? <ActionLink href={tourBookingPage}>{translations.cabinActionLinkText} {name}</ActionLink>
        : (
          <>
            <ActionLink href="#" disabled>{translations.cabinActionLinkText} {name}</ActionLink>
            <p class="text-sm mt-1">{translations.cabinActionLinkDisabledHelp}</p>
          </>
        )}
    </div>
  )
})