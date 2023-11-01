import { ProductsLayout } from '@/components/layouts/products-layout';
import {
  getCollection,
  getCollectionProducts,
  getCollections,
} from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import { GetStaticProps } from 'next';

interface ProductCollectionPageProps {
  products: Product[];
  collections: Collection[];
  collection?: Collection;
}

export default function ProductCollectionPage({
  products,
  collections,
  collection,
}: ProductCollectionPageProps) {
  const title = collection && collection.title;
  const description = collection && collection.description;

  return (
    <ProductsLayout
      title={title}
      description={description}
      collections={collections}
      products={products}
    />
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const collection = (ctx?.params?.collection || '') as string;
  const products = await getCollectionProducts({ collection });
  const collections = await getCollections();
  const collectionShopify = await getCollection(collection);

  return {
    props: {
      products: products ?? [],
      collections: collections ?? [],
      collection: collectionShopify,
    },
    revalidate: 60 * 5,
  };
};

export const getStaticPaths = async () => {
  const collections = await getCollections();

  const paths = collections
    .map((c) => {
      const collection = c.path.split('/')[2];

      if (collection) {
        return { params: { collection } };
      }

      return null;
    })
    .filter((item) => item !== null);

  return {
    paths: paths,
    fallback: 'blocking',
  };
};
