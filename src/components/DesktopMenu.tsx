import { component$ } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import type { ParsedMenu } from "~/parsers/contentful";
import type { SubItemsRendererProps } from "./MenuLink";

const SubMenuRenderer = component$(({ subItems }: SubItemsRendererProps) => (
  <div class="
      w-full min-w-[7.5rem] absolute top-full left-1/2 -translate-x-1/2 pt-[0.95rem]
      opacity-0 pointer-events-none
      group-focus-within:opacity-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-hover:pointer-events-auto
      transition-opacity
    ">
    <ul class="flex flex-col gap-2 bg-slate-100 border-black border-2 border-t-0 p-4">
      {subItems.map((subItem, i) => (
        <li key={i}>
          <MenuLink menuItem={subItem} showSubItems={false} />
        </li>
      ))}
    </ul>
  </div>
))

type Props = {
  _class: string;
  menu: ParsedMenu;
}
export const DesktopMenu = component$(({ _class, menu: { title, menuItems } }: Props) => {
  return (
    <nav class={_class} aria-label={title}>
      <ul class="flex flex-wrap gap-x-4 my-auto">
        {menuItems.map((menuItem, i) => (
          <li key={i}>
            <MenuLink
              menuItem={menuItem}
              showSubItems
              SubMenuRenderer={SubMenuRenderer}
              _class="min-w-[5rem] text-center"
            />
          </li>
        ))}
      </ul>
    </nav>
  )
})