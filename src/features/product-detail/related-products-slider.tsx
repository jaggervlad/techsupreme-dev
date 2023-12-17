import { ProductCard } from '@/components/product-card';
import { multipleSliderOptions } from '@/lib/constants';
import { Product } from '@/lib/shopify/types';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

type RelatedProductsProps = {
  products: Product[];
  productTitle: string;
};

export function RelatedProductsSlider({
  products,
  productTitle,
}: RelatedProductsProps) {
  return (
    <section
      aria-label="Productos relacionados"
      className="overflow-hidden md:pt-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="flex-1 mb-6 text-3xl font-bold font-montserrat-bold md:text-4xl">
          Productos Relacionados
        </h3>

        <Link
          href="/search"
          className={
            'md:flex text-indigo-600 text-xl font-montserrat-semibold items-center font-semibold hidden'
          }
        >
          Ver más <MoveRight className="w-5 h-5 mt-1 ml-2" />
        </Link>
      </div>
      <section
        aria-label={`Productos relacionados del producto ${productTitle}`}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {products.map((product) => (
          <article key={product.id}>
            <ProductCard product={product} />
          </article>
        ))}
      </section>
    </section>
  );
}
