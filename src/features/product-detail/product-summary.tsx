import Link from 'next/link';

import { Separator } from '@/components/ui/separator';
import { Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';
import { VariantsSelector } from './variants-selector';
import { ProductQuantitySelector } from './product-quantity-selector';
import { findMatchingVariant } from './utils.product-detail';
import { useSearchParams } from 'next/navigation';

type ProductSummaryProps = {
  product: Product;
};

export function ProductSummary({ product }: ProductSummaryProps) {
  const currencyCode = product.priceRange.maxVariantPrice.currencyCode;
  const collection = product?.collections[0];
  const queryParams = useSearchParams();

  const matchingVariant = findMatchingVariant(product, queryParams);

  const currentPrice = matchingVariant ? +matchingVariant.price.amount : 0;
  const compareAtPrice = matchingVariant
    ? +matchingVariant?.compareAtPrice?.amount || 0
    : 0;

  const calculateDiscountPercentage = () => {
    if (compareAtPrice) {
      const discount = ((compareAtPrice - currentPrice) / compareAtPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const isDiscounted = compareAtPrice !== null && currentPrice < compareAtPrice;

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
              {formatPrice(currentPrice, currencyCode)}
            </span>

            {isDiscounted && (
              <span className="flex text-base font-montserrat-regular items-center px-1 text-white bg-orange-600 rounded-[3px]">
                -{calculateDiscountPercentage()}%
              </span>
            )}
          </div>
          {isDiscounted && (
            <span className="text-xl font-medium line-through opacity-80 font-montserrat-semibold">
              {formatPrice(compareAtPrice, currencyCode)}
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
