type Props = {
  value: boolean;
  onClick: () => void;
  ariaLabel: string;
}
export default function ToggleSwitch({ value, onClick, ariaLabel }: Props) {

  return (
    <button
      role="checkbox"
      aria-checked={value}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        w-12 aspect-2/1 rounded-full bg-slate-200 border-2 border-black relative overflow-hidden
      `}
    >
      <div className={`
       bg-slate-300  h-6 aspect-square rounded-full border-2 border-black absolute top-1/2 -translate-y-1/2 transition-all
        ${value
          ? 'left-1/2 -translate-x-0'
          : 'left-0 -translate-x-0.5'
        }
      `} />
    </button>
  );
}