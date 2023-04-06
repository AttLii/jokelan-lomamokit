import { component$ } from "@builder.io/qwik";

type Props = {
  required?: boolean;
  placeholder: string;
  name: string;
}
export const Textarea = component$(({ placeholder, required, name }: Props) => {
  const _placeholder = placeholder + (required ? " *" : "")
  return <textarea class="p-2 bg-transparent border-b-2 border-black hover:bg-slate-200 focus:bg-slate-200" required={required} placeholder={_placeholder} name={name} />
})