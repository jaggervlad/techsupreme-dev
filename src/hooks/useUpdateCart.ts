import { updateCart } from '@/lib/shopify';
import { Cart } from '@/lib/shopify/types';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export function useUpdateCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [cookies] = useCookies();

  const cartId = cookies?.cartId;

  const updateCartAsync = async (
    payload: { id: string; merchandiseId: string; quantity: number }[]
  ) => {
    setIsLoading(true);

    try {
      const updatedCart = await updateCart(cartId, payload);

      setCart(updatedCart);
    } catch (err: any) {
      console.log(err);

      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { cart, isLoading, error, updateCart: updateCartAsync };
}
