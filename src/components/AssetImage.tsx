import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

type Props = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const AssetImage: FC<Props> = ({ alt = "", loading = "lazy", ...props }) => {
  return (
    <img
      decoding="async"
      alt={alt}
      loading={loading}
      {...props}
    />
  );
};

export default AssetImage;