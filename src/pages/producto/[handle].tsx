import { AddToCartButton } from '@/components/add-to-cart-button';
import { MainLayout } from '@/components/layouts/main-layout';
import { ProductCard } from '@/components/product-card';
import { ProductImageGallery } from '@/components/product-image-gallery';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { VariantSelector } from '@/components/variant-selector';
import { multipleSliderOptions } from '@/lib/constants';
import {
  getProduct,
  getProductRecommendations,
  getProducts,
} from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { GetStaticProps } from 'next';
import { useUrl } from '@/hooks/useUrl';
import { ProductJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';

export default function ProductPage({
  collections,
  product,
  relatedProducts,
}: {
  collections: Collection[];
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

  const price = +product.priceRange.maxVariantPrice.amount;
  const currencyCode = product.priceRange.maxVariantPrice.currencyCode;

  const isDiscount = true;

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
          priceCurrency: product.priceRange.minVariantPrice.currencyCode,
          highPrice: product.priceRange.maxVariantPrice.amount,
          lowPrice: product.priceRange.minVariantPrice.amount,
        }}
      />
      <div className="container py-14">
        <div className="flex flex-col items-start gap-8 mb-10 lg:flex-row md:gap-16">
          <div className="w-full lg:sticky lg:top-12 lg:w-1/2">
            <ProductImageGallery
              images={product.images ?? []}
              title={product.title}
            />
          </div>

          <Separator className="mt-4 lg:hidden" />
          <div className="flex flex-col w-full gap-4 lg:w-1/2">
            <div>
              <h2 className="mb-8 text-5xl font-bold">{product.title}</h2>

              <div className="space-y-8">
                <div className="flex flex-col text-primary/70">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-medium">
                      {formatPrice(price, currencyCode)}
                    </span>

                    {isDiscount && (
                      <span className="flex text-base items-center px-1 text-white bg-orange-600 rounded-[3px]">
                        -45%
                      </span>
                    )}
                  </div>
                  {isDiscount && (
                    <span className="text-xl font-medium line-through">
                      {formatPrice(price, currencyCode)}
                    </span>
                  )}
                </div>

                <div
                  className="prose line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
                <div className="">
                  <VariantSelector
                    options={product.options}
                    variants={product.variants}
                  />
                </div>
              </div>
            </div>

            <AddToCartButton
              variants={product.variants}
              availableForSale={product.availableForSale}
            />
          </div>
        </div>
        {relatedProducts && relatedProducts.length > 0 ? (
          <div className="overflow-hidden md:pt-6">
            <h2 className="flex-1 mb-6 text-2xl font-bold line-clamp-1">
              Productos Relacionados
            </h2>
            <Splide options={multipleSliderOptions}>
              {relatedProducts.map((product) => (
                <SplideSlide key={product.id} className="px-2 py-4">
                  <ProductCard product={product} className="min-w-[260px]" />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        ) : null}
      </div>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const handle = (ctx?.params?.handle || '') as string;

  const product = await getProduct(handle);

  let relatedProducts: Product[] | [] = [];

  if (product) {
    relatedProducts = await getProductRecommendations(product.id);
  }

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
