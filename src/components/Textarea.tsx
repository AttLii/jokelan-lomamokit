import { component$ } from "@builder.io/qwik";

type Props = {
  required?: boolean,
  placeholder: string
}
export const Textarea = component$(({ placeholder, required }: Props) => {
  const _placeholder = placeholder + (required ? " *" : "")
  return <textarea class="p-2 bg-transparent border-b-2 border-black hover:bg-slate-200 focus:bg-slate-200" required={required} placeholder={_placeholder} />
})