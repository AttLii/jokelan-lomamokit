import type { EntryFields } from 'contentful';

type Props = {
  title: string;
  location: EntryFields.Location;
};
export default function OpenStreetMapEmbed({ title, location }: Props) {
  const { lat, lon } = location;
  return (
    <div className='relative aspect-square w-full overflow-hidden rounded-md border-2 border-black sm:aspect-16/9'>
      <iframe
        title={title}
        loading='lazy'
        className='absolute h-full w-full'
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.005},${lat - 0.005},${lon + 0.005},${lat + 0.005}&marker=${lat},${lon}`}
      />
    </div>
  );
}
