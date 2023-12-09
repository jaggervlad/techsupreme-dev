import { AddToCartButton } from '@/components/add-to-cart-button';
import { Separator } from '@/components/ui/separator';
import { VariantSelector } from './variant-selector';
import { Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';
import { MinusIcon, PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ProductSizeSelector } from './product-size-selector';
import { ProductColorSelector } from './product-color-selector';
import Balancer from 'react-wrap-balancer';

type ProductSummaryProps = {
  product: Product;
};

export function ProductSummary({ product }: ProductSummaryProps) {
  const [quantity, setQuantity] = useState(0);

  const price = +product.priceRange.maxVariantPrice.amount;
  const currencyCode = product.priceRange.maxVariantPrice.currencyCode;
  const collection = product?.collections[0];

  const isDiscount = true;

  const sizes =
    product.options.filter((o) => o.name.toLowerCase() === 'talla')[0]
      ?.values || [];

  return (
    <div className="flex flex-col w-full gap-4 lg:w-1/2">
      <div>
        <div className="mb-2 text-lg font-medium">
          <span className="opacity-80">Categoría:</span>{' '}
          <Link
            className="text-[#4332E2]"
            href={`/search/${collection?.handle}`}
          >
            {collection?.title}
          </Link>
        </div>

        <h2 className="mb-6 text-5xl font-bold">{product.title}</h2>

        <div className="">
          <div className="flex flex-col text-primary/70">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-medium">
                {formatPrice(price, currencyCode)}
              </span>

              {isDiscount && (
                <span className="flex text-base items-center px-1 text-white bg-orange-600 rounded-[3px]">
                  -45%
                </span>
              )}
            </div>
            {isDiscount && (
              <span className="text-xl font-medium line-through opacity-80">
                {formatPrice(price, currencyCode)}
              </span>
            )}
          </div>

          <Separator className="my-6" />

          <div
            className="mb-3 prose line-clamp-4"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
          <div className="flex gap-2">
            {!!sizes.length && <ProductSizeSelector sizes={sizes} />}
            <ProductColorSelector />
          </div>

          <VariantSelector
            options={product.options}
            variants={product.variants}
          />
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex items-center ">
          <button
            onClick={() => {
              setQuantity((prev) => {
                if (prev === 0) return 0;

                return prev - 1;
              });
            }}
            className="h-full px-3 border rounded-l"
          >
            <MinusIcon />
          </button>
          <div className="flex items-center w-16 h-full px-2 text-lg border">
            {quantity}
          </div>
          <button
            onClick={() => {
              setQuantity((prev) => {
                if (prev === 25) return 25;

                return prev + 1;
              });
            }}
            className="h-full px-3 border rounded-r"
          >
            <PlusIcon />
          </button>
        </div>

        <AddToCartButton
          variants={product.variants}
          availableForSale={product.availableForSale}
        />
      </div>
    </div>
  );
}