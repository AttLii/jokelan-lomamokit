import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { ParsedMenuItem } from "~/parsers/contentful";
import { areRelativePathsSame } from "~/utils/qwik";

type Props = {
  menuItem: ParsedMenuItem
}
export const MenuLink = component$(({ menuItem }: Props) => {
  const location = useLocation()
  const activeClass = areRelativePathsSame(location.url.pathname, menuItem.content.path)
    ? 'font-semibold'
    : ''
  return (
    <Link class={`hover:underline ${activeClass}`} href={menuItem.content.path}>
      {menuItem.title}
    </Link>
  )
})