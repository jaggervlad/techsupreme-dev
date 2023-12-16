import { MainLayout } from '@/components/layouts/main-layout';
import { BannerSlider } from '@/components/banner-slider';
import { CollectionsSection } from '@/features/home/collections-section';
import { CustomerBenefitsSection } from '@/features/home/customer-benefits-section';
import { NewArrivalsSection } from '@/features/home/new-arrivals-section';
import { getCollections, getProducts } from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { BannerBottom } from '@/components/banner-bottom';

interface ProductsPageProps {
  products: Product[];
  collections: Collection[];
}
export default function Home({ products, collections }: ProductsPageProps) {
  return (
    <MainLayout>
      <BannerSlider />
      <main className="container py-8 space-y-12">
        <CollectionsSection collections={collections} />
        <NewArrivalsSection products={products} />
        <BannerBottom />
      </main>
      <CustomerBenefitsSection />
    </MainLayout>
  );
}

export async function getStaticProps() {
  const products = await getProducts({});
  const collections = await getCollections();

  return {
    props: {
      products: products.slice(0, 8) ?? [],
      collections: collections ?? [],
    },
    revalidate: 60 * 5,
  };
}
