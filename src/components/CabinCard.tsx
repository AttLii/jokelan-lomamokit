import type { ParsedCabinReference } from '../parsers/contentful';
import AssetImage from './AssetImage';
import CabinCardLink from './CabinCardLink';

type Props = {
  cabin: ParsedCabinReference;
};
export default function CabinCard({ cabin: { path, title, image } }: Props) {
  return (
    <article className='overflow-hidden rounded-md border-2 border-black bg-slate-100'>
      {image && (
        <AssetImage
          className='aspect-4/3 w-full object-cover'
          alt=''
          src={image.src}
          fit='fill'
          height='452'
          width='603'
          srcSet={{
            '(min-width: 640px)': {
              fit: 'fill',
              height: '267',
              width: '356',
            },
            '(min-width: 768px)': {
              fit: 'fill',
              height: '222',
              width: '296',
            },
          }}
        />
      )}
      <div className='border-t-2 border-black p-4'>
        <h3 className='mb-2 font-display text-2xl font-bold'>{title}</h3>
        <CabinCardLink href={path} />
      </div>
    </article>
  );
}
