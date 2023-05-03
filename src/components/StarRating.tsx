import { component$ } from "@builder.io/qwik";
import { StarHalf } from "./icons/lucide";


type Props = {
  rating: number;
}
export const StarRating = component$(({ rating }: Props) => {
  return (
    <ul aria-hidden={true} class="flex flex-nowrap">
      {Array.from({ length: 10 }).map((_, i) => {
        const isEven = i % 2 === 0
        const rotate = isEven ? "rotate-y-0" : "rotate-y-180"
        const iconFill = i < rating ? "fill-black" : "fill-slate-300"
        return (
          <li key={i} class={`${isEven ? "" : "-ml-4"}`}>
            <StarHalf class={`${rotate} ${iconFill}`} />
          </li>
        )
      })}
    </ul>
  )
})