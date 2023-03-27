import { component$, useSignal } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import type { ParsedMenu } from "~/parsers/contentful";
import { BurgerButton } from "./BurgerButton";

type Props = {
  menu: ParsedMenu
}
export const Header = component$(({ menu: { title, menuItems } }: Props) => {
  const open = useSignal(false)
  return (
    <header class="fixed w-full bg-slate-300 z-10 h-6">
      <div class="max-w-7xl mx-auto px-2">
        <nav class="hidden sm:block" aria-label={title}>
          <ul class="flex flex-wrap gap-x-4">
            {menuItems.map((menuItem, i) => (
              <li key={i}>
                <MenuLink menuItem={menuItem} />
              </li>
            ))}
          </ul>
        </nav>
        <BurgerButton _class="block sm:hidden ml-auto" open={open} />
      </div>
    </header>
  )
})