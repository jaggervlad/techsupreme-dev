import { ProductsLayout } from '@/components/layouts/products-layout';
import { defaultSort, sorting } from '@/lib/constants';
import { getCollection } from '@/lib/shopify/services/collections';
import { getCollectionProducts } from '@/lib/shopify/services/products';
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
  const min = Number(getAsString(ctx?.query?.min || ''));
  const max = Number(getAsString(ctx?.query?.max || ''));
  const tag = getAsString(ctx?.query?.tag || '');

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  let filters: { [key: string]: any } = {};

  if (min && max) {
    filters.price = { min, max };
  } else if (min) {
    filters.price = { min };
  } else if (max) {
    filters.price = { max };
  }

  if (tag) {
    filters.tag = tag;
  }

  const collectionShopify = await getCollection(collection);
  const products = await getCollectionProducts({
    collection,
    sortKey,
    reverse,
    filters,
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
