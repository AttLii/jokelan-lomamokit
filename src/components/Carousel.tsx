import { ParsedAssetImage } from "../parsers/contentful";
import { FC, useEffect, useState } from "react";
import { AssetImage } from "./AssetImage";

type Props = {
  images: ParsedAssetImage[]
}
export const Carousel: FC<Props> = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onInterval = () => {
      setIndex(i => {
        return index === images.length - 1
          ? 0
          : i + 1;
      });
    };
    const timer = setInterval(onInterval, 5000);
    return () => clearInterval(timer);
  });

  return (
    <ul className="flex h-full transition-all duration-1000" style={{ transform: `translateX(${index === 0 ? 0 : index * 100 * -1}%)` }}>
      {images.map(({ src, ...rest }, i) => (
        <li className="min-w-full relative" key={i}>
          <AssetImage
            {...rest}
            width={639}
            height={1139}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? "eager" : "lazy"}
            priority={i === 0}
            src={`${src}&w=639&h=1136&fit=fill`}
            srcSet={{
              '(min-width: 640px)': `${src}&w=1920&h=1080&fit=fill`
            }}
          />
        </li>
      ))}
    </ul>
  );
};