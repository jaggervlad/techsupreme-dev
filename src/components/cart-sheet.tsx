import Image from 'next/image';

import { cn, formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Link from 'next/link';
import { ImageIcon, ShoppingCart } from 'lucide-react';
import { Cart } from '@/lib/shopify/types';
import { UpdateCart } from './cart-update';
import { useCart } from '@/contexts/cart-context';
import Price from './price';

export function CartSheet({ className }: { className?: string }) {
  const { cart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Cart"
          size={'sm'}
          className={cn('relative lg:h-12', className)}
        >
          {cart && cart?.lines.length > 0 && (
            <Badge
              variant="secondary"
              className="absolute flex border border-primary items-center justify-center w-6 h-6 p-2 rounded-full -right-2 -top-2"
            >
              {cart?.lines.length}
            </Badge>
          )}
          <ShoppingCart aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>
            Carrito{' '}
            {cart?.totalQuantity &&
              cart?.totalQuantity > 0 &&
              `(${cart?.totalQuantity})`}
          </SheetTitle>
        </SheetHeader>
        <Separator />
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
          <div className="flex flex-col gap-5 pr-6">
            {cart.lines.map((item) => {
              return (
                <div key={item.id} className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="relative max-h-44 aspect-[3/6] h-full w-full overflow-hidden rounded">
                      {item?.merchandise.product.featuredImage ? (
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
                          className="absolute w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-secondary">
                          <ImageIcon
                            className="w-4 h-4 text-muted-foreground"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    <div className="space-y-4 flex-col flex">
                      <div className="flex flex-col self-start flex-1 gap-1 text-sm">
                        <span className="">
                          {item.merchandise.product.title}
                          {' - '}
                          {item.merchandise.title}
                        </span>
                        <span className="line-clamp-1 text-muted-foreground">
                          {formatPrice(
                            parseFloat(
                              item.merchandise.product.priceRange
                                .maxVariantPrice.amount
                            ) ?? 0
                          )}{' '}
                          x {item.quantity} ={' '}
                          {formatPrice(
                            parseFloat(item.cost.totalAmount.amount)
                          )}
                        </span>
                      </div>
                      <UpdateCart cartLineItem={item} />
                    </div>
                  </div>
                  <Separator />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
      <div className="grid pr-6 text-sm">
        <SheetFooter className="mt-1.5 flex !flex-col">
          <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
              <p>Impuestos</p>
              <Price
                className="text-right text-base text-black dark:text-white"
                amount={cart.cost.totalTaxAmount.amount}
                currencyCode={cart.cost.totalTaxAmount.currencyCode}
              />
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
              <p>Envío</p>
              <p className="text-right">Calculado al momento de pagar</p>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
              <p>Total</p>
              <Price
                className="text-right text-base text-black dark:text-white"
                amount={cart.cost.totalAmount.amount}
                currencyCode={cart.cost.totalAmount.currencyCode}
              />
            </div>
          </div>
          <Link
            aria-label="Registrar Pedido"
            href={cart?.checkoutUrl}
            className={buttonVariants({
              size: 'lg',
            })}
          >
            Registrar Pedido
          </Link>
        </SheetFooter>
      </div>
    </>
  );
};
