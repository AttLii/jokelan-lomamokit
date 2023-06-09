import Container from "./Container";
import HeaderLogoLink from "./HeaderLogoLink";
import DesktopMenu from "./DesktopMenu";
import BurgerButton from "./BurgerButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="fixed w-full bg-slate-100 z-10 h-14 border-black border-b-2 py-2">
      <Container type="wide" className="flex h-full align-middle justify-between">
        <HeaderLogoLink />
        <DesktopMenu />
        <BurgerButton />
        <MobileMenu />
      </Container>
    </header>
  );
}
