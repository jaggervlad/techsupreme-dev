import { Button } from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from '@/lib/shopify/types';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { Badge } from '@/components/ui/badge';
import { Search } from '@/components/layouts/main-layout/search';

export function MobileNav({ menu }: { menu: Menu[] }) {
  const { cart } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'sm'} className="relative lg:hidden">
          {cart && cart?.lines.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute flex items-center justify-center w-6 h-6 p-2 border rounded-full border-primary -right-2 -top-2"
            >
              {cart?.lines.length}
            </Badge>
          )}
          <MenuIcon aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent className="py-12">
        <Search className="mb-4" />

        <div className="flex flex-col">
          <ul className="flex flex-col w-full gap-4">
            {menu.map((c, i) => (
              <Link
                key={i}
                href={c.path}
                className="font-medium uppercase hover:underline"
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
