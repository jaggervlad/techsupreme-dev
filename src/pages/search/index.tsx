import { ProductsLayout } from '@/components/layouts/products-layout';
import { getProducts } from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
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
  const queryValue = ctx?.query?.q as string;

  const products = await getProducts({ query: queryValue });

  return {
    props: {
      products: products ?? [],
    },
  };
};
