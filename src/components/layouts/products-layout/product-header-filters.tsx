import { ProductCollectionFilter } from './product-collection-filter';
import { SortByProducts } from './product-sort-filter';
import { ProductsPriceFilter } from './products-price-filter';

export function ProductHeaderFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <span className="text-xl hidden md:block font-medium">Filtrar:</span>
        <ProductCollectionFilter />
        <ProductsPriceFilter />
      </div>

      <div>
        <SortByProducts />
      </div>
    </div>
  );
}
