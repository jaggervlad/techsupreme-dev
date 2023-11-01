import LoadingDots from '@/components/dots';
import { useCart } from '@/contexts/cart-context';
import { ProductVariant } from '@/lib/shopify/types';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
// @ts-ignore
import { useSearchParams } from 'next/navigation';

export function AddToCartButton({
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
    'relative flex w-full items-center justify-center bg-primary p-4 tracking-wide text-white';
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
