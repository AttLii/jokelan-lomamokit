import type { FC } from "react";

const RichText: FC<{ className?: string, html: string }> = ({ className = "", html }) => {
  return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RichText;