import { component$ } from "@builder.io/qwik";
import { BurgerButton } from "./BurgerButton";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import type { ParsedMenu } from "~/parsers/contentful";

type Props = {
  menu: ParsedMenu
}
export const Header = component$(({ menu }: Props) => {
  return (
    <header class="fixed w-full bg-slate-300 z-10 h-6">
      <div class="max-w-7xl mx-auto px-2">
        <DesktopMenu menu={menu} />
        <BurgerButton _class="block sm:hidden ml-auto" />
        <MobileMenu menu={menu} />
      </div>
    </header>
  )
})