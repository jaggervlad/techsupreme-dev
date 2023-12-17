import Image from 'next/image';

import { cn, formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Link from 'next/link';
import { ImageIcon, ShoppingCart, X } from 'lucide-react';
import { Cart } from '@/lib/shopify/types';
import { UpdateCart } from './cart-update';
import { useCart } from '@/contexts/cart-context';
import { Price } from '@/components/price';

export function CartSheet({ className }: { className?: string }) {
  const { cart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="circle"
          size="icon"
          aria-label="Cart"
          className={cn('relative', className)}
        >
          {cart && cart?.lines.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute flex items-center justify-center w-6 h-6 p-2 rounded-full bg-neo-green border-border -top-3 -right-2 hover:bg-neo-green"
            >
              {cart?.lines.length}
            </Badge>
          )}
          <ShoppingCart aria-hidden="true" className="w-5 h-5" />
        </Button>
      </SheetTrigger>
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
          <CartSheetContent cart={cart} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-2">
            <ShoppingCart
              className="w-12 h-12 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="text-lg font-medium text-muted-foreground">
              Tu carrito esta vacío
            </span>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

const CartSheetContent = ({ cart }: { cart: Cart }) => {
  return (
    <>
      <div className="flex flex-col flex-1 gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-5">
            {cart.lines.map((item) => {
              return (
                <div key={item.id} className="space-y-3">
                  <div className="flex flex-col justify-between gap-4 md:gap-0 md:items-center md:flex-row">
                    <div className="flex items-center gap-6">
                      <div className="relative bg-white max-h-28 w-28 aspect-[3/6] overflow-hidden rounded-lg">
                        {item?.merchandise.product.featuredImage && (
                          <Image
                            src={
                              item?.merchandise.product.featuredImage.url ??
                              '/images/product-placeholder.webp'
                            }
                            alt={
                              item?.merchandise.product.featuredImage.altText ??
                              'Product Name'
                            }
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill
                            className="absolute object-contain w-full h-full"
                            loading="lazy"
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-center flex-1 gap-1 text-sm font-montserrat-regular">
                        <div className="max-w-xs text-base font-montserrat-semibold lg:truncate lg:text-xl lg:whitespace-nowrap">
                          {item.merchandise.product.title}
                        </div>
                        <div className="text-sm lg:text-lg text-[#C7C7C7]">
                          {formatPrice(
                            parseFloat(
                              item.merchandise.product.priceRange
                                .maxVariantPrice.amount
                            ) ?? 0
                          )}
                        </div>
                        <div className="text-sm lg:text-lg text-[#C7C7C7]">
                          {item.merchandise.product.tags[0]}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <UpdateCart cartLineItem={item} />
                    </div>
                  </div>
                  <Separator className="bg-white/20" />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div className="grid pr-6 text-sm">
        <Separator className="bg-white/20" />
        <SheetFooter className="mt-1.5 font-montserrat-semibold flex !flex-col">
          <div className="py-4 text-base text-white md:text-lg">
            <div className="flex items-center justify-between pb-1 mb-3">
              <p className="text-[#D8D8D8]">Impuestos:</p>
              <Price
                className="text-right"
                amount={cart.cost.totalTaxAmount.amount}
                currencyCode={cart.cost.totalTaxAmount.currencyCode}
              />
            </div>
            <div className="flex items-center justify-between pt-1 pb-1 mb-3">
              <p className="text-[#D8D8D8]">Envío:</p>
              <p className="text-right">
                <Price
                  className="text-right"
                  amount={'0'}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </p>
            </div>
            <div className="flex items-center justify-between pt-1 pb-1 mb-3">
              <p className="text-[#D8D8D8]">Total:</p>
              <Price
                className="text-right"
                amount={cart.cost.totalAmount.amount}
                currencyCode={cart.cost.totalAmount.currencyCode}
              />
            </div>
          </div>
          <Link
            aria-label="Registrar Pedido"
            href={cart?.checkoutUrl}
            className={cn(
              buttonVariants({
                size: 'lg',
              }),
              'bg-neo-green text-black hover:bg-neo-green hover:text-black'
            )}
          >
            Registrar Pedido
          </Link>
        </SheetFooter>
      </div>
    </>
  );
};
