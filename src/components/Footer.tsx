import { component$ } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import { Container } from "./Container";
import type { ParsedMenu } from "~/parsers/contentful";

type Props = {
  menu: ParsedMenu
}
export const Footer = component$(({ menu: { title, menuItems } }: Props) => {
  return (
    <footer class="w-full bg-slate-300">
      <Container type="wide">
        <nav aria-label={title}>
          <ul class="gap-y-4">
            {menuItems.map((menuItem, i) => (
              <li key={i}>
                <MenuLink menuItem={menuItem} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  )
})