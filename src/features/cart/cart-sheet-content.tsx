import Image from 'next/image';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';

import { Cart, CartItem } from '@/lib/shopify/types';
import { UpdateCart } from './cart-update';

export const CartSheetContent = ({ cart }: { cart: Cart }) => {
  return (
    <div className="flex flex-col flex-1 gap-5 overflow-hidden">
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-5">
          {cart.lines.map((item) => (
            <CartItemLine key={item.id} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const CartItemLine = ({ item }: { item: CartItem }) => {
  return (
    <div key={item.id} className="space-y-3">
      <div className="flex flex-col justify-between gap-4 md:gap-10 md:items-center md:flex-row">
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

          <div className="flex flex-col  justify-center flex-1 gap-1 text-sm font-montserrat-regular">
            <div className="text-base font-montserrat-semibold lg:text-xl ">
              {item.merchandise.product.title}
            </div>
            <div className="text-sm lg:text-lg text-[#C7C7C7]">
              {formatPrice(
                parseFloat(
                  item.merchandise.product.priceRange.maxVariantPrice.amount
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
};
