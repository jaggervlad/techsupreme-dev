import { MainLayout } from '@/components/layouts/main-layout';
import { ProductBreadcrumbs } from '@/features/product-detail/product-breadcrumbs';
import { ProductImageGalleryNew } from '@/features/product-detail/product-image-gallery_new';
import { ProductSummary } from '@/features/product-detail/product-summary';
import { RelatedProductsSlider } from '@/features/product-detail/related-products-slider';
import { useUrl } from '@/hooks/useUrl';
import {
  getProduct,
  getProductRecommendations,
  getProducts,
} from '@/lib/shopify/services/products';
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
  const collection = product?.collections[0];

  const pages = [
    { name: collection?.title, href: `/search/${collection?.handle}` },
    { name: product.title, href: `/producto/${product.handle}` },
  ];

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
      <div className="container hidden pt-10 md:block">
        <ProductBreadcrumbs pages={pages} />
      </div>
      <main className="container pt-10 pb-14">
        <div className="flex flex-col items-center gap-8 mb-10 lg:flex-row md:gap-16">
          <div className="w-full h-full lg:w-1/2">
            <ProductImageGalleryNew
              images={product.images}
              title={product.title}
            />
          </div>

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
              className="h-28 md:h-auto"
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
