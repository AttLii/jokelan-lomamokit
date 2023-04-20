import { component$ } from "@builder.io/qwik"

type Props = {
  dangerouslySetInnerHTML: string;
  class?: string;
}
export const RichText = component$(({ class: _class = "", dangerouslySetInnerHTML }: Props) => {
  return (
    <div class={`${_class} rich-text`} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
  )
});
