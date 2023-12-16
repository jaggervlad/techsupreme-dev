import { Product } from '@/lib/shopify/types';
import { MainLayout } from '../main-layout';
import { ProductCard } from '@/components/product-card';
import { useRouter } from 'next/router';
import { ProductHeaderFilters } from './product-header-filters';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = products.slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );

  const headerTitle = title || 'Productos';
  const resultsText = products.length > 1 ? 'resultados' : 'resultado';

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  return (
    <MainLayout seo={{ title: headerTitle, description: description }}>
      <div className="container flex flex-col py-10 space-y-8 lg:space-y-12">
        <header id="products-page-header" className="space-y-8">
          <h2 className="text-3xl font-bold lg:text-4xl">{headerTitle}</h2>

          <ProductHeaderFilters />
        </header>

        <div className="flex flex-col w-full gap-10">
          {!searchQuery && displayProducts.length === 0 && (
            <p>No hay productos disponibles</p>
          )}

          {searchQuery && (
            <p className="mb-4">
              {displayProducts.length === 0
                ? 'No hay productos que coincidan '
                : `Enseñando ${displayProducts.length} ${resultsText} de `}
              <span className="font-bold">&quot;{searchQuery}&quot;</span>
            </p>
          )}

          <div className="flex gap-5">
            <div className=" hidden md:block md:w-[20%]">Sidebar</div>

            <div className="w-full md:w-[80%] flex flex-col gap-10">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {displayProducts &&
                  displayProducts.length > 0 &&
                  displayProducts.map((p) => (
                    <ProductCard product={p} key={p.id} />
                  ))}
              </div>

              <ReactPaginate
                previousLabel={<ChevronLeft />}
                nextLabel={<ChevronRight />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'paginationBttns'}
                previousLinkClassName={'previousBttn'}
                nextLinkClassName={'nextBttn'}
                disabledClassName={'paginationDisabled'}
                activeClassName={'paginationActive'}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
