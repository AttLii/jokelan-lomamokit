'use client';
import Link from 'next/link';
import Image from 'next/image';
import useT from '../hooks/useT';

export default function HeaderLogoLink() {
  const label = useT('generic.logo.link');
  return (
    <Link
      href='/'
      aria-label={label}
      className='group flex items-center gap-2 font-semibold uppercase'
    >
      <Image
        priority
        src='/logo.svg'
        loading='eager'
        width='40'
        height='40'
        alt=''
      />
      <div className='flex flex-col font-sans leading-tight'>
        <span className='transition-all group-hover:ml-1 group-focus:ml-1'>
          Jokelan{' '}
        </span>
        <span className='transition-all group-hover:ml-2 group-focus:ml-2'>
          Lomamökit
        </span>
      </div>
    </Link>
  );
}
