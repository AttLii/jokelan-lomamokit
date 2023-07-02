
import MenuLink from "./MenuLink";
import MobileMenuNav from "./MobileMenuNav";
import MobileMenuSubMenu from "./MobileMenuSubMenu";
import globalContent from "../prevals/globalContent.preval";

const MobileMenu = () => {
  if (!globalContent.headerMenu) return null;
  return (
    <MobileMenuNav title={globalContent.headerMenu.title}>
      <ul className="flex flex-col gap-x-4">
        {globalContent.headerMenu.menuItems.map((menuItem, i) => (
          <li key={i}>
            <MenuLink className="justify-between text-left flex-wrap gap-1" menuItem={menuItem} showSubItems={true} SubMenuRenderer={MobileMenuSubMenu} />
          </li>
        ))}
      </ul>
    </MobileMenuNav>
  );
};

export default MobileMenu;