import LoadingDots from '@/components/dots';
import { MainLayout } from '@/components/layouts/main-layout';
import { ProductImageGallery } from '@/components/product-image-gallery';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { VariantSelector } from '@/components/variant-selector';
import { useCart } from '@/contexts/cart-context';
import { useAddCartItem } from '@/hooks/useAddCartItem';
import {
  getCollections,
  getProduct,
  getProductRecommendations,
  getProducts,
} from '@/lib/shopify';
import { Collection, Product, ProductVariant } from '@/lib/shopify/types';
import { cn, formatPrice } from '@/lib/utils';
import { ChevronRight, PlusIcon } from 'lucide-react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { multipleSliderOptions } from '@/lib/constants';

export default function ProductPage({
  collections,
  product,
  relatedProducts,
}: {
  collections: Collection[];
  product: Product;
  relatedProducts: Product[];
}) {
  console.log({ product });

  return (
    <MainLayout collections={collections}>
      <div className="container py-14">
        {/* <div className="flex items-center space-x-1 text-sm capitalize text-muted-foreground">
          <Link href="/productos" className="truncate">
            Productos
          </Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </div> */}
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          <ProductImageGallery
            className="w-full md:w-1/2"
            images={product.images ?? []}
          />

          <Separator className="mt-4 md:hidden" />
          <div className="flex flex-col w-full gap-4 md:w-1/2">
            <div className="space-y-2">
              <h2 className="text-2xl mb-8 font-bold line-clamp-1 lg:text-4xl">
                {product.title}
              </h2>

              {/* <p className="text-xl font-medium">
              {product.category.name.toUpperCase()}
            </p> */}

              <div className="space-y-8">
                <div className="">
                  <p className="font-bold mb-4 text-sm">PRECIO</p>

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
            <div>
              <p>{product.description}</p>
            </div>
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

function AddToCartButton({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) {
  const { addItem, isLoadingAdd } = useCart();
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );

  const selectedVariantId = variant?.id || defaultVariantId;

  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-primary p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={cn(buttonClasses, disabledClasses)}>
        Agotado
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        aria-disabled
        className={cn(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Añadir al carrito
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (isLoadingAdd) return;

        addItem(selectedVariantId);
      }}
      aria-label="Añadir al carrito"
      aria-disabled={isLoadingAdd}
      className={cn(buttonClasses, {
        'hover:opacity-90': true,
        disabledClasses: isLoadingAdd,
      })}
    >
      <div className="absolute left-0 ml-4">
        {isLoadingAdd ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <PlusIcon className="h-5" />
        )}
      </div>
      Añadir al carrito
    </button>
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
    props: { collections: collections ?? [], product, relatedProducts },
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
