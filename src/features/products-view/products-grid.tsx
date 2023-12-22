import { ProductCard } from '@/components/product-card';
import { ProductsPagination } from './products-pagination';

import { useRouter } from 'next/router';
import { useState } from 'react';

import { type Product } from '@/lib/shopify/types';

export function ProductsGrid({ products }: { products: Product[] }) {
  const router = useRouter();
  const searchQuery = router.query.q;

  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 9;
  const pagesVisited = pageNumber * productsPerPage;

  const displayProducts = products.slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  };

  const resultsText = displayProducts.length > 1 ? 'resultados' : 'resultado';

  return (
    <>
      {searchQuery && (
        <p className="mb-4 font-montserrat-regular">
          {displayProducts.length === 0
            ? 'No hay productos que coincidan '
            : `Enseñando ${displayProducts.length} ${resultsText} de `}
          <span className="font-bold font-montserrat-bold">
            &quot;{searchQuery}&quot;
          </span>
        </p>
      )}

      {displayProducts.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}

          <ProductsPagination pageCount={pageCount} changePage={changePage} />
        </div>
      )}
    </>
  );
}
