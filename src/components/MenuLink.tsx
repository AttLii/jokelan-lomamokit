import type { Component } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { HiChevronDown } from "@qwikest/icons/heroicons";
import type { ParsedMenuItem } from "~/parsers/contentful";
import { areRelativePathsSame } from "~/utils/qwik";

export type SubItemsRendererProps = {
  subItems: ParsedMenuItem[]
}

type Props = {
  menuItem: ParsedMenuItem,
  _class?: string,
  showSubItems: boolean;
  SubMenuRenderer?: Component<SubItemsRendererProps>
}

export const MenuLink = component$(({
  menuItem: {
    title,
    content: {
      path
    },
    subItems
  },
  _class = "",
  showSubItems,
  SubMenuRenderer
}: Props) => {
  const location = useLocation()
  const activeClass = areRelativePathsSame(location.url.pathname, path)
    ? 'font-semibold'
    : ''

  const showIcon = showSubItems && subItems.length > 0
  return (
    <div class={`group relative ${_class} ${showIcon ? "pr-6" : ""} flex items-center justify-center`}>
      <Link class={`hover:underline text-center ${activeClass}`} href={path}>
        {title}
      </Link>

      {showIcon && (
        <HiChevronDown variant="mini" class="absolute right-0 h-6 w-6 rotate-0 group-focus-within:rotate-180 group-hover:rotate-180 transition-transform" />
      )}
      {showIcon && SubMenuRenderer && (
        <SubMenuRenderer subItems={subItems} />
      )}
    </div>
  )
})