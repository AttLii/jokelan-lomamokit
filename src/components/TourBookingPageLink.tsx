import { component$ } from "@builder.io/qwik";
import { ActionLink } from "./ActionLink";
import { translations } from "~/constants/translations";

type Props = {
  tourBookingPage?: string;
  name: string;
}
export const TourBookingPageLink = component$(({ tourBookingPage, name }: Props) => {
  return tourBookingPage
    ? <ActionLink href={tourBookingPage}>{translations.cabinActionLinkText} {name}</ActionLink>
    : (
      <>
        <ActionLink href="#" disabled>{translations.cabinActionLinkText} {name}</ActionLink>
        <p class="text-sm mt-1">{translations.cabinActionLinkDisabledHelp}</p>
      </>
    )
})