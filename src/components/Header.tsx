import { component$ } from "@builder.io/qwik";
import { BurgerButton } from "./BurgerButton";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "./Container";
import type { ParsedMenu } from "~/parsers/contentful";

type Props = {
  menu: ParsedMenu
}
export const Header = component$(({ menu }: Props) => {
  return (
    <header class="fixed w-full bg-slate-300 z-10 h-10 border-black border-b-2">
      <Container type="wide" _class="flex h-full align-middle">
        <DesktopMenu menu={menu} />
        <BurgerButton _class="block sm:hidden ml-auto my-auto" />
        <MobileMenu menu={menu} />
      </Container>
    </header>
  )
})