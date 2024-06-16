import type { ParsedHero } from '../../parsers/contentful';
import Carousel from '../Carousel';
import RichText from '../RichText';

type Props = {
  section: ParsedHero;
};
export default function Hero({ section: { gallery, richText } }: Props) {
  return (
    <section className='relative z-0 aspect-[9/16] max-h-[50rem] w-full overflow-hidden border-b-2 border-black sm:aspect-[16/9]'>
      <Carousel images={gallery} />
      <div className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-10 p-4'>
        <RichText
          className='h-max w-full max-w-2xl break-keep text-white'
          html={richText}
        />
      </div>
    </section>
  );
}
