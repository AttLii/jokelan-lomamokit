import { FC, PropsWithChildren } from "react";

export const RichText: FC<PropsWithChildren & { className?: string }> = ({ children, className = "" }) => {
  return <div className={`rich-text ${className}`}>{children}</div>
}