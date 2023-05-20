import type { FC } from "react";
import { useT } from "../contexts/stringTranslations";
import Link from "next/link";
import Image from "next/image";

type Props = {
  className?: string;
}
export const FooterLogoLink: FC<Props> = ({ className = "" }: Props) => {
  const label = useT('generic.logo.link');
  return (
    <Link
      href="/"
      aria-label={label}
      className={className}
    >
      <Image src="/logo-footer.svg" loading="lazy" width="120" height="120" alt="" />
    </Link>
  );
};