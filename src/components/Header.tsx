import { component$ } from "@builder.io/qwik";
import { BurgerButton } from "./BurgerButton";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Container } from "./Container";
import { HeaderLogoLink } from "./HeaderLogoLink";

export const Header = component$(() => {
  return (
    <header class="fixed w-full bg-slate-100 z-10 h-14 border-black border-b-2 py-2">
      <Container type="wide" class="flex h-full align-middle justify-between">
        <HeaderLogoLink />
        <DesktopMenu class="hidden sm:flex" />
        <BurgerButton class="block sm:hidden ml-auto my-auto" />
        <MobileMenu />
      </Container>
    </header>
  )
})