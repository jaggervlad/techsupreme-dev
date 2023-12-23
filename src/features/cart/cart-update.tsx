import { Minus, Plus, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CartItem } from '@/lib/shopify/types';
import { useCart } from '@/contexts/cart-context';

interface UpdateCartProps {
  cartLineItem: CartItem;
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
  const { updateItem, isLoadingUpdate, removeItem, isLoadingRemove } =
    useCart();
  // const { loading: isLoadingRemoving, removeCartItem } = useRemoveCartItem();

  return (
    <div className="flex items-center space-x-3">
      <div className="flex">
        <Button
          size={'icon'}
          className="border rounded-l-lg rounded-r-none"
          onClick={async () => {
            try {
              const payload = {
                id: cartLineItem.id,
                merchandiseId: cartLineItem.merchandise.id,
                quantity: cartLineItem.quantity - 1,
              };
              await updateItem(payload);
            } catch (error) {
              // error instanceof Error
              //   ? toast({ title: error.message })
              //   : toast({ title: 'Something went wrong.' });
            }
          }}
          disabled={isLoadingUpdate}
        >
          <Minus className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>

        <p className="flex items-center px-4 bg-white border text-primary">
          {cartLineItem.quantity}
        </p>
        <Button
          className="border rounded-l-none rounded-r-lg"
          size="icon"
          onClick={async () => {
            try {
              const payload = {
                id: cartLineItem.id,
                merchandiseId: cartLineItem.merchandise.id,
                quantity: cartLineItem.quantity + 1,
              };
              await updateItem(payload);
            } catch (error) {
              console.log(error);

              // error instanceof Error
              //   ? toast({ title: error.message })
              //   : toast({ title: 'Something went wrong.' });
            }
          }}
          disabled={isLoadingUpdate}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>
      <Button
        variant={'circle'}
        size="icon"
        className="w-8 h-8"
        onClick={async () => {
          try {
            await removeItem(cartLineItem.id);
          } catch (error) {
            // error instanceof Error
            //   ? toast({ title: error.message })
            //   : toast({ title: 'Something went wrong.' });
          }
        }}
        disabled={isLoadingRemove}
      >
        <Trash className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  );
}
