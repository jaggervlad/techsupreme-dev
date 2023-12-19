import { Price } from '@/components/price';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const CartContentCheckout = () => {
  const { cart } = useCart();
  const router = useRouter();

  return (
    <div className="lg:w-[50%] h-full">
      <button
        className="flex items-center text-[#D8D8D8] mb-6 font-montserrat-semibold"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Regresar
      </button>

      <div className="flex flex-col mb-3 font-montserrat-semibold">
        <h3 className="text-[#D8D8D8] text-xl mb-2">Total:</h3>
        <Price
          className="text-3xl text-white"
          amount={cart?.cost?.totalAmount?.amount as string}
          currencyCode={cart?.cost?.totalAmount?.currencyCode as string}
        />
      </div>

      <section className="flex flex-col lg:pr-10 divide-y divide-white/30">
        {cart?.lines.map((item) => {
          return (
            <div key={item.id} className="py-8 space-y-3">
              <div className="flex flex-col justify-between gap-4 px-2 md:gap-0 md:flex-row">
                <div className="flex gap-6">
                  <div className="relative bg-white max-h-28 w-28 aspect-[3/6] overflow-hidden rounded-lg">
                    {item?.merchandise.product.featuredImage && (
                      <Image
                        src={
                          item?.merchandise.product.featuredImage.url ??
                          '/images/product-placeholder.webp'
                        }
                        alt={
                          item?.merchandise.product.featuredImage.altText ??
                          'Product Name'
                        }
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="absolute object-contain w-full h-full"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="flex flex-col mt-4 flex-1 gap-1 text-sm font-montserrat-regular">
                    <div className="text-base text-white font-montserrat-semibold lg:text-xl">
                      {item.merchandise.product.title}
                    </div>

                    <div className="text-sm lg:text-lg text-[#C7C7C7]">
                      {item.merchandise.product.tags[0]}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-montserrat-regular mt-4 lg:text-lg text-[#C7C7C7]">
                    {formatPrice(
                      parseFloat(
                        item.merchandise.product.priceRange.maxVariantPrice
                          .amount
                      ) ?? 0
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
