import { X } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CartButton } from './cart-button';
import { CartEmptyState } from './cart-empty-state';
import { CartFooter } from './cart-footer';
import { CartSheetContent } from './cart-sheet-content';

import { useCart } from '@/contexts/cart-context';

export function CartSheet({ className }: { className?: string }) {
  const { cart } = useCart();

  return (
    <Sheet>
      <CartButton />
      <SheetContent
        withCloseIcon={false}
        className="flex flex-col w-full pr-6 text-white border-none bg-primary sm:max-w-3xl"
      >
        <SheetHeader className="flex flex-row items-center justify-between px-1 space-y-0 font-montserrat-bold">
          <SheetTitle className="text-xl text-white">
            Carrito{' '}
            {cart?.totalQuantity &&
              cart?.totalQuantity > 0 &&
              `(${cart?.totalQuantity})`}
          </SheetTitle>

          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="w-6 h-6" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        <Separator className=" bg-white/20" />

        {cart && cart?.totalQuantity > 0 ? (
          <>
            <CartSheetContent cart={cart} />

            <SheetFooter className="mt-1.5 font-montserrat-semibold flex !flex-col">
              <Separator className="bg-white/20" />
              <CartFooter />
            </SheetFooter>
          </>
        ) : (
          <CartEmptyState />
        )}
      </SheetContent>
    </Sheet>
  );
}
