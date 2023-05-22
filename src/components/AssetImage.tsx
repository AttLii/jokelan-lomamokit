import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

type ImgProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

type Props = ImgProps & {
  fit?: "pad" | "fill";
  width: string | number;
  height: string | number;
  src: string;
}

const AssetImage: FC<Props> = ({ alt = "", loading = "lazy", src, fit, width, height, ...props }) => {
  if (fit) {
    src += `&fit=${fit}&w=${width}&h=${height}`;
  }
  return (
    <img
      decoding="async"
      alt={alt}
      loading={loading}
      src={src}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default AssetImage;