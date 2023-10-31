import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Collection } from '@/lib/shopify/types';
import { Menu } from 'lucide-react';
import { NavItem } from './header';
import Link from 'next/link';
import { CartSheet } from '@/components/cart-sheet';

export function MobileNav({ collections }: { collections: Collection[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="py-12">
        <CartSheet className="mb-12" />

        <div className="flex flex-col">
          <ul className="gap-4  w-full flex flex-col">
            {collections.map((c) => (
              <Link
                key={c.handle}
                href={c.path}
                className="uppercase hover:underline font-medium"
              >
                {c.title}
              </Link>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
