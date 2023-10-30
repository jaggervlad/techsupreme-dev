import { BannerSlider } from '@/components/banner-slider';
import { CollectionCard } from '@/components/collection-card';
import { MainLayout } from '@/components/layouts/main-layout';
import { ProductCard } from '@/components/product-card';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getCollection,
  getCollections,
  getPages,
  getProducts,
} from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProductsPageProps {
  products: Product[];
  collections: Collection[];
}
export default function Home({ products, collections }: ProductsPageProps) {
  return (
    <MainLayout collections={collections}>
      <main className="container space-y-12 py-8">
        <BannerSlider />

        {/* Category Cards */}
        <div className="grid lg:grid-cols-4 gap-4">
          {collections.map((c) => (
            <CollectionCard collection={c} key={c.path} />
          ))}
        </div>

        {/* New Arrivals List */}

        <div className="space-y-5">
          <div className="flex justify-between">
            <h4 className="text-2xl font-bold">Novedades</h4>

            <Link href="/search" className={buttonVariants()}>
              Ver mas
            </Link>
          </div>

          <div className="grid lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export async function getStaticProps() {
  const products = await getProducts({});
  const collections = await getCollections();

  return {
    props: {
      products: products ?? [],
      collections: collections ?? [],
    },
  };
}
