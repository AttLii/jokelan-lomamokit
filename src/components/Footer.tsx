import { component$, useContext } from "@builder.io/qwik";
import { MenuLink } from "./MenuLink";
import { Container } from "./Container";
import { FooterLogoLink } from "./FooterLogoLink";
import { BackToTopButton } from "./BackToTopButton";
import { FooterInfoList } from "./FooterInfoList";
import { GlobalContentContext } from "~/root";

export const Footer = component$(() => {
  const { footerMenu: { title, menuItems } } = useContext(GlobalContentContext)
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
          <FooterInfoList />
        </div>
        <FooterLogoLink class="mx-auto" />
        <p class="text-center">© {(new Date()).getFullYear()} Jokelan Lomamökit</p>
        <BackToTopButton class="absolute bottom-1.5 right-4" />
      </Container>
    </footer>
  )
})