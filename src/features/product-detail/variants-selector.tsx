import { Product } from '@/lib/shopify/types';
import { filterAvailableOptions } from './utils.product-detail';
import { ProductColorSelector } from './product-color-selector';
import { ProductSizeSelector } from './product-size-selector';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createUrl } from '@/lib/utils';

export function VariantsSelector({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
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

  useEffect(() => {
    const initialAsPath = router.asPath;
    const hasQueryParameters = initialAsPath.includes('?');

    if (!hasQueryParameters) {
      const newSearchParams = new URLSearchParams();

      if (availableColors[0]) {
        newSearchParams.set('color', availableColors[0]);
      }
      if (availableSizes[0]) {
        newSearchParams.set('talla', availableSizes[0]);
      }

      router.replace(createUrl(pathname, newSearchParams), undefined, {
        scroll: false,
      });
    }
  }, [searchParams, pathname, router, availableColors, availableSizes]);

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      {!!availableColors.length && (
        <ProductColorSelector colors={availableColors} />
      )}
      {!!availableSizes.length && (
        <ProductSizeSelector sizes={availableSizes} />
      )}
    </div>
  );
}
