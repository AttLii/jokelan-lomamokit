"use client";
import Link from "next/link";
import Image from "next/image";
import useT from "../hooks/useT";

type Props = {
  className?: string;
}
export default function FooterLogoLink({ className = "" }: Props) {
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
}