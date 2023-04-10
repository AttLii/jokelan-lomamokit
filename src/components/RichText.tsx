import { component$ } from "@builder.io/qwik"

type Props = {
  dangerouslySetInnerHTML: string;
  _class?: string;
}
export const RichText = component$(({ _class = "", dangerouslySetInnerHTML }: Props) => {
  return (
    <div class={_class} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
  )
})