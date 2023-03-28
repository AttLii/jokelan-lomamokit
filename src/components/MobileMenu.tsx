import { component$, useContext } from "@builder.io/qwik";
import type { ParsedMenu } from "~/parsers/contentful";
import { UiContext } from "~/root";
import { MenuLink } from "./MenuLink";

type Props = {
  menu: ParsedMenu
}
export const MobileMenu = component$(({ menu }: Props) => {
  const ui = useContext(UiContext);
  const backdrop = ui.nav ? "right-0 opacity-30" : "-right-full opacity-0"
  const menuLeft = ui.nav ? "right-0" : "-right-full"
  return (
    <>
      <div onClick$={() => ui.nav = !ui.nav} class={`cursor-pointer fixed bottom-0 h-[calc(100vh-1.5rem)] w-screen bg-black transition-opacity duration-500 ${backdrop}`} />
      <nav class={`block sm:hidden fixed bottom-0 w-full max-w-xs h-[calc(100vh-1.5rem)] bg-white mx-auto px-2 transition-all duration-500 ${menuLeft}`}
        aria-label={menu.title}>
        <ul class="flex flex-wrap gap-x-4">
          {menu.menuItems.map((menuItem, i) => (
            <li key={i}>
              <MenuLink menuItem={menuItem} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
})