import { BannerSlider } from '@/components/banner-slider';
import { CollectionCard } from '@/components/collection-card';
import { MainLayout } from '@/components/layouts/main-layout';
import { ProductCard } from '@/components/product-card';
import { buttonVariants } from '@/components/ui/button';
import { getCollections, getMenu, getPages, getProducts } from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import Link from 'next/link';

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
        <div className="space-y-10">
          <div className="flex justify-between">
            <h2 className="text-4xl font-bold" id="titulo-colecciones">
              Colecciones
            </h2>

            <Link
              href="/search"
              className={buttonVariants({
                size: 'lg',
                className: 'md:inline-flex hidden',
              })}
            >
              Ver mas
            </Link>
          </div>

          <div className="grid lg:grid-cols-4 gap-4">
            {collections.map((c) => (
              <CollectionCard collection={c} key={c.path} />
            ))}
          </div>
        </div>

        {/* New Arrivals List */}

        <div className="space-y-10">
          <div className="flex justify-between">
            <h3 className="text-4xl font-bold" id="titulo-novedades">
              Novedades
            </h3>

            <Link
              href="/search"
              className={buttonVariants({
                size: 'lg',
                className: 'md:inline-flex hidden',
              })}
            >
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
      products: products.slice(0, 8) ?? [],
      collections: collections.slice(0, 8) ?? [],
    },
    revalidate: 60 * 5,
  };
}
