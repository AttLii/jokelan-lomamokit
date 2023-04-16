import { component$ } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import { Container } from "./Container";
import { FooterLogoLink } from "./FooterLogoLink";
import { BackToTopButton } from "./BackToTopButton";
import { FooterInfoList } from "./FooterInfoList";
import type { Props as FooterInfoListProps } from "./FooterInfoList";
import type { ParsedMenu } from "~/parsers/contentful";

type Props = {
  menu: ParsedMenu;
  infoRows: FooterInfoListProps['rows']
}
export const Footer = component$(({
  menu: { title, menuItems },
  infoRows
}: Props) => {
  return (
    <footer class="w-full bg-slate-100 pt-10 pb-4 border-t-2 border-black relative">
      <Container type="wide" _class="relative flex flex-col gap-4">
        <nav aria-label={title}>
          <ul class="flex flex-col md:flex-row gap-x-4 gap-y-1">
            {menuItems.map((menuItem, i) => (
              <li key={i}>
                <MenuLink menuItem={menuItem} showSubItems={false} />
              </li>
            ))}
          </ul>
        </nav>
        <FooterInfoList rows={infoRows} />
        <FooterLogoLink _class="mx-auto" />
        <p class="text-center">© {(new Date()).getFullYear()} Jokelan Lomamökit</p>
        <BackToTopButton _class="absolute bottom-1.5 right-4" />
      </Container>
    </footer>
  )
})