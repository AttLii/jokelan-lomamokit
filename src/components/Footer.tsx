import { component$ } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import { Container } from "./Container";
import { FooterLogoLink } from "./FooterLogoLink";
import { BackToTopButton } from "./BackToTopButton";
import { FooterInfoList } from "./FooterInfoList";
import type { ParsedMenu } from "~/parsers/contentful";

type Props = {
  menu: ParsedMenu;
  email: string;
  location: string;
  telephone: string;
}
export const Footer = component$(({
  menu: { title, menuItems },
  email,
  location,
  telephone
}: Props) => {
  return (
    <footer class="w-full bg-slate-100 pt-10 pb-4 border-t-2 border-black relative">
      <Container type="wide" class="relative flex flex-col gap-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <nav aria-label={title} class="md:order-last">
            <ul class="flex flex-col md:flex-row gap-x-4 gap-y-1">
              {menuItems.map((menuItem, i) => (
                <li key={i}>
                  <MenuLink menuItem={menuItem} showSubItems={false} />
                </li>
              ))}
            </ul>
          </nav>
          <FooterInfoList email={email} location={location} telephone={telephone} />
        </div>
        <FooterLogoLink class="mx-auto" />
        <p class="text-center">© {(new Date()).getFullYear()} Jokelan Lomamökit</p>
        <BackToTopButton class="absolute bottom-1.5 right-4" />
      </Container>
    </footer>
  )
})