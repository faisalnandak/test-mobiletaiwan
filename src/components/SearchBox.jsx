export default function SearchBox({ value, onChange }) {
  return (
    <div className="search-box">
      <span className="search-box__icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        className="search-box__input"
        placeholder="Search products..."
        aria-label="Search products"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button
          className="search-box__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
