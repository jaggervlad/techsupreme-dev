import { addToCart, createCart, getCart } from '@/lib/shopify';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

export function useAddCartItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies();

  async function addItem(selectedVariantId: string | undefined) {
    setIsLoading(true);
    let cartId = cookies?.cartId;
    let cart;

    if (cartId) {
      cart = await getCart(cartId);
    }

    if (!cartId || !cart) {
      cart = await createCart();
      cartId = cart.id;

      setCookie('cartId', cartId);
    }

    if (!selectedVariantId) {
      return 'Missing product variant ID';
    }

    try {
      await addToCart(cartId, [
        { merchandiseId: selectedVariantId, quantity: 1 },
      ]);
    } catch (e) {
      return 'Error adding item to cart';
    } finally {
      setIsLoading(false);
    }
  }

  return { addItem, isLoading };
}
