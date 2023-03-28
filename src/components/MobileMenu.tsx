import { component$ } from "@builder.io/qwik";
import type { ParsedMenu } from "~/parsers/contentful";
import { MenuLink } from "./MenuLink";

type Props = {
  menu: ParsedMenu
}
export const MobileMenu = component$(({ menu: { title, menuItems } }: Props) => {
  return (
    <nav class="block sm:hidden" aria-label={title}>
      <ul class="flex flex-wrap gap-x-4">
        {menuItems.map((menuItem, i) => (
          <li key={i}>
            <MenuLink menuItem={menuItem} />
          </li>
        ))}
      </ul>
    </nav>
  )
})