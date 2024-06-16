'use client';
import { usePathname } from 'next/navigation';
import { X } from './icons/lucide';

export default function PreviewInfoBanner() {
  const path = usePathname();
  return (
    <a
      href={`/api/disable-draft?path=${path}`}
      className='fixed bottom-0 left-0 z-50 w-full border-2 border-black bg-white p-4'
    >
      <div className='flex flex-row flex-nowrap items-center justify-between gap-4'>
        Draftmode turned on
        <X />
      </div>
    </a>
  );
}
