import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBox from './components/SearchBox.jsx';
import ProductList from './components/ProductList.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import { useCart } from './hooks/useCart.js';
import { useConfirm } from './hooks/useConfirm.js';
import { fetchProducts } from './data/products.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  const { totalQuantity } = useCart();
  const { isOpen: dialogOpen } = useConfirm();

  const loadProducts = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Unexpected error.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(loadProducts, [loadProducts]);

  // Derived from products + query, recomputed on every keystroke - no extra state.
  const visibleProducts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return products;
    return products.filter((product) => product.name.toLowerCase().includes(keyword));
  }, [products, query]);

  const closeCart = useCallback(() => setCartOpen(false), []);

  // Escape closes the cart, but only when no dialog is stacked on top of it.
  useEffect(() => {
    if (!cartOpen || dialogOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeCart();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [cartOpen, dialogOpen, closeCart]);

  // Lock background scroll while the cart is open.
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  return (
    <>
      <header className="header">
        <div>
          <h1 className="header__title">Premium Store</h1>
          <p className="header__subtitle">Tech accessories, curated.</p>
        </div>
        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
          aria-label={`Open cart, ${totalQuantity} items`}
        >
          <span aria-hidden="true">🛒</span> Cart
          <span className="cart-badge">{totalQuantity}</span>
        </button>
      </header>

      <div className="container">
        <div className="toolbar">
          <SearchBox value={query} onChange={setQuery} />
          {!loading && !error && (
            <span className="result-count">
              {visibleProducts.length} of {products.length} products
            </span>
          )}
        </div>

        <ProductList
          products={visibleProducts}
          loading={loading}
          error={error}
          query={query.trim()}
          onRetry={loadProducts}
          onClearSearch={() => setQuery('')}
        />
      </div>

      {/* Replaces the old document-level click handler that broke quantity updates. */}
      {cartOpen && <div className="cart-backdrop" onClick={closeCart} />}
      <ShoppingCart open={cartOpen} onClose={closeCart} />
    </>
  );
}
