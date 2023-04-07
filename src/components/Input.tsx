import { component$ } from "@builder.io/qwik";

type Props = {
  type: "text" | "email" | "tel";
  required?: boolean;
  placeholder?: string;
  name: string;
  disabled?: boolean
}
export const Input = component$(({ required, placeholder, ...rest }: Props) => {
  const _placeholder = placeholder + (required ? " *" : "")
  return <input class="rounded-none p-2 bg-transparent border-b-2 disabled:border-slate-400 enabled:border-black hover:enabled:bg-slate-200 focus:enabled:bg-slate-200" placeholder={_placeholder} required={required} {...rest} />
})