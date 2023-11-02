import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Product } from '@/lib/shopify/types';
import { cn, formatPrice } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

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
  return (
    <Card
      className={cn(
        'flex flex-col hover:scale-105 transition-all overflow-hidden shadow-lg',
        className
      )}
      {...props}
    >
      <Link
        aria-label={`Ver detalles ${product.title}`}
        href={`/producto/${product.handle}`}
      >
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={4 / 4}>
            {product?.featuredImage ? (
              <Image
                src={
                  product.featuredImage.url ??
                  '/images/product-placeholder.webp'
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
          </AspectRatio>
        </CardHeader>
      </Link>
      <Link href={`/producto/${product.handle}`}>
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="text-xl truncate">{product.title}</CardTitle>
          <CardDescription>
            <span className="text-lg">
              {formatPrice(
                +product.priceRange.maxVariantPrice.amount,
                product.priceRange.maxVariantPrice.currencyCode
              )}{' '}
              {product.priceRange.maxVariantPrice.currencyCode}
            </span>
          </CardDescription>
          <span className="sr-only">Ver detalles de {product.title}</span>
        </CardContent>
      </Link>
    </Card>
  );
}
