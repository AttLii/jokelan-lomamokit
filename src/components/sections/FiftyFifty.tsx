import type { ParsedFiftyFifty } from '../../parsers/contentful';
import { useMemo } from 'react';
import AssetImage from '../AssetImage';
import RichText from '../RichText';
import Container from '../Container';
import Section from '../Section';

type Props = {
  section: ParsedFiftyFifty;
};
export default function FiftyFifty({
  section: { image, richText, order },
}: Props) {
  const orderClass = useMemo(
    () => (order === 'Image-Text' ? 'lg:order-first' : 'lg:order-last'),
    [order]
  );
  return (
    <Section>
      <Container
        type='wide'
        className='grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2'
      >
        <div
          className={`relative my-auto aspect-square overflow-hidden rounded-md border-2 border-black lg:aspect-auto lg:h-full ${orderClass} `}
        >
          {image && (
            <AssetImage
              className='absolute left-0 top-0 h-full w-full object-cover object-center'
              alt={image.alt}
              src={image.src}
              fit='fill'
              height='731'
              width='731'
              srcSet={{
                '(min-width: 1024px)': {
                  fit: 'fill',
                  height: '604',
                  width: '604',
                },
              }}
            />
          )}
        </div>
        <div className='my-auto lg:py-8'>
          <RichText html={richText} />
        </div>
      </Container>
    </Section>
  );
}
