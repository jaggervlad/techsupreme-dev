import { Collection, Product } from '@/lib/shopify/types';
import { MainLayout } from '../main-layout';
import { CollectionSidebar } from './collection-sidebar';
import { ProductCard } from '@/components/product-card';
import { useRouter } from 'next/router';
import { ScrollToTopButton } from '@/components/scroll-to-top';

interface ProductLayoutProps {
  title?: string;
  collections: Collection[];
  products: Product[];
}

export function ProductsLayout({
  title,
  collections,
  products,
}: ProductLayoutProps) {
  const router = useRouter();
  const searchQuery = router.query.q;

  const resultsText = products.length > 1 ? 'resultados' : 'resultado';

  return (
    <MainLayout collections={collections} seo={{ title: 'Productos' }}>
      <div className="container py-10 flex flex-col space-y-12">
        <header id="products-page-header">
          <h2 className="text-4xl font-bold">{title || 'Productos'}</h2>
        </header>

        <div className="flex flex-col lg:flex-row gap-10 w-full">
          <CollectionSidebar collections={collections} />

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
