import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

import { CartSheet } from '@/components/cart-sheet';
import { Search } from './search';
import { footerNavigationData } from '@/lib/constants';
import { Collection, Menu } from '@/lib/shopify/types';
import { MapPinIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MobileNav } from './mobile-nav';
import { useGetMenu } from '@/hooks/useGetMenu';
import { forwardRef } from 'react';
import { useGetCollections } from '@/hooks/useGetCollections';

export function Header() {
  const { collections } = useGetCollections();
  const sliceCollections = collections.slice(0, 8);
  const { menu } = useGetMenu('main-menu');

  return (
    <>
      <div className="bg-primary/5">
        <div className="flex py-4 h-10 items-center container  gap-5 ">
          <div className="items-center flex gap-4">
            {footerNavigationData.social.map(({ icon: Icon, href, name }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-slate-600"
                aria-label={`Red Social ${name}`}
              >
                <Icon className="h-5 w-5 " />
              </Link>
            ))}
          </div>
          <div className="ml-auto hidden lg:flex items-center gap-4">
            <Link
              href={footerNavigationData.contact[0].href}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-2 text-slate-600"
              aria-label={footerNavigationData.contact[0].name}
            >
              <MapPinIcon className="h-5 w-5 " aria-hidden="true" />
              {footerNavigationData.contact[0].name}
            </Link>
          </div>
        </div>
      </div>

      <header className="bg-slate-50">
        <nav className="">
          <div className="py-4 h-24 items-center flex gap-5 container overflow-hidden">
            <div className="md:hidden">
              <MobileNav collections={sliceCollections} />
            </div>
            <Link
              href="/"
              aria-label="TechSupreme Logo"
              className="flex-shrink-0"
            >
              <h1 className="text-2xl  md:text-5xl font-bold tracking-wide">
                TechSupreme
              </h1>
            </Link>

            <div className="lg:flex hidden lg:w-full">
              <Search />
            </div>

            <div className="ml-auto ">
              <CartSheet className="" />
            </div>
          </div>

          <div className="hidden lg:block bg-primary">
            <div className="py-4 h-16 items-center flex gap-5 container">
              <NavigationMenu>
                <NavigationMenuList className="gap-4">
                  {menu.map((c) => (
                    <NavItem
                      path={c.path}
                      title={c.title}
                      key={c.path}
                      items={c.items}
                    />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export const NavItem = ({ path, title, items }: Menu) => {
  const pathname = usePathname();

  const active = pathname === path;

  if (items && items?.length > 0) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
            {items.map((component) => (
              <ListItem
                key={component.title}
                title={component.title}
                href={component.path}
              />
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <Link href={path} legacyBehavior passHref aria-label={`Página ${title}`}>
        <NavigationMenuLink
          className={cn(
            'text-base hover:underline hover:underline-offset-4 text-white bg-primary font-medium',
            {
              'underline underline-offset-4': active,
            }
          )}
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
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
