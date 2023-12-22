import { SortByProducts } from './product-sort-filter';
import { ProductsPriceFilter } from './products-price-filter';

export function ProductsGridFilters() {
  return (
    <header className="flex gap-4 mb-8">
      <SortByProducts />
      <ProductsPriceFilter />
    </header>
  );
}
