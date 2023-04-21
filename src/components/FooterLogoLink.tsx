import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { t } from "~/stores/translation";

type Props = {
  class?: string;
}
export const FooterLogoLink = component$(({ class: _class = "" }: Props) => {
  return (
    <Link
      href="/"
      aria-label={t('generic.logo.link')}
      class={_class}
    >
      <img src="/logo-footer.svg" class="" loading="lazy" width="120" height="120" alt="" />
    </Link>
  )
})