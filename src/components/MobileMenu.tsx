import { component$, useContext } from "@builder.io/qwik";
import type { ParsedMenu } from "~/parsers/contentful";
import { UiContext } from "~/root";
import { MenuLink } from "./MenuLink";

type Props = {
  menu: ParsedMenu
}
export const MobileMenu = component$(({ menu }: Props) => {
  const ui = useContext(UiContext)
  const menuLeft = ui.nav ? "left-0" : "left-full"
  return (
    <nav class={`block sm:hidden fixed bottom-0 left-0 w-full h-[calc(100vh-1.5rem)] bg-white max-w-7xl mx-auto px-2 transition-all duration-500 ${menuLeft}`}
      aria-label={menu.title}>
      <ul class="flex flex-wrap gap-x-4">
        {menu.menuItems.map((menuItem, i) => (
          <li key={i}>
            <MenuLink menuItem={menuItem} />
          </li>
        ))}
      </ul>
    </nav>
  )
})