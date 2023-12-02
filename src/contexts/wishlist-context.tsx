import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product } from '@/lib/shopify/types';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

interface InitialState {
  items: Product[];
}

interface WishListProviderState extends InitialState {
  addItem: (item: Product) => void;
  removeItem: (id: Product['id']) => void;
  isSaved: (id: Product['id']) => boolean;
  hasItems: boolean;
}

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

type Actions =
  | { type: typeof ADD_PRODUCT; payload: Product }
  | { type: typeof REMOVE_PRODUCT; payload: Product['id'] };

export const WishListStateContext = createContext<WishListProviderState | null>(
  null
);

const initialState: InitialState = {
  items: [],
};

const reducer = (state: WishListProviderState, { type, payload }: Actions) => {
  switch (type) {
    case ADD_PRODUCT:
      return { ...state, items: [...state.items, payload] };
    case REMOVE_PRODUCT:
      return {
        ...state,
        items: state.items.filter((i: Product) => i.id !== payload),
      };
    default:
      throw new Error(`Invalid type ${type}`);
  }
};

export const WishListProvider = ({ children }: PropsWithChildren) => {
  const [savedWishList, setWishList] = useLocalStorage(
    'techsupreme-wishlist-items',
    JSON.stringify(initialState)
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(savedWishList));

  useEffect(() => {
    setWishList(JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const addItem = useCallback(
    (item: Product) => {
      if (!item.id) return;

      const existing = state.items.find((i: Product) => i.id === item.id);

      if (existing) return dispatch({ type: REMOVE_PRODUCT, payload: item.id });

      dispatch({ type: ADD_PRODUCT, payload: item });
    },
    [state]
  );

  const removeItem = useCallback((id: Product['id']) => {
    if (!id) return;

    dispatch({ type: REMOVE_PRODUCT, payload: id });
  }, []);

  const isSaved = useCallback(
    (id: Product['id']) => {
      return state.items.some((i: Product) => i.id === id);
    },
    [state]
  );

  const hasItems = useMemo(() => state.items.length > 0, [state.items]);

  return (
    <WishListStateContext.Provider
      value={{ items: state.items, isSaved, hasItems, addItem, removeItem }}
    >
      {children}
    </WishListStateContext.Provider>
  );
};

export function useWishListState() {
  const context = useContext(WishListStateContext);

  if (!context)
    throw new Error('useWishListState must be used within a WishListProvider');

  return context;
}
