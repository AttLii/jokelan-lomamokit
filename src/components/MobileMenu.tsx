import { component$, useContext } from "@builder.io/qwik";
import { UiContext } from "~/root";
import { MenuLink } from "./MenuLink";
import type { SubItemsRendererProps } from "./MenuLink";
import type { ParsedMenu } from "~/parsers/contentful";

const SubMenuRenderer = component$(({ subItems }: SubItemsRendererProps) => (
  <div class="w-full pl-4 mb-4 hidden group-hover:block group-focus-within:block">
    <ul class="flex flex-col gap-1">
      {subItems.map((subItem, i) => (
        <li key={i}>
          <MenuLink menuItem={subItem} showSubItems={false} />
        </li>
      ))}
    </ul>
  </div>
))

type Props = {
  menu: ParsedMenu
}
export const MobileMenu = component$(({ menu }: Props) => {
  const ui = useContext(UiContext);
  const backdrop = ui.nav ? "right-0 opacity-30" : "-right-full opacity-0"
  const menuLeft = ui.nav ? "right-0" : "-right-full"
  return (
    <>
      <div onClick$={() => ui.nav = !ui.nav} class={`sm:hidden block cursor-pointer fixed top-[3.5rem] h-[calc(100%-3.5rem)] w-screen bg-black transition-opacity duration-500 ${backdrop}`} />
      <nav class={`block sm:hidden border-l-2 border-black fixed top-[3.5rem] w-full h-[calc(100%-3.5rem)] bg-slate-100 mx-auto py-4 transition-all duration-500 px-4 ${menuLeft}`}
        aria-label={menu.title}>
        <ul class="flex flex-col gap-x-4">
          {menu.menuItems.map((menuItem, i) => (
            <li key={i}>
              <MenuLink _class="justify-between text-left flex-wrap gap-1" menuItem={menuItem} showSubItems={true} SubMenuRenderer={SubMenuRenderer} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
})