import { MainLayout } from '@/components/layouts/main-layout';
import { BannerSlider } from '@/components/banner-slider';
import { CollectionsSection } from '@/features/home/collections-section';
import { NewArrivalsSection } from '@/features/home/new-arrivals-section';
import { getCollections, getProductTags, getProducts } from '@/lib/shopify';
import { Collection, Product, Tag } from '@/lib/shopify/types';
import { BannerBottom } from '@/components/banner-bottom';
import { TagsSlider } from '@/features/home/tags-slider';

interface ProductsPageProps {
  products: Product[];
  collections: Collection[];
  tags: Tag[];
}
export default function Home({
  products,
  collections,
  tags,
}: ProductsPageProps) {
  return (
    <MainLayout>
      <BannerSlider />
      <main className="container py-8 space-y-12">
        <CollectionsSection collections={collections} />
        <TagsSlider tags={tags} />
        <NewArrivalsSection products={products} />
        <BannerBottom />
      </main>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const tags = await getProductTags();

  const products = await getProducts({
    sortKey: 'CREATED_AT',
    reverse: true,
    first: 8,
  });
  const collections = await getCollections();

  return {
    props: {
      products: products ?? [],
      collections: collections ?? [],
      tags: tags ?? [],
    },
    revalidate: 60 * 5,
  };
}
