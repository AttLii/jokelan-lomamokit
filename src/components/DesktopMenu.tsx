import type { FC} from "react";
import { Fragment } from "react";
import type { SubItemsRendererProps } from "./MenuLink";
import { MenuLink } from "./MenuLink";
import { useGlobalContentContext } from "../contexts/globalContent";

const SubMenuRenderer: FC<SubItemsRendererProps> = ({ subItems }) => (
  <div className="
      w-full min-w-[7.5rem] absolute top-full left-1/2 -translate-x-1/2 pt-[0.95rem]
      opacity-0 pointer-events-none
      group-focus-within:opacity-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-hover:pointer-events-auto
      transition-opacity
  ">
    <ul className="flex flex-col gap-2 bg-slate-100 border-black border-2 border-t-0 p-4">
      {subItems.map((subItem, i) => (
        <li key={i}>
          <MenuLink menuItem={subItem} showSubItems={false} />
        </li>
      ))}
    </ul>
  </div>
);

export const DesktopMenu: FC = () => {
  const { headerMenu } = useGlobalContentContext();
  if (!headerMenu) return <Fragment />;

  return (
    <nav className="hidden sm:flex" aria-label={headerMenu.title}>
      <ul className="flex flex-wrap gap-x-4 my-auto">
        {headerMenu.menuItems.map((menuItem, i) => (
          <li key={i}>
            <MenuLink
              menuItem={menuItem}
              showSubItems
              SubMenuRenderer={SubMenuRenderer}
              className="min-w-[5rem] text-center"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};