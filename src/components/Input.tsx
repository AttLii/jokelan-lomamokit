import { FC, useMemo } from "react";

type Props = {
  type: "text" | "email" | "tel";
  required?: boolean;
  label: string;
  name: string;
  disabled?: boolean
}
export const Input: FC<Props> = ({ required, label, ...rest }) => {
  const _label = useMemo(() => label + (required ? " *" : ""), [label, required])
  return (
    <label className="flex flex-col font-sans">
      <span>{_label}</span>
      <input
        className="rounded-none p-2 bg-transparent border-b-2 disabled:border-slate-400 enabled:border-black hover:enabled:bg-slate-200 focus:enabled:bg-slate-200"
        required={required}
        {...rest}
      />
    </label>
  )
}