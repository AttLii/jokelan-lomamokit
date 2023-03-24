import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { ParsedMenuItem } from "~/parsers/contentful";

type Props = {
  menuItem: ParsedMenuItem
}
export const MenuLink = component$(({ menuItem }: Props) => {
  return (
    <Link href={menuItem.content.path}>
      {menuItem.title}
    </Link>
  )
})