import { component$ } from "@builder.io/qwik";
import type { ParsedImageAsset } from "~/parsers/contentful"

type Props = ParsedImageAsset & {
  _class?: string,
  loading: "eager" | "lazy",
  srcSet?: Record<string, string>
  height: string;
  width: string;
}
export const AssetImage = component$(({ _class = "", alt, loading, height, src, width, srcSet }: Props) => {
  return (
    <picture>
      {srcSet && Object.keys(srcSet)?.map((key, i) => (
        <source key={i} media={key} srcSet={srcSet[key]} />
      ))}
      <img class={_class} src={src} loading={loading} alt={alt} height={height} width={width} decoding="async" />
    </picture>
  )
})