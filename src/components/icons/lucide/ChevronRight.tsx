import type { IconProps } from '../../../types/icon';

export default function ChevronRight({ className = '' }: IconProps) {
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
      className={`lucide lucide-chevron-right ${className}`}
    >
      <polyline points='9 18 15 12 9 6' />
    </svg>
  );
}
