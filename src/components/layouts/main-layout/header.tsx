import React from 'react';

import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { CartSheet } from '@/components/cart-sheet';
import { Search } from '@/components/search';
import { Collection } from '@/lib/shopify/types';
import { usePathname } from 'next/navigation';
import { footerNavigationData } from '@/lib/constants';
import { MapPinIcon } from 'lucide-react';

export function Header({ collections }: { collections: Collection[] }) {
  const ContactIcon = footerNavigationData.contact[0].icon;

  return (
    <>
      <div className="bg-primary/5">
        <div className="hidden md:flex py-4 h-10 items-center container  gap-5 ">
          <div className="items-center flex gap-4">
            {footerNavigationData.social.map(({ icon: Icon, href }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <Icon className="h-5 w-5 " />
              </Link>
            ))}
          </div>
          <div className="ml-auto items-center flex gap-4">
            <Link
              key={footerNavigationData.contact[0].href}
              href={footerNavigationData.contact[0].href}
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center gap-2"
            >
              <MapPinIcon className="h-5 w-5 " />
              {footerNavigationData.contact[0].name}
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky bg-slate-50 top-0 z-20">
        <nav className="">
          <div className="py-4 h-24 items-center flex gap-5 container">
            <Link href="/">
              <h1 className="text-5xl font-bold">Logo</h1>
            </Link>

            <div className="flex w-full">
              <Search />
            </div>

            <div className="ml-auto flex gap-4">
              <CartSheet />
            </div>
          </div>

          <div className="bg-primary">
            <div className="py-4 h-16 items-center flex gap-5 container">
              <NavigationMenu>
                <NavigationMenuList className="gap-4">
                  {collections.map((c) => (
                    <NavItem href={c.path} title={c.title} key={c.handle} />
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

const NavItem = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname();

  const active = pathname === href;
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
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

const ListItem = React.forwardRef<
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
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
