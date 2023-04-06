import { component$ } from "@builder.io/qwik";

type Props = {
  required?: boolean;
  placeholder: string;
  name: string;
  disabled?: boolean
}
export const Textarea = component$(({ placeholder, required, ...rest }: Props) => {
  const _placeholder = placeholder + (required ? " *" : "")
  return <textarea class="p-2 bg-transparent border-b-2 disabled:border-slate-400 enabled:border-black hover:enabled:bg-slate-200 focus:enabled:bg-slate-200" required={required} placeholder={_placeholder} {...rest} />
})