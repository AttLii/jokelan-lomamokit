import { component$ } from "@builder.io/qwik";
import type { ParsedMenu } from "~/parsers/contentful";
import { MenuLink } from "./MenuLink";

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
            <MenuLink menuItem={menuItem} />
          </li>
        ))}
      </ul>
    </nav>
  )
})