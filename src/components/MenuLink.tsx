import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { areRelativePathsSame } from "~/utils/qwik";
import type { Component } from "@builder.io/qwik";
import type { ParsedMenuItem } from "~/parsers/contentful";
import { t } from "~/stores/translation";
import { ChevronDown } from "./icons/lucide/ChevronDown";

export type SubItemsRendererProps = {
  subItems: ParsedMenuItem[]
}

type Props = {
  menuItem: ParsedMenuItem,
  class?: string,
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
  class: _class = "",
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
      <Link class={`w-full hover:underline ${activeClass}`} href={path}>
        {title}
      </Link>

      {showIcon && (
        <button tabIndex={-1} aria-hidden="true" class="aspect-square absolute top-0 right-0" aria-label={t('sub.menu.toggle')}>
          <ChevronDown class="h-6 w-6 rotate-0 group-focus-within:rotate-180 group-hover:rotate-180 transition-transform" />
        </button>
      )}
      {(showIcon && SubMenuRenderer) && (
        <SubMenuRenderer subItems={subItems} />
      )}
    </div>
  )
})