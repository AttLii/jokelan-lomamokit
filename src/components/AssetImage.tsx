import type { DetailedHTMLProps, ImgHTMLAttributes } from "react";

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
type ContentfulImageProps = {
  fit?: "pad" | "fill";
  width: string | number;
  height: string | number;
}

type Breakpoint = 640 | 768 | 1024;
type MediaQuery = "min-width";
type SrcSetKey = `(${MediaQuery}: ${Breakpoint}px)`

type Props = Omit<ImgProps, "srcSet"> & ContentfulImageProps & {
  src: string;
  srcSet?: Partial<Record<SrcSetKey, Required<ContentfulImageProps>>>
}

export default function AssetImage({ alt = "", loading = "lazy", src, fit, width, height, srcSet, ...props }: Props) {
  const Image = <img
    decoding="async"
    alt={alt}
    loading={loading}
    src={fit ? `${src}&fit=${fit}&w=${width}&h=${height}` : src}
    width={width}
    height={height}
    {...props}
  />;
  return srcSet ?
    <picture>
      {Object.keys(srcSet).map((key) => {
        const _key = key as SrcSetKey;
        const set = srcSet[_key] as Required<ContentfulImageProps>;
        return (
          <source
            key={key}
            media={key}
            srcSet={`${src}&fit=${set.fit}&w=${set.width}&h=${set.height}`}
          />
        );
      })}
      {Image}
    </picture>
    : Image;
}
