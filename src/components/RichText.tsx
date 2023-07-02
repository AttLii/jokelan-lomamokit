type Props = {
  className?: string,
  html: string
}
export default function RichText({ className = "", html }: Props) {
  return <div className={`rich-text ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}