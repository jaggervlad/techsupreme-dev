import { MainLayout } from '@/components/layouts/main-layout';
import { Separator } from '@/components/ui/separator';
import { ProductImageGallery } from '@/features/product-detail/product-image-gallery';
import { ProductSummary } from '@/features/product-detail/product-summary';
import { RelatedProductsSlider } from '@/features/product-detail/related-products-slider';
import { useUrl } from '@/hooks/useUrl';
import {
  getProduct,
  getProductRecommendations,
  getProducts,
} from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import { GetStaticProps } from 'next';
import { ProductJsonLd } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductPage({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { href: currentUrl } = useUrl() ?? {};
  const { url, width, height, altText: alt } = product.featuredImage || {};

  const seoData = {
    title: product.title,
    description: product.description,
    openGraph: {
      url: currentUrl,
      title: product.title,
      description: product.description,
      images: url ? [{ url, width, height, alt }] : undefined,
    },
  };

  const priceCurrency = product.priceRange.minVariantPrice.currencyCode;
  const highPrice = product.priceRange.maxVariantPrice.amount;
  const lowPrice = product.priceRange.minVariantPrice.amount;

  return (
    <MainLayout seo={seoData}>
      <ProductJsonLd
        productName={product.title}
        description={product.description}
        image={product.featuredImage.url}
        offers={{
          availability: product.availableForSale
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          priceCurrency,
          highPrice,
          lowPrice,
        }}
      />
      <main className="container py-14">
        <div className="flex flex-col items-start gap-8 mb-10 lg:flex-row md:gap-16">
          <div className="w-full h-full lg:sticky lg:top-12 lg:w-1/2">
            <ProductImageGallery
              images={product.images ?? []}
              title={product.title}
            />
          </div>

          <Separator className="mt-4 lg:hidden" />

          <ProductSummary product={product} />
        </div>
        {relatedProducts && relatedProducts.length > 0 && (
          <RelatedProductsSlider products={relatedProducts} />
        )}

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
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const handle = (ctx?.params?.handle || '') as string;

  const product = await getProduct(handle);

  if (!product)
    return {
      props: {
        notFound: true,
      },
    };

  const relatedProducts = await getProductRecommendations(product.id);

  return {
    props: {
      product,
      relatedProducts,
    },
    revalidate: 60 * 5,
  };
};

export const getStaticPaths = async () => {
  const products = await getProducts({});

  const paths = products
    .map((c) => {
      return { params: { handle: c.handle } };
    })
    .filter((item) => item !== null);

  return {
    paths: paths,
    fallback: 'blocking',
  };
};
