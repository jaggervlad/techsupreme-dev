import { AddToCartButton } from '@/features/product-detail/add-to-cart-button';
import { ProductVariant } from '@/lib/shopify/types';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
export const ProductQuantitySelector = ({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="flex items-center h-10 md:h-auto">
        <button
          onClick={() => {
            setQuantity((prev) => {
              return prev > 1 ? prev - 1 : 1;
            });
          }}
          className="h-full px-3 border rounded-l"
        >
          <MinusIcon />
        </button>
        <div className="flex items-center w-16 h-full px-2 text-lg border font-montserrat-regular">
          {quantity}
        </div>
        <button
          onClick={() => {
            setQuantity((prev) => {
              if (prev === 25) return 25;

              return prev + 1;
            });
          }}
          className="h-full px-3 border rounded-r"
        >
          <PlusIcon />
        </button>
      </div>

      <AddToCartButton
        variants={variants}
        availableForSale={availableForSale}
        quantity={quantity}
      />
    </div>
  );
};
