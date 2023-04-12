import { component$ } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import { Container } from "./Container";
import type { ParsedMenu } from "~/parsers/contentful";
import { RichText } from "./RichText";

type Props = {
  menu: ParsedMenu;
  contactInformation: string;
}
export const Footer = component$(({ menu: { title, menuItems }, contactInformation }: Props) => {
  return (
    <footer class="w-full bg-slate-100 py-4 border-2 border-t-2 border-black">
      <Container type="wide" _class="flex flex-col gap-4">
        <div class="flex flex-col gap-4">
          <nav aria-label={title}>
            <ul class="flex flex-col md:flex-row gap-x-4 gap-y-1">
              {menuItems.map((menuItem, i) => (
                <li key={i}>
                  <MenuLink menuItem={menuItem} />
                </li>
              ))}
            </ul>
          </nav>
          <RichText dangerouslySetInnerHTML={contactInformation} _class="w-full md:w-1/2" />
        </div>
        <hr />
        <p class="text-center">© {(new Date()).getFullYear()} Jokelan Lomamökit</p>
      </Container>
    </footer>
  )
})