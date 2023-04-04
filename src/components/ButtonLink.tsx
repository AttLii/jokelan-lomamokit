import { Slot, component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import type { LinkProps } from "@builder.io/qwik-city";

type Props = LinkProps

export const ButtonLink = component$((props: Props) => {
  return (
    <Link {...props} class="inline-block py-2 px-4 bg-slate-500 rounded-2xl hover:bg-slate-400 transition-colors">
      <Slot />
    </Link>
  )
})