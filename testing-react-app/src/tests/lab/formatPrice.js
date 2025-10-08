
/**
 * Formats a number as a price string with currency symbol.
 * @example formatPrice(1234.5) ==> "$1,234.50"
 * @param {number} amount - The numeric price amount
 * @param {string} currency - Currency symbol, default "$"
 * @param {number} decimals - Number of decimals, default 2
 * @returns {string} Formatted price string
 */
export function formatPrice(amount, currency = '$', decimals = 2) {
  if (typeof amount !== 'number' || isNaN(amount)) return '';
  return (
    currency +
    amount
      .toFixed(decimals)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  );
}
