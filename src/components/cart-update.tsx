import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CartItem } from '@/lib/shopify/types';
import { Minus, Plus, Trash } from 'lucide-react';
import { useUpdateCart } from '@/hooks/useUpdateCart';
import { useCart } from '@/contexts/cart-context';

interface UpdateCartProps {
  cartLineItem: CartItem;
}

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
  const { updateItem, isLoadingUpdate, removeItem, isLoadingRemove } =
    useCart();
  // const { loading: isLoadingRemoving, removeCartItem } = useRemoveCartItem();

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size={'icon'}
          className="w-8 h-8"
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
          <Minus className="w-3 h-3" aria-hidden="true" />
          <span className="sr-only">Remove one item</span>
        </Button>

        <p className="px-3">{cartLineItem.quantity}</p>
        <Button
          variant="outline"
          className="w-8 h-8"
          size="icon"
          onClick={async () => {
            try {
              const payload = {
                id: cartLineItem.id,
                merchandiseId: cartLineItem.merchandise.id,
                quantity: cartLineItem.quantity + 1,
              };
              const data = await updateItem(payload);

              console.log(data);
            } catch (error) {
              console.log(error);

              // error instanceof Error
              //   ? toast({ title: error.message })
              //   : toast({ title: 'Something went wrong.' });
            }
          }}
          disabled={isLoadingUpdate}
        >
          <Plus className="w-3 h-3" aria-hidden="true" />
          <span className="sr-only">Add one item</span>
        </Button>
      </div>
      <Button
        variant="destructive"
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
        <Trash className="w-3 h-3" aria-hidden="true" />
        <span className="sr-only">Delete item</span>
      </Button>
    </div>
  );
}
