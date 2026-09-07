import { memo } from 'react';
import { useCart } from '../hooks/useCart.js';
import { useToast } from '../hooks/useToast.js';
import { formatPrice } from '../utils/format.js';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAdd = () => {
    addItem(product);
    showToast(`${product.name} added to cart successfully.`);
  };

  return (
    <article className="product-card">
      <div className="product-image" aria-hidden="true">
        {product.icon}
      </div>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">{formatPrice(product.price)}</p>
      <button
        className="btn btn--success btn--block"
        onClick={handleAdd}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default memo(ProductCard);
