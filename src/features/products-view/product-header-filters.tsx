import Link from 'next/link';
import { XCircleIcon } from 'lucide-react';

import { ProductCollectionFilter } from './product-collection-filter';
import { ProductsPriceFilter } from './products-price-filter';

import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function ProductHeaderFilters() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <span className="hidden text-xl font-medium md:block">Filtrar:</span>
        <ProductCollectionFilter />
        <ProductsPriceFilter />
        <Link
          href={{ pathname }}
          className={buttonVariants({ variant: 'outline' })}
        >
          <XCircleIcon className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Link>
      </div>
    </div>
  );
}
