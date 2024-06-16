import { useMemo } from 'react';

type Props = {
  type: 'text' | 'email' | 'tel';
  required?: boolean;
  label: string;
  name: string;
  disabled?: boolean;
};
export default function Input({ required, label, ...rest }: Props) {
  const _label = useMemo(
    () => label + (required ? ' *' : ''),
    [label, required]
  );
  return (
    <label className='flex flex-col font-sans'>
      <span>{_label}</span>
      <input
        className='rounded-none border-b-2 bg-transparent p-2 enabled:border-black hover:enabled:bg-slate-200 focus:enabled:bg-slate-200 disabled:border-slate-400'
        required={required}
        {...rest}
      />
    </label>
  );
}
