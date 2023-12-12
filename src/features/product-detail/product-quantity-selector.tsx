import { AddToCartButton } from '@/components/add-to-cart-button';
import { ProductOption, ProductVariant } from '@/lib/shopify/types';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
export const ProductQuantitySelector = ({
  variants,
  availableForSale,
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
}) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="flex items-center h-10 md:h-auto">
        <button
          onClick={() => {
            setQuantity((prev) => {
              if (prev === 0) return 0;

              return prev - 1;
            });
          }}
          className="h-full px-3 border rounded-l"
        >
          <MinusIcon />
        </button>
        <div className="flex items-center w-16 h-full px-2 text-lg border">
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

      <div className="md:w-full">
        <AddToCartButton
          variants={variants}
          availableForSale={availableForSale}
        />
      </div>
    </div>
  );
};
