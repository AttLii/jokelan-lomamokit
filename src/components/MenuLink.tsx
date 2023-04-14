import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { HiChevronDown } from "@qwikest/icons/heroicons";
import type { ParsedMenuItem } from "~/parsers/contentful";
import { areRelativePathsSame } from "~/utils/qwik";

type Props = {
  menuItem: ParsedMenuItem,
  _class?: string,
  showSubItems: boolean;
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
  showSubItems
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
      {showIcon && (
        <div class="
          w-full min-w-[7.5rem] absolute top-full left-1/2 -translate-x-1/2 pt-[0.95rem]
          opacity-0
          group-focus-within:opacity-100 group-hover:opacity-100
          transition-opacity
        ">
          <ul class="flex flex-col gap-2 bg-slate-100 border-black border-2 border-t-0 p-4">
            {subItems.map((subItem, i) => (
              <li key={i}>
                <MenuLink menuItem={subItem} showSubItems={false} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})