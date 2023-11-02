import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

import { CartSheet } from '@/components/cart-sheet';
import { Search } from '@/components/search';
import { footerNavigationData } from '@/lib/constants';
import { Collection } from '@/lib/shopify/types';
import { MapPinIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { MobileNav } from './mobile-nav';

export function Header({ collections }: { collections: Collection[] }) {
  const sliceCollections = collections.slice(0, 8);

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
              className="flex items-center gap-2"
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
          <div className="py-4 h-24 items-center flex gap-5 container">
            <Link href="/" aria-label="TechSupreme Logo">
              <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
                TechSupreme
              </h1>
            </Link>

            <div className="lg:flex hidden w-full">
              <Search />
            </div>

            <div className="ml-auto flex">
              <CartSheet className="hidden lg:inline-flex" />
              <MobileNav collections={sliceCollections} />
            </div>
          </div>

          <div className="lg:hidden block container w-full">
            <Search />
          </div>

          <div className="hidden lg:block bg-primary">
            <div className="py-4 h-16 items-center flex gap-5 container">
              <NavigationMenu>
                <NavigationMenuList className="gap-4">
                  {sliceCollections.map((c) => (
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

export const NavItem = ({ href, title }: { href: string; title: string }) => {
  const pathname = usePathname();

  const active = pathname === href;
  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref aria-label={`Página ${title}`}>
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
