import type { FC } from "react";

type Props = {
  required?: boolean;
  label: string;
  name: string;
  disabled?: boolean
}
export const Textarea: FC<Props> = (({ label, required, ...rest }) => {
  const _label = label + (required ? " *" : "");
  return (
    <label className="flex flex-col font-sans">
      <span>{_label}</span>
      <textarea className="rounded-none p-2 bg-transparent border-b-2 disabled:border-slate-400 enabled:border-black hover:enabled:bg-slate-200 focus:enabled:bg-slate-200" rows={5} required={required} {...rest} />
    </label>
  );
});