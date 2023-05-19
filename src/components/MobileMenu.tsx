import { FC, Fragment, useMemo } from "react";
import { MenuLink, SubItemsRendererProps } from "./MenuLink";
import { useGlobalContentContext } from "../contexts/globalContent";
import { useUiContext } from "../contexts/ui";

const SubMenuRenderer: FC<SubItemsRendererProps> = ({ subItems }) => (
  <div className="w-full pl-4 mb-4 hidden group-hover:block group-focus-within:block">
    <ul className="flex flex-col gap-1">
      {subItems.map((subItem, i) => (
        <li key={i}>
          <MenuLink menuItem={subItem} showSubItems={false} />
        </li>
      ))}
    </ul>
  </div>
);

export const MobileMenu = () => {
  const { headerMenu } = useGlobalContentContext();
  const { state, dispatch } = useUiContext();
  const { backdrop, menuLeft } = useMemo(() => {
    if (state.navOpen) {
      return {
        backdrop: "right-0 opacity-30",
        menuLeft: "right-0"
      };
    } else {
      return {
        backdrop: "-right-full opacity-0",
        menuLeft: "-right-full"
      };
    }
  }, [state.navOpen]);

  const onBackdropClick = () => dispatch({ type: "NAV_CLOSE" });

  if (!headerMenu) return <Fragment />;
  return (
    <>
      <div onClick={onBackdropClick} className={`sm:hidden block cursor-pointer fixed top-[3.5rem] h-[calc(100%-3.5rem)] w-screen bg-black transition-opacity duration-500 ${backdrop}`} />
      <nav className={`block sm:hidden border-l-2 border-black fixed top-[3.5rem] w-full h-[calc(100%-3.5rem)] bg-slate-100 mx-auto py-4 transition-all duration-500 px-4 ${menuLeft}`}
        aria-label={headerMenu.title}>
        <ul className="flex flex-col gap-x-4">
          {headerMenu.menuItems.map((menuItem, i) => (
            <li key={i}>
              <MenuLink className="justify-between text-left flex-wrap gap-1" menuItem={menuItem} showSubItems={true} SubMenuRenderer={SubMenuRenderer} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};