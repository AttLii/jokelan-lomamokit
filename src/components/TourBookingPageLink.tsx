import { component$ } from "@builder.io/qwik";
import { ActionLink } from "./ActionLink";
import { t } from "~/stores/translation";

type Props = {
  tourBookingPage?: string;
  name: string;
  class?: string;
}
export const TourBookingPageLink = component$(({ tourBookingPage, name, class: _class = "" }: Props) => {
  return (
    <div class={_class}>
      {tourBookingPage
        ? <ActionLink href={tourBookingPage}>{t('cabin.action.link.text')} {name}</ActionLink>
        : (
          <>
            <ActionLink href="#" disabled>{t('cabin.action.link.text')} {name}</ActionLink>
            <p class="text-sm mt-1">{t('cabin.action.link.disabled.help')}</p>
          </>
        )}
    </div>
  )
})