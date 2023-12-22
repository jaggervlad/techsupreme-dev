import { ProductCollectionFilter } from './product-collection-filter';
import { ProductTagsFilter } from './product-tags-filter';

export function SidebarFilters() {
  return (
    <aside className=" hidden md:flex md:flex-col md:gap-5 md:w-[20%]">
      <ProductCollectionFilter />
      <ProductTagsFilter />
    </aside>
  );
}
