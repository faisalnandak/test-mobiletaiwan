import { createContext, useCallback, useMemo, useReducer } from 'react';

export const CartContext = createContext(null);

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 99;

/** Guards every write to quantity, so state can never hold 0, NaN or a float. */
export function clampQuantity(value) {
  const n = Math.trunc(Number(value));
  if (!Number.isFinite(n)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, n));
}

export function cartReducer(cart, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const alreadyInCart = cart.some((item) => item.id === action.product.id);
      if (alreadyInCart) {
        return cart.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: clampQuantity(item.quantity + 1) }
            : item
        );
      }
      return [...cart, { ...action.product, quantity: 1 }];
    }

    // Absolute quantity, not a delta: the caller always sends the value it wants,
    // so repeated clicks can never apply a stale increment.
    case 'SET_QUANTITY': {
      const quantity = clampQuantity(action.quantity);
      return cart.map((item) =>
        item.id === action.id && item.quantity !== quantity ? { ...item, quantity } : item
      );
    }

    case 'REMOVE_ITEM':
      return cart.filter((item) => item.id !== action.id);

    case 'CLEAR_CART':
      return cart.length === 0 ? cart : [];

    default:
      return cart;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = useCallback((product) => dispatch({ type: 'ADD_ITEM', product }), []);
  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', id }), []);
  const updateQuantity = useCallback(
    (id, quantity) => dispatch({ type: 'SET_QUANTITY', id, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);

  // Derived from `cart` - never stored, so they can never drift out of sync.
  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({ cart, addItem, removeItem, updateQuantity, clearCart, totalQuantity, totalPrice }),
    [cart, addItem, removeItem, updateQuantity, clearCart, totalQuantity, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
