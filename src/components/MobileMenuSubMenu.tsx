"use client";
import type { SubItemsRendererProps } from "./MenuLink";
import MenuLink from "./MenuLink";

export default function MobileMenuSubMenu({ subItems }: SubItemsRendererProps) {
  return (
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
}