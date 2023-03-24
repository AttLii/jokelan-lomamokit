import { component$ } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import type { ParsedMenu } from "~/parsers/contentful";

type Props = {
  menu: ParsedMenu
}
export const Header = component$(({ menu: { title, menuItems } }: Props) => {
  return (
    <header>
      <nav aria-label={title}>
        <ul class="flex flex-wrap gap-x-4">
          {menuItems.map((menuItem, i) => (
            <li key={i}>
              <MenuLink menuItem={menuItem} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
})