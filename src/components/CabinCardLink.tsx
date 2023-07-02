"use client";

import useT from "../hooks/useT";
import IconLink from "./ChevronLink";

type Props = {
  href: string;
}
export default function CabinCardLink({ href }: Props) {
  const label = useT('generic.read.more');
  return (
    <IconLink href={href}>{label}</IconLink>
  );
}