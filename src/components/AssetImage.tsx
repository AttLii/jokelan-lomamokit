import { component$ } from "@builder.io/qwik";
import type { ParsedImageAsset } from "~/parsers/contentful"

type Props = ParsedImageAsset & {
  class?: string,
  loading: "eager" | "lazy",
  srcSet?: Record<string, string>
  height: string;
  width: string;
}
export const AssetImage = component$(({ class: _class = "", alt, loading, height, src, width, srcSet }: Props) => {
  const Img = () => <img class={_class} src={src} loading={loading} alt={alt} height={height} width={width} decoding="async" />
  if (!srcSet) return <Img />
  return (
    <picture>
      {Object.keys(srcSet)?.map((key, i) => (
        <source key={i} media={key} srcSet={srcSet[key]} />
      ))}
      <Img />
    </picture>
  )
})