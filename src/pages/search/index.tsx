import { ProductsLayout } from '@/components/layouts/products-layout';
import { getCollections, getProducts } from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import { GetServerSideProps } from 'next';

interface ProductsPageProps {
  products: Product[];
  collections: Collection[];
}

export default function ProductsPage({
  products,
  collections,
}: ProductsPageProps) {
  return <ProductsLayout products={products} collections={collections} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryValue = ctx?.query?.q as string;

  const products = await getProducts({ query: queryValue });
  const collections = await getCollections();

  return {
    props: {
      products: products ?? [],
      collections: collections ?? [],
    },
    revalidate: 60 * 5,
  };
};
