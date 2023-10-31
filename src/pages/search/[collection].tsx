import { ProductsLayout } from '@/components/layouts/products-layout';
import { getCollectionProducts, getCollections } from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import { GetStaticProps } from 'next';

interface ProductCollectionPageProps {
  products: Product[];
  collections: Collection[];
}

export default function ProductCollectionPage({
  products,
  collections,
}: ProductCollectionPageProps) {
  return <ProductsLayout collections={collections} products={products} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const collection = (ctx?.params?.collection || '') as string;
  const products = await getCollectionProducts({ collection });
  const collections = await getCollections();

  return {
    props: {
      products: products ?? [],
      collections: collections ?? [],
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
