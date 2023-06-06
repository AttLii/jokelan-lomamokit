import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
type ContentfulImageProps = {
  fit?: "pad" | "fill";
  width: string | number;
  height: string | number;
}

type SrcSetKey = `(min-width: ${640 | 768 | 1024}px)`

type Props = Omit<ImgProps, "srcSet"> & ContentfulImageProps & {
  src: string;
  srcSet?: (ContentfulImageProps & {
    media: SrcSetKey
  })[]
}

const AssetImage: FC<Props> = ({ alt = "", loading = "lazy", src, fit, width, height, srcSet, ...props }) => {
  const Image = <img
    decoding="async"
    alt={alt}
    loading={loading}
    src={fit ? `${src}&fit=${fit}&w=${width}&h=${height}` : src}
    width={width}
    height={height}
    {...props}
  />;
  return (srcSet && srcSet.length > 0) ?
    <picture>
      {srcSet.map(({ height, media, width, fit }) => (
        <source
          key={media}
          media={media}
          srcSet={`${src}&fit=${fit}&w=${width}&h=${height}`}
        />
      ))}
      {Image}
    </picture>
    : Image;
};

export default AssetImage;