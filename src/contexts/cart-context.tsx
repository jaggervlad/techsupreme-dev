import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from '@/lib/shopify';
import { Cart } from '@/lib/shopify/types';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useCookies } from 'react-cookie';

type ContextProps = {
  cart: Cart | undefined;
  isLoadingAdd: boolean;
  isLoadingUpdate: boolean;
  isLoadingRemove: boolean;
  addItem: (selectedVariantId: string | undefined) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateItem: (payload: {
    id: string;
    merchandiseId: string;
    quantity: number;
  }) => Promise<void>;
};

const initialState = {
  cart: undefined,
  isLoadingAdd: false,
  isLoadingUpdate: false,
  isLoadingRemove: false,
  addItem: async () => {},
  removeItem: async () => {},
  updateItem: async () => {},
};

const CartContext = createContext<ContextProps>(initialState);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie] = useCookies();

  const [isLoadingGet, setIsLoadingGet] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | undefined>(undefined);

  const cartId = cookies.cartId;

  async function addItem(selectedVariantId: string | undefined) {
    setIsLoadingAdd(true);
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
      setError('Missing product variant ID');
      return;
    }

    try {
      const newCart = await addToCart(cartId, [
        { merchandiseId: selectedVariantId, quantity: 1 },
      ]);

      setCart(newCart);
    } catch (e) {
      setError('Error adding item to cart');
    } finally {
      setIsLoadingAdd(false);
    }
  }

  const updateItem = async (payload: {
    id: string;
    merchandiseId: string;
    quantity: number;
  }) => {
    setIsLoadingUpdate(true);

    const { quantity, id } = payload;

    try {
      if (quantity === 0) {
        const cartAfterDelete = await removeFromCart(cartId, [id]);

        setCart(cartAfterDelete);
        return;
      }

      const updatedCart = await updateCart(cartId, [payload]);

      setCart(updatedCart);
    } catch (err: any) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const removeItem = async (id: string) => {
    if (!id) return;

    setIsLoadingRemove(true);
    try {
      const cart = await removeFromCart(cartId, [id]);
      setCart(cart);
    } catch (error) {
      setError('Error removiendo item del carrito');
    } finally {
      setIsLoadingRemove(false);
    }
  };

  useEffect(() => {
    if (cartId) {
      const fetchCart = async () => {
        if (!cartId) return;

        setIsLoadingGet(true);
        try {
          const data = await getCart(cartId);

          setCart(data);
        } catch (err: any) {
          setError(err);
        } finally {
          setIsLoadingGet(false);
        }
      };
      fetchCart();
    }
  }, [cartId]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoadingAdd,
        isLoadingUpdate,
        isLoadingRemove,
        addItem,
        removeItem,
        updateItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cartId = useContext(CartContext);

  if (!cartId) {
    throw new Error('useCartId must be used within a Cart Context');
  }

  return cartId;
};
