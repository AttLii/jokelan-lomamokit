import { component$ } from "@builder.io/qwik";
import { BurgerButton } from "./BurgerButton";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "./Container";
import { HeaderLogoLink } from "./HeaderLogoLink";
import type { ParsedMenu } from "~/parsers/contentful";

type Props = {
  menu: ParsedMenu
}
export const Header = component$(({ menu }: Props) => {
  return (
    <header class="fixed w-full bg-slate-100 z-10 h-14 border-black border-b-2 py-2">
      <Container type="wide" _class="flex h-full align-middle justify-between">
        <HeaderLogoLink />
        <DesktopMenu menu={menu} _class="hidden sm:flex" />
        <BurgerButton _class="block sm:hidden ml-auto my-auto" />
        <MobileMenu menu={menu} />
      </Container>
    </header>
  )
})