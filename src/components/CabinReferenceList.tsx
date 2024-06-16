import type { ParsedCabinReference } from '../parsers/contentful';
import CabinCard from './CabinCard';

type Props = {
  cabinReferences: ParsedCabinReference[];
};
export default function CabinReferenceList({ cabinReferences }: Props) {
  return (
    <ul className='grid gap-4 sm:grid-cols-2 md:grid-cols-4'>
      {cabinReferences.map((cabin) => {
        return (
          <li key={cabin.id}>
            <CabinCard cabin={cabin} />
          </li>
        );
      })}
    </ul>
  );
}
