import { MIN_QUANTITY, MAX_QUANTITY } from '../context/CartContext.jsx';
import { useCart } from '../hooks/useCart.js';
import { useConfirm } from '../hooks/useConfirm.js';
import { useToast } from '../hooks/useToast.js';
import { formatPrice } from '../utils/format.js';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { confirm } = useConfirm();
  const { showToast } = useToast();

  const handleRemove = async () => {
    const confirmed = await confirm({
      title: 'Remove item',
      message: 'Are you sure you want to remove this item?',
      confirmLabel: 'Remove',
      tone: 'danger',
    });
    if (!confirmed) return;

    removeItem(item.id);
    showToast(`${item.name} removed from cart.`, 'info');
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image" aria-hidden="true">
        {item.icon}
      </div>

      <div className="cart-item-details">
        <p className="cart-item-title">{item.name}</p>
        <p className="cart-item-price">{formatPrice(item.price)} each</p>

        <div className="quantity-controls">
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= MIN_QUANTITY}
            aria-label={`Decrease quantity of ${item.name}`}
          >
            −
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= MAX_QUANTITY}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-side">
        <span className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</span>
        <button
          className="remove-btn"
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
