import { FC } from "react";
import { StarHalf } from "./icons/lucide";


type Props = {
  rating: number;
}
export const StarRating: FC<Props> = ({ rating }: Props) => {
  return (
    <ul aria-hidden={true} className="flex flex-nowrap">
      {Array.from({ length: 10 }).map((_, i) => {
        const isEven = i % 2 === 0;
        const rotate = isEven ? "rotate-y-0" : "rotate-y-180";
        const iconFill = i < rating ? "fill-black" : "fill-slate-300";
        return (
          <li key={i} className={`${isEven ? "" : "-ml-4"}`}>
            <StarHalf className={`${rotate} ${iconFill}`} />
          </li>
        );
      })}
    </ul>
  );
};