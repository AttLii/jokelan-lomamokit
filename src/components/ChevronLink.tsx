import type { LinkProps } from "next/link";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";
import { ChevronRight } from "./icons/lucide";

type Props = LinkProps & PropsWithChildren
export const IconLink: FC<Props> = ({ children, ...rest }) => {
  return (
    <Link {...rest} className="font-sans color-black inline-flex gap-1 flex-nowrap items-center hover:gap-2 focus:gap-2 transition-all">
      {children}
      <ChevronRight className="h-4 w-4" />
    </Link>
  );
};