import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';

/**
 * The cart API surface: addItem, removeItem, updateQuantity, clearCart,
 * plus the derived cart, totalQuantity and totalPrice.
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
