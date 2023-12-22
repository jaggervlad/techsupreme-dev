import { BannerBottom } from '@/components/banner-bottom';
import { BannerSlider } from '@/components/banner-slider';
import { MainLayout } from '@/components/layouts/main-layout';
import { ProductsGrid } from './products-grid';

import { type Product } from '@/lib/shopify/types';
import { ProductsGridFilters } from './products-grid-filters';
import { SidebarFilters } from './sidebar-filters';

interface ProductLayoutProps {
  title?: string;
  description?: string;
  products: Product[];
}

export function ProductsView({
  title,
  description,
  products,
}: ProductLayoutProps) {
  const headerTitle = title || 'Productos';

  return (
    <MainLayout seo={{ title: headerTitle, description: description }}>
      <BannerSlider />

      <div className="container pb-10 space-y-8 lg:space-y-12">
        <h2 className="text-3xl font-bold sr-only lg:text-4xl">
          {headerTitle}
        </h2>

        <div className="flex gap-5">
          <SidebarFilters />

          <div className="w-full md:w-[80%] font-montserrat-regular flex flex-col">
            <ProductsGridFilters />
            <ProductsGrid products={products} />
          </div>
        </div>

        <BannerBottom />
      </div>
    </MainLayout>
  );
}
