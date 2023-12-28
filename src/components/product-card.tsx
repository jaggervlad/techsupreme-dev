import { HeartIcon, ImageIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Product } from '@/lib/shopify/types';

import { useWishListState } from '@/contexts/wishlist-context';
import { ROUTES } from '@/lib/routes';
import { cn, createUrl, formatPrice } from '@/lib/utils';
import { validateItsNewProduct } from '@/lib/validate-its-new-product';
import { useEffect, useState } from 'react';

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  variant?: 'default' | 'switchable';
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function ProductCard({
  product,
  variant = 'default',
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: ProductCardProps) {
  const { addItem, isSaved } = useWishListState();
  const [isProductSaved, setIsProductSaved] = useState(false);

  useEffect(() => {
    setIsProductSaved(isSaved(product.id));
  }, [product.id, isSaved]);

  const currencyCode = product.priceRange.maxVariantPrice.currencyCode;

  const sizes =
    product.options.filter((o) => o.name.toLowerCase() === 'talla')[0]
      ?.values || [];
  const colors =
    product.options.filter((o) => o.name.toLowerCase() === 'color')[0]
      ?.values || [];

  const isNew = validateItsNewProduct(product.createdAt);
  const isDiscount = false;

  const price = +product.priceRange.maxVariantPrice.amount;

  const searchParams = new URLSearchParams();
  searchParams.set('color', colors[0]);
  searchParams.set('talla', sizes[0]);

  const route = createUrl(ROUTES.productBySlug(product.handle), searchParams);

  return (
    <Card
      className={cn(
        'flex shadow-[10px_10px_5px_0px_#00000012] font-montserrat-regular border-gray-light flex-col rounded-[5px] bg-white overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="relative py-4">
        <Link
          href={route}
          className="relative block w-full max-h-80 h-full aspect-[9/16]"
        >
          {product?.featuredImage ? (
            <Image
              src={
                product.featuredImage.url ?? '/images/product-placeholder.webp'
              }
              alt={product.featuredImage.altText || product.title}
              quality={100}
              fill
              priority
              sizes="(min-width: 480px ) 50vw,
                     (min-width: 728px) 33vw,
                     (min-width: 976px) 25vw,
                     100vw"
            />
          ) : (
            <div
              aria-label="Placeholder"
              role="img"
              aria-roledescription="placeholder"
              className="flex items-center justify-center w-full h-full bg-secondary"
            >
              <ImageIcon
                className="h-9 w-9 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          )}
        </Link>

        {isNew && (
          <span className="absolute text-sm left-5 bg-primary rounded-[8px] text-white px-2 py-1 top-3">
            NUEVO
          </span>
        )}
        {/* <div className="absolute flex flex-col justify-center gap-1 top-4 right-3">
          {colors.map((c) => (
            <div
              key={c}
              className="flex cursor-pointer items-center justify-center w-6 h-6 p-[2px] border rounded-full"
            >
              <div className="w-full h-full bg-blue-600 rounded-full" />
            </div>
          ))}
        </div> */}
      </div>

      <CardContent className="border-t border-border/40 grid gap-2.5 p-4">
        <CardTitle className="text-lg truncate font-montserrat-semibold">
          {product.title}
        </CardTitle>
        {/* <div className="flex gap-2">
          {sizes.map((s) => (
            <div className="truncate" key={s}>
              {s}
            </div>
          ))}
        </div> */}
        <span className="sr-only">Ver detalles de {product.title}</span>
      </CardContent>

      <CardFooter className="flex justify-between px-4">
        <div className="flex flex-col text-primary/70">
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium">
              {formatPrice(price, currencyCode)}
            </span>

            {isDiscount && (
              <span className="flex text-base items-center px-1 text-white bg-orange-600 rounded-[3px]">
                -45%
              </span>
            )}
          </div>
          {isDiscount && (
            <span className="text-base font-medium line-through">
              {formatPrice(price, currencyCode)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant={'circle'}
            className="hover:bg-lemon-green"
            onClick={() => addItem(product)}
          >
            <HeartIcon
              className={`w-5 h-5 ${
                isProductSaved && 'fill-black stroke-black'
              }`}
            />
          </Button>

          {/* TODO: add to cart button feature */}
          <Link
            href={route}
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'circle',
              }),
              'hover:bg-lemon-green'
            )}
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
