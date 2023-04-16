import { component$ } from "@builder.io/qwik";
import { RichText } from "./RichText";
import type { Component } from "@builder.io/qwik";
import type { HiProps } from "@qwikest/icons/heroicons";
import type { IconProps } from "@qwikest/icons/lib/utils/icon-props";

type Row = {
  Icon: Component<IconProps & HiProps>
  text: string;
}
export type Props = {
  rows: Row[]
}
export const FooterInfoList = component$(({ rows }: Props) => {
  if (rows.length === 0) return null;
  return (
    <ul class="flex flex-col gap-1">
      {rows.map(({ Icon, text }, i) => (
        <li key={i} class="flex gap-2 items-start">
          <Icon class="mt-1 min-w-min" />
          <RichText dangerouslySetInnerHTML={text} />
        </li>
      ))}
    </ul>
  )
}) 