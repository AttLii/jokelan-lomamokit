import { component$ } from "@builder.io/qwik";

type Props = {
  type: "text" | "email" | "tel";
  required?: boolean;
  placeholder?: string;
  name: string;
}
export const Input = component$(({ required, placeholder, ...rest }: Props) => {
  const _placeholder = placeholder + (required ? " *" : "")
  return <input class="p-2 bg-transparent border-b-2 border-black hover:bg-slate-200 focus:bg-slate-200" placeholder={_placeholder} required={required} {...rest} />
})