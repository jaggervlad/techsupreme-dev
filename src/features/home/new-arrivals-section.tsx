import { ProductCard } from '@/components/product-card';
import { Product } from '@/lib/shopify/types';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';

type NewArrivalsSectionProps = {
  products: Product[];
};

export const NewArrivalsSection = ({ products }: NewArrivalsSectionProps) => {
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <h3 className="text-4xl italic font-bold" id="titulo-novedades">
          Novedades
        </h3>

        <Link
          href={ROUTES.products()}
          className={'flex text-indigo-600 text-xl items-center font-semibold'}
        >
          Ver más <MoveRight className="w-5 h-5 mt-1 ml-2" />
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};
