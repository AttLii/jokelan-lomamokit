import { Slot, component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import type { LinkProps } from "@builder.io/qwik-city";
import { LuChevronRight } from "@qwikest/icons/lucide";

type Props = LinkProps
export const IconLink = component$((props: Props) => {
  return (
    <Link {...props} class="color-black inline-flex gap-1 flex-nowrap items-center hover:gap-2 focus:gap-2 transition-all">
      <Slot />
      <LuChevronRight class="h-4 w-4" />
    </Link>
  )
})