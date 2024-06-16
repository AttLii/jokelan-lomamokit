'use client';

import useT from '../hooks/useT';

export default function SkipToContent() {
  const label = useT('generic.skip.to.content');
  const onClick = () => document.querySelector('main')?.focus();
  return (
    <button
      className='color-black fixed -top-1 left-1/2 z-50 -translate-x-1/2 -translate-y-full rounded-md border-2 border-black bg-slate-300 p-2 font-sans transition duration-0 focus:top-1 focus:translate-y-0'
      onClick={onClick}
    >
      {label}
    </button>
  );
}
