'use client';
import type { ParsedAssetImage } from '../parsers/contentful';
import { useEffect, useState } from 'react';
import AssetImage from './AssetImage';

type Props = {
  images: ParsedAssetImage[];
};
export default function Carousel({ images }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onInterval = () => {
      setIndex((i) => {
        return index === images.length - 1 ? 0 : i + 1;
      });
    };
    const timer = setInterval(onInterval, 5000);
    return () => clearInterval(timer);
  });

  return (
    <ul
      className='flex h-full transition-all duration-1000'
      style={{
        transform: `translateX(${index === 0 ? 0 : index * 100 * -1}%)`,
      }}
    >
      {images.map(({ src }, i) => (
        <li className='relative min-w-full' key={i}>
          <AssetImage
            fit='fill'
            height='800'
            width='640'
            className='h-full w-full object-cover object-center'
            loading={i === 0 ? 'eager' : 'lazy'}
            src={src}
            srcSet={{
              '(min-width: 640px)': {
                fit: 'fill',
                width: '1041',
                height: '584',
              },
              '(min-width: 1024px)': {
                fit: 'fill',
                width: '1920',
                height: '1080',
              },
            }}
          />
        </li>
      ))}
    </ul>
  );
}
