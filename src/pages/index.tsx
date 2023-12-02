import { MainLayout } from '@/components/layouts/main-layout';
import { BannerSlider } from '@/features/home/banner-slider';
import { CollectionsSection } from '@/features/home/collections-section';
import { CustomerBenefitsSection } from '@/features/home/customer-benefits-section';
import { NewArrivalsSection } from '@/features/home/new-arrivals-section';
import { getCollections, getProducts } from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

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

        <div className="py-20">
          <Link href="/">
            <Image
              alt=""
              width={1685}
              height={220}
              src={'/bottom-banner.png'}
            />
          </Link>
        </div>
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
