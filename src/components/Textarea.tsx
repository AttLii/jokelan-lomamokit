type Props = {
  required?: boolean;
  label: string;
  name: string;
  disabled?: boolean;
};
export default function Textarea({ label, required, ...rest }: Props) {
  const _label = label + (required ? ' *' : '');
  return (
    <label className='flex flex-col font-sans'>
      <span>{_label}</span>
      <textarea
        className='rounded-none border-b-2 bg-transparent p-2 enabled:border-black hover:enabled:bg-slate-200 focus:enabled:bg-slate-200 disabled:border-slate-400'
        rows={5}
        required={required}
        {...rest}
      />
    </label>
  );
}
