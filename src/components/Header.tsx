import { component$ } from "@builder.io/qwik";
import { BurgerButton } from "./BurgerButton";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "./Container";
import type { ParsedMenu } from "~/parsers/contentful";
import { Link } from "@builder.io/qwik-city";
import { translations } from "~/constants/translations";

type Props = {
  menu: ParsedMenu
}
export const Header = component$(({ menu }: Props) => {
  return (
    <header class="fixed w-full bg-slate-300 z-10 h-14 border-black border-b-2 py-2">
      <Container type="wide" _class="flex h-full align-middle justify-between">
        <Link href="/" aria-label={translations.genericLogoLink}>
          <img src="/logo.svg" loading="eager" width="40" height="40" alt="" />
        </Link>
        <DesktopMenu menu={menu} />
        <div />
        <BurgerButton _class="block sm:hidden ml-auto my-auto" />
        <MobileMenu menu={menu} />
      </Container>
    </header>
  )
})