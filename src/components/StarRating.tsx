import { component$ } from "@builder.io/qwik";

type StarProps = {
  class?: string;
}
const LuStarHalf = component$(({ class: _class = "" }: StarProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em" class={_class}>
      <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
    </svg>
  )
})


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
            <LuStarHalf class={`${rotate} ${iconFill}`} />
          </li>
        )
      })}
    </ul>
  )
})