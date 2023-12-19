import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { VariantsSelector } from './variants-selector';
import { ProductQuantitySelector } from './product-quantity-selector';

type ProductSummaryProps = {
  product: Product;
};

export function ProductSummary({ product }: ProductSummaryProps) {
  const price = +product.priceRange.maxVariantPrice.amount;
  const currencyCode = product.priceRange.maxVariantPrice.currencyCode;
  const collection = product?.collections[0];
  const isDiscount = true;

  return (
    <div className="flex flex-col w-full gap-4 lg:w-1/2">
      <div>
        <div className="mb-3 text-lg font-medium font-montserrat-semibold">
          <span className="opacity-80">Categoría:</span>{' '}
          <Link className="text-cblue" href={`/search/${collection?.handle}`}>
            {collection?.title}
          </Link>
        </div>

        <h2 className="mb-6 text-3xl font-bold font-montserrat-bold md:text-5xl">
          {product.title}
        </h2>

        <div className="flex flex-col text-primary/70">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-medium font-montserrat-semibold">
              {formatPrice(price, currencyCode)}
            </span>

            {isDiscount && (
              <span className="flex text-base font-montserrat-regular items-center px-1 text-white bg-orange-600 rounded-[3px]">
                -45%
              </span>
            )}
          </div>
          {isDiscount && (
            <span className="text-xl font-medium line-through opacity-80 font-montserrat-semibold">
              {formatPrice(price, currencyCode)}
            </span>
          )}
        </div>

        <Separator className="my-6" />

        <div className="space-y-6">
          <div
            className="prose font-montserrat-regular line-clamp-4"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
          <VariantsSelector product={product} />

          <ProductQuantitySelector
            variants={product.variants}
            availableForSale={product.availableForSale}
          />

          <p className="text-sm font-montserrat-regular text-muted-foreground">
            Standard delivery in 5 - 6 days or Premium delivery in 2 - 4 days.
          </p>
        </div>
      </div>
    </div>
  );
}
