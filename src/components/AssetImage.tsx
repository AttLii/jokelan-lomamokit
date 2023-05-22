import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
type ContentfulImageProps = {
  fit?: "pad" | "fill";
  width: string | number;
  height: string | number;
}
type Props = Omit<ImgProps, "srcSet"> & ContentfulImageProps & {
  src: string;
  srcSet?: Record<string, Required<ContentfulImageProps>>
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
  return srcSet ?
    <picture>
      {Object.keys(srcSet).map((key) => (
        <source key={key} media={key} srcSet={`${src}&fit=${srcSet[key].fit}&w=${srcSet[key].width}&h=${srcSet[key].height}`} />
      ))}
      {Image}
    </picture>
    : Image;
};

export default AssetImage;