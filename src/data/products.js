export const PRODUCTS = [
  { id: 1, name: 'Wireless Bluetooth Earphones', category: 'Audio', price: 2999, icon: '🎧' },
  { id: 2, name: 'Smart Watch', category: 'Wearable', price: 8999, icon: '⌚' },
  { id: 3, name: 'Portable Power Bank', category: 'Accessories', price: 1299, icon: '🔋' },
  { id: 4, name: 'Wireless Mouse', category: 'Peripherals', price: 899, icon: '🖱️' },
  { id: 5, name: 'Mechanical Keyboard', category: 'Peripherals', price: 3999, icon: '⌨️' },
  { id: 6, name: 'Webcam', category: 'Peripherals', price: 2199, icon: '📷' },
  { id: 7, name: 'USB Flash Drive', category: 'Storage', price: 599, icon: '💾' },
  { id: 8, name: 'Desktop Speaker', category: 'Audio', price: 1599, icon: '🔊' },
];

/**
 * Stands in for a real product API. Kept promise-based (the original used a bare
 * setTimeout with no way to signal failure) so the UI can show loading + error states.
 */
export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PRODUCTS), 600);
  });
}
