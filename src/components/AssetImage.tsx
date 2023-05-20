import type { FC} from "react";
import { useMemo } from "react";
import type { ParsedAssetImage } from "../parsers/contentful";
import Image from "next/image";

type Props = ParsedAssetImage & {
  className?: string,
  srcSet?: Record<string, string>,
  priority?: boolean,
  loading: "eager" | "lazy",
  height: number,
  width: number,
}

type ImgProps = Omit<Props, "srcSet">

const Img: FC<ImgProps> = ({ alt = "", ...rest }) => <Image {...rest} alt={alt} decoding="async" />;

export const AssetImage: FC<Props> = (({ srcSet, alt, height, loading, src, width, className, priority }) => {
  const _Image = useMemo(() => <Img alt={alt} height={height} loading={loading} src={src} width={width} className={className} priority={priority} />, [alt, height, loading, src, width, className, priority]);

  if (!srcSet) return _Image;
  return (
    <picture>
      {Object.keys(srcSet)?.map((key, i) => (
        <source key={i} media={key} srcSet={srcSet[key]} />
      ))}
      {_Image}
    </picture>
  );
});