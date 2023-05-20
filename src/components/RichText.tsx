import type { FC } from "react";

export const RichText: FC<{ className?: string, html: string }> = ({ className = "", html }) => {
  return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
};