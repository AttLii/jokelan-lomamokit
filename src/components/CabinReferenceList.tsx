import type { FC } from "react";
import type { ParsedCabinReference } from "../parsers/contentful";
import { CabinCard } from "./CabinCard";

type Props = {
  cabinReferences: ParsedCabinReference[]
}
export const CabinReferenceList: FC<Props> = ({ cabinReferences }) => {
  return (
    <ul className="grid gap-4 sm:grid-cols-4">
      {cabinReferences.map((cabin) => {
        return (
          <li key={cabin.id}>
            <CabinCard cabin={cabin} />
          </li>
        );
      })}
    </ul>
  );
};