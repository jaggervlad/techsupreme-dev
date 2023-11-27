import { Collection, Product } from '@/lib/shopify/types';
import { MainLayout } from '../main-layout';
import { CollectionSidebar } from './collection-sidebar';
import { ProductCard } from '@/components/product-card';
import { useRouter } from 'next/router';
import { ScrollToTopButton } from '@/components/scroll-to-top';
import { ProductHeaderFilters } from './product-header-filters';

interface ProductLayoutProps {
  title?: string;
  description?: string;
  products: Product[];
}

export function ProductsLayout({
  title,
  description,
  products,
}: ProductLayoutProps) {
  const router = useRouter();
  const searchQuery = router.query.q;

  const headerTitle = title || 'Productos';
  const resultsText = products.length > 1 ? 'resultados' : 'resultado';

  return (
    <MainLayout seo={{ title: headerTitle, description: description }}>
      <div className="container py-10 flex flex-col space-y-8 lg:space-y-12">
        <header id="products-page-header" className="space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold">{headerTitle}</h2>

          <ProductHeaderFilters />
        </header>

        <div className="flex flex-col lg:flex-row gap-10 w-full">
          {!searchQuery && products.length === 0 && (
            <p>No hay productos disponibles</p>
          )}
          <div className="grid lg:grid-cols-4 gap-5 flex-1 ">
            {searchQuery && (
              <p className="mb-4">
                {products.length === 0
                  ? 'No hay productos que coincidan '
                  : `Enseñando ${products.length} ${resultsText} de `}
                <span className="font-bold">&quot;{searchQuery}&quot;</span>
              </p>
            )}

            {products &&
              products.length > 0 &&
              products.map((p) => <ProductCard product={p} key={p.id} />)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
