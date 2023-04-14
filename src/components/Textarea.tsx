import { component$ } from "@builder.io/qwik";

type Props = {
  required?: boolean;
  label: string;
  name: string;
  disabled?: boolean
}
export const Textarea = component$(({ label, required, ...rest }: Props) => {
  const _label = label + (required ? " *" : "")
  return (
    <label class="flex flex-col">
      <span>{_label}</span>
      <textarea class="rounded-none p-2 bg-transparent border-b-2 disabled:border-slate-400 enabled:border-black hover:enabled:bg-slate-200 focus:enabled:bg-slate-200" rows={5} required={required} {...rest} />
    </label>
  )
})