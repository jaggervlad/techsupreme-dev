import { ProductsLayout } from '@/components/layouts/products-layout';
import { defaultSort, sorting } from '@/lib/constants';
import {
  getCollection,
  getCollectionProducts,
  getCollections,
  getProducts,
} from '@/lib/shopify';
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
  collections,
  title,
  description,
}: ProductCollectionPageProps) {
  return (
    <ProductsLayout
      title={title}
      description={description}
      collections={collections}
      products={products}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const collection = getAsString(ctx?.params?.collection || '');
  const sort = getAsString(ctx?.query?.sort || '');

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  let products: Product[] = [];
  let title = 'Todos los productos';
  let description = 'Todos los productos de nuestro catálogo';

  const collections = await getCollections();

  if (collection !== 'all') {
    products = await getCollectionProducts({ collection, sortKey, reverse });
    const collectionShopify = await getCollection(collection);

    title = collectionShopify?.title || '';
    description = collectionShopify?.description || '';
  } else {
    products = await getProducts({ sortKey, reverse });
  }

  return {
    props: {
      products: products ?? [],
      collections: collections ?? [],
      title,
      description,
    },
  };
};
