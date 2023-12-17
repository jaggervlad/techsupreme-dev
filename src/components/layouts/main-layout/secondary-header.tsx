import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Menu } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';

import { TruckIcon } from 'lucide-react';
import { CategoriesSelector } from './categories-selector';

const secondaryMenu = [
  { id: 1, name: 'Productos', path: '/search' },
  { id: 2, name: 'Más vendidos', path: '/search/trending' },
  { id: 3, name: 'Ofertas', path: '/search/offers' },
  { id: 4, name: 'Novedades', path: '/search/novedades' },
];

export function SecondaryHeader({ menu }: { menu: Menu[] }) {
  return (
    <div className="hidden border-t-2 lg:block bg-primary/5">
      <div className="container flex items-center justify-between h-12 gap-5">
        <CategoriesSelector />

        <NavigationMenu className="flex-grow">
          <NavigationMenuList className="gap-4">
            {secondaryMenu.map((c) => (
              <NavItem path={c.path} title={c.name} key={c.path} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div>
          <Link
            href="/estado-pedido"
            className="flex items-center font-montserrat-regular"
          >
            <TruckIcon className="mr-2" />
            Estado del pedido
          </Link>
        </div>
      </div>
    </div>
  );
}

export const NavItem = ({ path, title, items }: Menu) => {
  const pathname = usePathname();

  const active = pathname === path;

  return (
    <NavigationMenuItem>
      <Link href={path} legacyBehavior passHref aria-label={`Página ${title}`}>
        <NavigationMenuLink
          className={cn('text-base font-montserrat-regular text-primary ', {
            'font-bold font-montserrat-bold': active,
          })}
        >
          {title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};

const ListItem = forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
