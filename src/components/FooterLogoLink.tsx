import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { translations } from "~/constants/translations";

type Props = {
  _class: string;
}
export const FooterLogoLink = component$(({ _class }: Props) => {
  return (
    <Link
      href="/"
      aria-label={translations.genericLogoLink}
      class={_class}
    >
      <img src="/logo-footer.svg" class="" loading="lazy" width="120" height="120" alt="" />
    </Link>
  )
})