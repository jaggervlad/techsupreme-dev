import { useCart } from '@/contexts/cart-context';
import { ProductVariant } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { MdOutlineShoppingCart } from 'react-icons/md';

type AddToCartButtonProps = {
  variants: ProductVariant[];
  availableForSale: boolean;
};

const buttonClasses =
  'relative flex rounded-lg items-center justify-center bg-primary py-3 px-6 tracking-wide text-white';
const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

export function AddToCartButton({
  variants,
  availableForSale,
}: AddToCartButtonProps) {
  const { addItem, isLoadingAdd } = useCart();

  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;

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
        <div className="mr-3">
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
      <div className="mr-3">
        {isLoadingAdd ? (
          <Loader2Icon className="animate-spin " />
        ) : (
          <MdOutlineShoppingCart className="w-5 h-5" />
        )}
      </div>
      Añadir al carrito
    </button>
  );
}
