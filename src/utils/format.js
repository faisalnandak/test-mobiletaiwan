const priceFormatter = new Intl.NumberFormat('en-US');

export function formatPrice(value) {
  return `NT$ ${priceFormatter.format(value)}`;
}
