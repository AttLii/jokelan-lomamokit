import Container from "./Container";
import MenuLink from "./MenuLink";
import FooterLogoLink from "./FooterLogoLink";
import BackToTopButton from "./BackToTopButton";
import FooterInfoList from "./FooterInfoList";
import { useGlobalContentContext } from "../contexts/globalContent";

const Footer = () => {
  const { footerMenu } = useGlobalContentContext();
  return (
    <footer className="w-full bg-slate-100 pt-10 pb-4 border-t-2 border-black relative">
      <Container type="wide" className="relative flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {footerMenu && (
            <nav aria-label={footerMenu.title} className="md:order-last">
              <ul className="flex flex-col md:flex-row gap-x-4 gap-y-1">
                {footerMenu.menuItems.map((menuItem, i) => (
                  <li key={i}>
                    <MenuLink menuItem={menuItem} showSubItems={false} />
                  </li>
                ))}
              </ul>
            </nav>

          )}
          <FooterInfoList />
        </div>
        <FooterLogoLink className="mx-auto" />
        <p className="text-center font-sans">© {(new Date()).getFullYear()} Jokelan Lomamökit</p>
        <BackToTopButton className="absolute bottom-1.5 right-4" />
      </Container>
    </footer>
  );
};

export default Footer;