"use client";
import type { FC } from "react";
import { ArrowUp } from "./icons/lucide";
import useT from "../hooks/useT";

type Props = {
  className?: string;
}
const BackToTopButton: FC<Props> = ({ className = "" }: Props) => {
  const label = useT('generic.back.to.top');
  const onClick = () => window.scrollTo({
    behavior: "smooth",
    top: 0
  });
  return (
    <button
      className={`${className} aspect-square w-10 rounded-full border-2 border-black`}
      onClick={onClick}
      aria-label={label}
    >
      <ArrowUp className="w-7 h-7 m-auto" />
    </button>
  );
};

export default BackToTopButton;