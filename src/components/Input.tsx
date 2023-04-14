import { component$ } from "@builder.io/qwik";

type Props = {
  type: "text" | "email" | "tel";
  required?: boolean;
  label: string;
  name: string;
  disabled?: boolean
}
export const Input = component$(({ required, label, ...rest }: Props) => {
  const _label = label + (required ? " *" : "")
  return (
    <label class="flex flex-col">
      <span>{_label}</span>
      <input
        class="rounded-none p-2 bg-transparent border-b-2 disabled:border-slate-400 enabled:border-black hover:enabled:bg-slate-200 focus:enabled:bg-slate-200"
        required={required}
        {...rest}
      />
    </label>
  )
})