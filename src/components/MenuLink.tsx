import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronDown } from "./icons/lucide";
import { useT } from "../contexts/stringTranslations";
import { ParsedMenuItem, ParsedSubMenuItem } from "../parsers/contentful";

export type SubItemsRendererProps = {
  subItems: ParsedSubMenuItem[]
}

type Props = {
  menuItem: ParsedMenuItem | ParsedSubMenuItem,
  className?: string,
  showSubItems: boolean;
  SubMenuRenderer?: FC<SubItemsRendererProps>
}

export const MenuLink: FC<Props> = ({
  menuItem,
  className = "",
  showSubItems,
  SubMenuRenderer
}) => {
  const { path, title } = menuItem
  const label = useT('sub.menu.toggle')
  const router = useRouter()

  const activeClass = router.asPath === path
    ? 'font-semibold'
    : ''

  const showIcon = showSubItems && "subItems" in menuItem && menuItem.subItems.length > 0
  return (
    <div className={`group relative ${className} ${showIcon ? "pr-6" : ""} flex items-center justify-center`}>
      <Link className={`font-sans w-full hover:underline ${activeClass}`} href={path}>
        {title}
      </Link>

      {showIcon && (
        <button tabIndex={-1} aria-hidden="true" className="aspect-square absolute top-0 right-0" aria-label={label}>
          <ChevronDown className="h-6 w-6 rotate-0 group-focus-within:rotate-180 group-hover:rotate-180 transition-transform" />
        </button>
      )}
      {(showIcon && SubMenuRenderer) && (
        <SubMenuRenderer subItems={menuItem.subItems} />
      )}
    </div>
  )
}