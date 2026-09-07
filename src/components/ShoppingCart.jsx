import { useState } from 'react';
import CartItem from './CartItem.jsx';
import { useCart } from '../hooks/useCart.js';
import { useConfirm } from '../hooks/useConfirm.js';
import { useToast } from '../hooks/useToast.js';
import { formatPrice } from '../utils/format.js';

export default function ShoppingCart({ open, onClose }) {
  const { cart, totalQuantity, totalPrice, clearCart } = useCart();
  const { confirm } = useConfirm();
  const { showToast } = useToast();
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const confirmed = await confirm({
      title: 'Checkout',
      message: 'Are you sure you want to checkout?',
      confirmLabel: 'Yes, checkout',
    });
    if (!confirmed) return;

    // Simulated order call - no backend, but the button reflects the pending state.
    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setProcessing(false);

    clearCart();
    onClose();
    showToast('Checkout successful. Thank you for your purchase!');
  };

  return (
    <aside
      className={`cart-sidebar${open ? ' is-open' : ''}`}
      aria-label="Shopping cart"
      aria-hidden={!open}
      {...(open ? {} : { inert: '' })}
    >
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-cart" onClick={onClose} aria-label="Close cart">
          ×
        </button>
      </div>

      <div className="cart-body">
        {cart.length === 0 ? (
          <div className="state">
            <div className="state__icon" aria-hidden="true">
              🛒
            </div>
            <p className="state__title">Your cart is empty</p>
            <p className="state__text">Add a product to get started.</p>
          </div>
        ) : (
          cart.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </div>

      <div className="cart-footer">
        <div className="summary-row">
          <span>Total Items</span>
          <strong>{totalQuantity}</strong>
        </div>
        <div className="summary-row summary-row--total">
          <span>Total</span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
        <button
          className="btn btn--primary btn--block"
          onClick={handleCheckout}
          disabled={cart.length === 0 || processing}
        >
          {processing ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </aside>
  );
}
