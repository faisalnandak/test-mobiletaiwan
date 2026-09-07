import ProductCard from './ProductCard.jsx';

export default function ProductList({
  products,
  loading,
  error,
  query,
  onRetry,
  onClearSearch,
}) {
  if (loading) {
    return (
      <div className="products-grid">
        <div className="state">
          <div className="spinner" aria-hidden="true" />
          <p className="state__text">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-grid">
        <div className="state">
          <div className="state__icon" aria-hidden="true">
            ⚠️
          </div>
          <p className="state__title">Could not load products</p>
          <p className="state__text">{error}</p>
          <button className="btn btn--ghost" onClick={onRetry}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="products-grid">
        <div className="state">
          <div className="state__icon" aria-hidden="true">
            🔍
          </div>
          <p className="state__title">No products found</p>
          <p className="state__text">Nothing matches &quot;{query}&quot;. Try a different keyword.</p>
          <button className="btn btn--ghost" onClick={onClearSearch}>
            Clear search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
