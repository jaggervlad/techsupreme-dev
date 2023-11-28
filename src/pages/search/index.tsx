import { ProductsLayout } from '@/components/layouts/products-layout';
import { defaultSort, sorting } from '@/config/products';
import { getProducts } from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import { getAsString } from '@/lib/utils';
import { GetServerSideProps } from 'next';

interface ProductsPageProps {
  products: Product[];
  collections: Collection[];
}

export default function ProductsPage({ products }: ProductsPageProps) {
  return (
    <ProductsLayout
      title="Todos los productos"
      description="Todos los productos de nuestro catálogo"
      products={products}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryValue = (ctx?.query?.q as string) || '';
  const sort = getAsString(ctx?.query?.sort || '');
  const min = getAsString(ctx?.query?.min || '');
  const max = getAsString(ctx?.query?.max || '');

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  let query = '';

  if (queryValue) {
    query += `(title:${queryValue})`;
  }

  if (min && max) {
    query += ` AND (variants.price:>=${min}) AND (variants.price:<=${max})`;
  } else if (min) {
    query += ` AND (variants.price:>=${min})`;
  } else if (max) {
    query += ` AND (variants.price:<=${max})`;
  }

  const products = await getProducts({
    query,
    sortKey,
    reverse,
  });

  return {
    props: {
      products: products ?? [],
    },
  };
};
