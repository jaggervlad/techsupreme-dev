import { ProductsLayout } from '@/components/layouts/products-layout';
import { defaultSort, sorting } from '@/lib/constants';
import { getCollection, getCollectionProducts } from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import { getAsString } from '@/lib/utils';
import { GetServerSideProps } from 'next';

interface ProductCollectionPageProps {
  products: Product[];
  collections: Collection[];
  collection?: Collection;
  title: string;
  description: string;
}

export default function ProductCollectionPage({
  products,
  title,
  description,
}: ProductCollectionPageProps) {
  return (
    <ProductsLayout
      title={title}
      description={description}
      products={products}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const collection = getAsString(ctx?.params?.collection || '');
  const sort = getAsString(ctx?.query?.sort || '');

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const collectionShopify = await getCollection(collection);
  const products = await getCollectionProducts({
    collection,
    sortKey,
    reverse,
  });

  const title = collectionShopify?.title || '';
  const description = collectionShopify?.description || '';

  return {
    props: {
      products: products ?? [],
      title,
      description,
    },
  };
};
