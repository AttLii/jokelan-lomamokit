"use client";
import type { FC } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuChevronButton from "./MenuChevronButton";
import useUi from "../hooks/useUi";
import type { ParsedMenuItem, ParsedSubMenuItem } from "../parsers/contentful";

export type SubItemsRendererProps = {
  subItems: ParsedSubMenuItem[]
}

type Props = {
  menuItem: ParsedMenuItem | ParsedSubMenuItem,
  className?: string,
  showSubItems: boolean;
  SubMenuRenderer?: FC<SubItemsRendererProps>
}

export default function MenuLink({ menuItem, className = "", showSubItems, SubMenuRenderer }: Props) {
  const ui = useUi();
  const pathname = usePathname();
  const onClick = () => ui.dispatch({ type: "NAV_CLOSE" });
  // not wrapped in useMemo, since typescript loses checks for subItems
  const showIcon = showSubItems && "subItems" in menuItem && menuItem.subItems.length > 0;
  const activeClass = useMemo(() => pathname === menuItem.path ? 'font-semibold' : '', [pathname, menuItem.path]);
  return (
    <div className={`${className} ${showIcon ? "pr-6" : ""} group relative flex items-center justify-center`}>
      <Link className={`font-sans w-full hover:underline ${activeClass}`} href={menuItem.path} onClick={onClick}>
        {menuItem.title}
      </Link>
      {showIcon && (
        <MenuChevronButton
          className="absolute top-0 right-0"
          iconClassName="rotate-0 group-focus-within:rotate-180 group-hover:rotate-180 transition-transform"
        />
      )}
      {(showIcon && SubMenuRenderer) && (
        <SubMenuRenderer subItems={menuItem.subItems} />
      )}
    </div>
  );
}