import { Product } from '@/lib/shopify/types';
import { filterAvailableOptions } from './utils.product-detail';
import { ProductColorSelector } from './product-color-selector';
import { ProductSizeSelector } from './product-size-selector';
import { useSearchParams } from 'next/navigation';

export function VariantsSelector({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const optionSearchParams = new URLSearchParams(searchParams.toString());

  const availableSizes = filterAvailableOptions(
    product,
    'talla',
    optionSearchParams
  );
  const availableColors = filterAvailableOptions(
    product,
    'color',
    optionSearchParams
  );

  return (
    <div className="flex gap-5">
      {!!availableColors.length && (
        <ProductColorSelector colors={availableColors} />
      )}
      {!!availableSizes.length && (
        <ProductSizeSelector sizes={availableSizes} />
      )}
    </div>
  );
}
