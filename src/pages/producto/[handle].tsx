import { MainLayout } from '@/components/layouts/main-layout';
import { ProductImageGallery } from '@/components/product-image-gallery';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { VariantSelector } from '@/components/variant-selector';
import {
  getCollections,
  getProduct,
  getProductRecommendations,
  getProducts,
  removeEdgesAndNodes,
} from '@/lib/shopify';
import { Collection, Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { GetStaticProps } from 'next';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { ProductCard } from '@/components/product-card';
import { multipleSliderOptions } from '@/lib/constants';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useRouter } from 'next/router';
import { useUrl } from '@/hooks/useUrl';
import { ProductJsonLd } from 'next-seo';

export default function ProductPage({
  collections,
  product,
  relatedProducts,
}: {
  collections: Collection[];
  product: Product;
  relatedProducts: Product[];
}) {
  const router = useRouter();
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

  return (
    <MainLayout collections={collections} seo={seoData}>
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
        {/* <div className="flex items-center space-x-1 text-sm capitalize text-muted-foreground">
          <Link href="/productos" className="truncate">
            Productos
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </div> */}
        <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16 mb-10">
          <Button
            variant={'outline'}
            className="mb-4 lg:hidden"
            onClick={() => {
              router.back();
            }}
          >
            <ChevronLeft className="mr-2" /> Regresar
          </Button>

          <div className="border lg:sticky lg:top-12 w-full md:w-1/2">
            <ProductImageGallery
              images={product.images ?? []}
              title={product.title}
            />
          </div>

          <Separator className="mt-4 md:hidden" />
          <div className="flex flex-col w-full gap-4 md:w-1/2">
            <div>
              <Button
                variant={'outline'}
                className="mb-4 hidden lg:inline-flex"
                onClick={() => {
                  router.back();
                }}
              >
                <ChevronLeft className="mr-2" /> Regresar
              </Button>

              <h2 className="text-2xl mb-8 font-bold lg:text-4xl">
                {product.title}
              </h2>

              {/* <p className="text-xl font-medium">
              {product.category.name.toUpperCase()}
            </p> */}

              <div className="space-y-8">
                <div className="">
                  <p className="font-bold text-sm">PRECIO</p>

                  <p className="font-semibold text-primary text-3xl">
                    {formatPrice(+product.priceRange.maxVariantPrice.amount)}{' '}
                    {product.priceRange.maxVariantPrice.currencyCode}
                  </p>
                </div>
                <div className="">
                  <VariantSelector
                    options={product.options}
                    variants={product.variants}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-1.5" />
            <AddToCartButton
              variants={product.variants}
              availableForSale={product.availableForSale}
            />
            <Separator className="mt-5" />
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
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
                <SplideSlide key={product.id}>
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
  const collections = await getCollections();

  const product = await getProduct(handle);

  let relatedProducts: Product[] | [] = [];

  if (product) {
    relatedProducts = await getProductRecommendations(product.id);
  }

  return {
    props: {
      collections: collections ?? [],
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
