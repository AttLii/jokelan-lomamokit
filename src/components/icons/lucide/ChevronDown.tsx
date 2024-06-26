import type { IconProps } from '../../../types/icon';

export default function ChevronDown({ className = '' }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`lucide lucide-chevron-down ${className}`}
    >
      <polyline points='6 9 12 15 18 9' />
    </svg>
  );
}
