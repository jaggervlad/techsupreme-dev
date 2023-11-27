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
import { useCart } from '@/contexts/cart-context';
import { Badge } from '@/components/ui/badge';
import { Search } from '@/components/layouts/main-layout/search';

export function MobileNav({ collections }: { collections: Collection[] }) {
  const { cart } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'sm'} className="lg:hidden relative">
          {cart && cart?.lines.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute flex border border-primary items-center justify-center w-6 h-6 p-2 rounded-full -right-2 -top-2"
            >
              {cart?.lines.length}
            </Badge>
          )}
          <Menu aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent className="py-12">
        <Search className="mb-4" />

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
