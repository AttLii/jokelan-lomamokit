'use client';
import type { SubItemsRendererProps } from './MenuLink';
import MenuLink from './MenuLink';

export default function DesktopMenuSubMenu({
  subItems,
}: SubItemsRendererProps) {
  return (
    <div className='pointer-events-none absolute left-1/2 top-full w-full min-w-[7.5rem] -translate-x-1/2 pt-[0.95rem] opacity-0 transition-opacity group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100'>
      <ul className='flex flex-col gap-2 border-2 border-t-0 border-black bg-slate-100 p-4'>
        {subItems.map((subItem, i) => (
          <li key={i}>
            <MenuLink menuItem={subItem} showSubItems={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}
