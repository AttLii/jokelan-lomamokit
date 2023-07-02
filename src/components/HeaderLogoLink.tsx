"use client";
import Link from "next/link";
import Image from "next/image";
import useT from "../hooks/useT";

export default function HeaderLogoLink() {
  const label = useT('generic.logo.link');
  return (
    <Link href="/" aria-label={label} className="flex items-center gap-2 uppercase font-semibold group">
      <Image priority src="/logo.svg" loading="eager" width="40" height="40" alt="" />
      <div className="flex flex-col leading-tight font-sans">
        <span className="group-hover:ml-1 group-focus:ml-1 transition-all">Jokelan </span>
        <span className="group-hover:ml-2 group-focus:ml-2 transition-all">Lomamökit</span>
      </div>
    </Link>
  );
}