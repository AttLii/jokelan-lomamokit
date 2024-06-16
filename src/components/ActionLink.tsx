import type { PropsWithChildren } from 'react';
import { Calendar, CalendarOff } from './icons/lucide';

type Props = PropsWithChildren & {
  href: string;
};
export default function ActionLink({ href, children }: Props) {
  return (
    <a
      className='inline-flex scale-100 flex-nowrap items-center gap-2 rounded-md border-2 border-black bg-red-400 px-4 py-2 font-sans uppercase transition-all hover:scale-105 hover:bg-red-500 focus:scale-105 focus:bg-red-500 empty-href:pointer-events-none empty-href:bg-slate-300'
      rel='noopener noreferrer nofollow'
      target='blank'
      href={href}
    >
      {href === '' ? <CalendarOff /> : <Calendar />}
      {children}
    </a>
  );
}
