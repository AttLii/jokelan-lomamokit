import { component$ } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import { Container } from "./Container";
import type { ParsedMenu } from "~/parsers/contentful";

type Props = {
  menu: ParsedMenu
}
export const Footer = component$(({ menu: { title, menuItems } }: Props) => {
  return (
    <footer class="w-full bg-slate-100 py-4">
      <Container type="wide" _class="flex flex-col gap-4">
        <nav aria-label={title}>
          <ul class="flex flex-col gap-0.5">
            {menuItems.map((menuItem, i) => (
              <li key={i}>
                <MenuLink menuItem={menuItem} />
              </li>
            ))}
          </ul>
        </nav>
        <hr />
        <p class="text-center">© {(new Date()).getFullYear()} Jokelan Lomamökit</p>
      </Container>
    </footer>
  )
})