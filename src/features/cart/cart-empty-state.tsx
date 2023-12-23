import { ShoppingCart } from 'lucide-react';

export const CartEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-2">
      <ShoppingCart
        className="w-12 h-12 text-muted-foreground"
        aria-hidden="true"
      />
      <span className="text-lg font-medium text-muted-foreground">
        Tu carrito esta vacío
      </span>
    </div>
  );
};
