'use client';
import type { SubItemsRendererProps } from './MenuLink';
import MenuLink from './MenuLink';

export default function MobileMenuSubMenu({ subItems }: SubItemsRendererProps) {
  return (
    <div className='mb-4 hidden w-full pl-4 group-focus-within:block group-hover:block'>
      <ul className='flex flex-col gap-1'>
        {subItems.map((subItem, i) => (
          <li key={i}>
            <MenuLink menuItem={subItem} showSubItems={false} />
          </li>
        ))}
      </ul>
    </div>
  );
}
