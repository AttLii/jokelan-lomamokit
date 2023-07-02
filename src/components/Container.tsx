import type { PropsWithChildren } from "react";

export type Props = PropsWithChildren & {
  type: "wide" | "narrow",
  className?: string
}

export default function Container({ children, type, className = "" }: Props) {
  const maxWidth = type === "wide" ? "max-w-7xl" : "max-w-xl";
  return (
    <div className={`mx-auto px-4 ${maxWidth} ${className}`}>
      {children}
    </div>
  );
}