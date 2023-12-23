import { Link } from 'lucide-react';

import { Price } from '@/components/price';

import { buttonVariants } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { cn } from '@/lib/utils';

export const CartFooter = () => {
  const { cart } = useCart();

  if (!cart) return null;

  return (
    <>
      <div className="py-4 text-base text-white md:text-lg">
        <div className="flex items-center justify-between pb-1 mb-3">
          <p className="text-[#D8D8D8]">Impuestos:</p>
          <Price
            className="text-right"
            amount={cart.cost.totalTaxAmount.amount}
            currencyCode={cart.cost.totalTaxAmount.currencyCode}
          />
        </div>
        <div className="flex items-center justify-between pt-1 pb-1 mb-3">
          <p className="text-[#D8D8D8]">Envío:</p>
          <p className="text-right">
            <Price
              className="text-right"
              amount={'0'}
              currencyCode={cart.cost.totalAmount.currencyCode}
            />
          </p>
        </div>
        <div className="flex items-center justify-between pt-1 pb-1 mb-3">
          <p className="text-[#D8D8D8]">Total:</p>
          <Price
            className="text-right"
            amount={cart.cost.totalAmount.amount}
            currencyCode={cart.cost.totalAmount.currencyCode}
          />
        </div>
      </div>
      <Link
        aria-label="Registrar Pedido"
        href={cart?.checkoutUrl}
        className={cn(
          buttonVariants({
            size: 'lg',
          }),
          'bg-lemon-green text-black hover:bg-lemon-green hover:text-black'
        )}
      >
        Registrar Pedido
      </Link>
    </>
  );
};
