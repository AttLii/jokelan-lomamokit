import MenuLink from "./MenuLink";
import DesktopMenuSubMenu from "./DesktopMenuSubMenu";
import globalContent from "../prevals/globalContent.preval";

export default function DesktopMenu() {
  if (!globalContent.headerMenu) return null;

  return (
    <nav className="hidden sm:flex" aria-label={globalContent.headerMenu.title}>
      <ul className="flex flex-wrap gap-x-4 my-auto">
        {globalContent.headerMenu.menuItems.map((menuItem, i) => (
          <li key={i}>
            <MenuLink
              menuItem={menuItem}
              showSubItems
              SubMenuRenderer={DesktopMenuSubMenu}
              className="min-w-[5rem] text-center"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}